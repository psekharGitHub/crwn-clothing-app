import { useState } from "react";
import FormInput from "../components/form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../components/button/button.component";

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../utils/firebase/firebase.utils";

//Need not hook to UserContext everytime as we use onAuthStateChange
// import { UserContext } from "../contexts/user.context";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [ formFields,setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields; 

    console.log(formFields);

    // const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup(); //destructuring directly
        console.log(user);
        // setCurrentUser(user);
        // No need to createUserDocument here as onAuthStateChange listener is already keeping track of user state
        //, so we centralize this segment of creating new document, all under useEffect in user.context.
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(user);

            // setCurrentUser(user);

            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert("No associated user with this email");
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({ ...formFields, [name]:value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account ?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' onChange={handleChange} name='email' value={email} required/>
                <FormInput label='Password' type='pasword' onChange={handleChange} name='password' value={password} required/>
                <div className="buttons-container">
                    <Button type='submit' onClick={handleSubmit}>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google sign In
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;