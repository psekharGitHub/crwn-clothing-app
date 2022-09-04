// uncomment for signInWithGoogleRedirect
// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../sign-up-form/sign-up-form.component';
import SignInForm from '../../sign-in-form/sign-in-form.component';
// import { 
//     auth,
//     signInWithGooglePopup,
//     signInWithGoogleRedirect,
//     createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './authentication.styles.scss';

const Authentication = () => {
    // uncomment for signInWithGoogleRedirect
    // useEffect(() => {
    //     const getResponse = async () => {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     };
    //     getResponse();
    // }, []);

    return (
        <div className='authentication-container'>
            {/* <button onClick={ logGoogleUser }>
                Sign In with Google Popup
            </button> */}
            {/* uncomment to Sign In with GoogleRedirect
            <button onClick={ signInWithGoogleRedirect }>
                Sign In with Google Redirect
            </button> */}
            <SignInForm />
            <SignUpForm />
        </div>
    );
}

export default Authentication;