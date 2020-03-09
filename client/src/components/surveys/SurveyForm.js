//Survey where the user can put input into fields
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: "Survey Title", name: "title", noValueErr: 'You must provide a survey title' },
    { label: "Subject Line", name: "subject", noValueErr: 'You must provide an email subject' },
    { label: "Email Body", name: "body", noValueErr: 'You must provide an email body' },
    { label: "Recipient List", name: "recipients", noValueErr: 'You must provide a valid recipient list' },
];

class SurveyForm extends Component {
    renderFields() {
        return FIELDS.map(({ label, name }, key) => {
            return (
                <div key={key}>

                    <Field
                        label={label}
                        component={SurveyField}
                        type="text"
                        name={name}
                    />
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <button
                        type="submit"
                        className="teal btn-flat right white-text">Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                <Link to='/surveys' className="red btn-flat white-text">
                    <i className='material-icons left'>cancel</i>
                    Cancel
                </Link>

            </div>
        );
    };
};


function validate(values) {
    const errors = {};

    FIELDS.forEach(({ name, noValueErr }) => {
        if (!values[name]) {
            errors[name] = noValueErr;
        }
    })

    if (values.recipients)
        errors.recipients = validateEmails(values.recipients || '');
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);