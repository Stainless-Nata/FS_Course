import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyReview = ({ onBack, formValues, submitSurvey, history}) => {
  const { title, subject, body, recipients } = formValues;

  const FIELDS = [
    { label: "Survey Title", name: title },
    { label: "Subject Line", name: subject },
    { label: "Email Body", name: body },
    { label: "Recipient List", name: recipients },
  ];

  function renderFields() {
    return FIELDS.map(({ label, name }) => {
      return (
        <div key={label}>
          <label>{label}</label>
          <div>{name}</div>
        </div>
      )
    })
  }

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        {renderFields()}
      </div>
      <button onClick={onBack} className="yellow darken-3 btn-flat white-text">
        Back
      </button>
      <button 
      className="green btn-flat right white-text"
      onClick={() => submitSurvey(formValues, history)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>

    </div>
  )
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));