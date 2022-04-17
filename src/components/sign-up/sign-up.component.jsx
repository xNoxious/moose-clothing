import { useState } from "react";
import { createUserEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up.styles.scss';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const DEFAULT_FORM_FIELDS = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(DEFAULT_FORM_FIELDS);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setFormFields({ ...formFields, errorMessage: 'Passwords do not match!' });
            return;
        }

        try {
            const { user } = await createUserEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setFormFields({ ...formFields, errorMessage: 'Email already in use!' });
                    break;
                case 'auth/invalid-email':
                    setFormFields({ ...formFields, errorMessage: 'Please provide a valid email!' });
                    break;
                case 'auth/weak-password':
                    setFormFields({ ...formFields, errorMessage: 'Your password must be at least 6 characters long!' });
                    break;
                default:
                    setFormFields({ ...formFields, errorMessage: 'Error during sign in!' });
                    break;
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>I do not have an account</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    minLength={6}
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} />

                <h5 style={{ color: 'red' }}> {formFields.errorMessage} </h5>

                <Button type="submit">Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm;