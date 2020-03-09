const { Path } = require('path-parser');
const { URL } = require('url');
const _ = require('loadsh');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('../models/Survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//require('../models/Survey')
//const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys', requireLogin, async (req, res) =>{
      const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false});

      res.send(surveys);
    })

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send("Thanks for voting!");
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        const events = req.body.map(event => {
            const pathname = new URL(event.url).pathname;
            const match = p.test(pathname);
            if (match) {
                return { email: event.email, surveyId: match.surveyId, choice: match.choice};
            }
            //CAN ALSO BE:
            // const events = req.body.map(({ email, url}) => {
            //     const pathname = new URL(url).pathname;
            //     const match = p.test(pathname);
            //     if (match) {
            //     const { surveyId, choice } = match;
            //         return { email, surveyId, choice};
            //     }
        })

        const compactEvent = events.filter(Boolean);
        const uniqueEvents = _.uniqBy(compactEvent, 'email', 'surveyId')
        uniqueEvents.forEach(({ surveyId, email, choice }) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false }
                }
            }, {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec();
        });

        res.send({})
    //ALSO CAN BE: (using loadsh)
    //     _.chain(req.body)
    //     .map(({ email, url}) => {
    //        const pathname = new URL(url).pathname;
    //        const match = p.test(pathname);
    //        if (match) {
    //            return { email, surveyId: match.surveyId, choice: match.choice};
    //        }
    //    })
    //    .compact()
    //    .uniqBy('email', 'surveyId')
    //    .each(({ surveyId, email, choice }) => {
    //        Survey.updateOne({
    //            _id: surveyId,
    //            recipients: {
    //                $elemMatch: { email: email, responded: false }
    //            }
    //        }, {
    //            $inc: { [choice]: 1 },
    //            $set: { 'recipients.$.responded': true },
    //            lastResponded: new Date()
    //        }).exec();
    //    })
    //    .value();
        
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            //Can be also recipients.split(',').map(email => { return { email: email.trim() } }),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        const mailer = new Mailer(survey, surveyTemplate(survey))

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);

        } catch (err) {
            res.status(422).send(err);
        }

    });
};