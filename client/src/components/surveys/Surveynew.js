//Shows user to SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    //Can be like this:
    // constructor(props){
    //     super(props);

    //     this.state = { showReview: false }
    // }

    //Also can be like this:
    state = { showReview: false };

    renderContent() {
        if (this.state.showReview)
            return <SurveyFormReview onBack={this.handleState}/>

            return <SurveyForm onSurveySubmit={this.handleState} />
    }

    handleState = () => {
        this.setState({showReview: !this.state.showReview})
    }

    render() {
        return (
            <div>
             {this.renderContent()}
            </div>
        );
    };
};

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew)