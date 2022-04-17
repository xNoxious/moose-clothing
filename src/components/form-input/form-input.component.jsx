import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            {/* spreading in because passed in props will be identically named */}
            {/* Input MUST be before its label! */}
            <input className="form-input" {...otherProps} />
            {/* label && - shorthand for if(label.length) */}
            {label && (
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    )
}

export default FormInput;