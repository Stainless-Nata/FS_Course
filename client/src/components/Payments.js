import React, { Component } from 'react';
import StripeCheckOut from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class payments extends Component {
    render() {
        return (
            <StripeCheckOut
                name="Emaily"
                description="5$ for 5 email credits"
                amout={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add credits
                </button>
            </StripeCheckOut>
        )
    }
}

export default connect(null, actions)(payments);