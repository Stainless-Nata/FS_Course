//Survey field contains logic to render single input field
import React from 'react';

export default ({ input, meta: { error, touched, active }, label }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
            {!active && touched && error}
            </div>
        </div>
    )
}

