import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";

import { signInFailed, signInSuccess, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed } from "./user.action";

import { createUserDocumentFromAuth, getCurrentUser, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";

// DEFINING ACTUAL SAGAS

export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInformation);
        yield put(signInSuccess( { id: userSnapshot.id, ...userSnapshot.data() } ));
    } catch(error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        console.log(user);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUp({ payload: { email, password, displayName }}) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }));
    } catch(error) {
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalInformation } }) {
    yield call(getSnapshotFromUserAuth, user, additionalInformation);
}


export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess()); // goes to signOutSuccess() in user.action
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

/**
 *         ENTRY POINTS TO SAGAS 
 * */ 

// user authentication entry points

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) 
            return
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch(error) {
        yield put(signInFailed(error));
    }
}

// sign in entry points
export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// sign up entry points: Entry point 1 on start 
export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

// sign up entry points: Entry point 2 after Sign Up Sucess
export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

// Aggregator Saga
export function* userSagas() {
    yield all([ 
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart) 
    ]);
}