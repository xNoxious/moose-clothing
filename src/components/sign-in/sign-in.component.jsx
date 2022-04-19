import { useState } from "react";
import { signInUserEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import './sign-in.styles.scss';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const DEFAULT_FORM_FIELDS = {
    email: '',
    password: '',
    errorMessage: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
    const { email, password } = formFields;
    const resetFormFields = () => {
        setFormFields(DEFAULT_FORM_FIELDS);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInUserEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    setFormFields({ ...formFields, errorMessage: 'Mismatching credentials!' });
                    break;
                case 'auth/user-not-found':
                    setFormFields({ ...formFields, errorMessage: 'No such user!' });
                    break;
                default:
                    setFormFields({ ...formFields, errorMessage: 'Error during sign in!' });
                    break;
            }
        }
    }

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
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

                <h5 style={{ color: 'red' }}> {formFields.errorMessage} </h5>

                <div className="buttons-container">
                    <Button type='submit'>Sign In </Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;