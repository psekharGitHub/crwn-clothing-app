import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../components/form-input/form-input.component";
import Button from "../components/button/button.component";
import { signUpStart } from "../store/user/user.action";

// import { UserContext } from "../contexts/user.context";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [ formFields,setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields; 

    console.log(formFields);

    // const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!!");
            return;
        }

        try {
            // Dispatching SAGA
            dispatch(signUpStart(email, password, displayName));

            // const { user } = await createAuthUserWithEmailAndPassword(
            //     email,
            //     password
            // );
            // // console.log(response);
            // // setCurrentUser(user);

            // await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Cannot create user, email already in use");
            } else {
                console.log("User creation encountered an error", error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({ ...formFields, [name]:value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account ?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' onChange={handleChange} name='displayName' value={displayName} required/>
                <FormInput label='Email' type='email' onChange={handleChange} name='email' value={email} required/>
                <FormInput label='Password' type='pasword' onChange={handleChange} name='password' value={password} required/>
                <FormInput label='Confirm Password' type='pasword' onChange={handleChange} name='confirmPassword' value={confirmPassword} required/>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;