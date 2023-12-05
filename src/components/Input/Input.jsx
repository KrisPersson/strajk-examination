import './Input.scss';
import React from 'react';

function Input({ label, type, customClass, name, handleChange, defaultValue, disabled, role }) {
    return (
        <section className='input' >
            <label className='input__label'>{ label }</label>
            <input type={ type } 
                className={ `input__field ${customClass ? customClass : ""}` }
                name={ name }
                onChange={ handleChange }
                defaultValue={ defaultValue ? defaultValue : '' }
                disabled={ disabled }
                role={role}
            />
        </section>
    )
}

export default Input