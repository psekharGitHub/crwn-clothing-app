import { createContext, useEffect, useReducer } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/reducer/reducer.utils";

// as the actual value you want to access. Sets context as null as well
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
    console.log("dispatched");
    console.log(action);
    
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer!!`);
    }
}

// When we initialize our application, we have no current user, so set it NULL
const INITIAL_STATE = {
    currentUser: null
}


//a component re-renders whenever its state changes or its props update
export const UserProvider = ({ children }) => {
    // Uncomment this to use Context API state management
    // const [ currentUser, setCurrentUser ] = useState(null);     //set current state as null
    
    // Replacing CONTEXT with REDUCER. useReducer always returns (state, dispatch).
    // We directly de-structure state to get 'currentUser' 
    const [ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatch(
            createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
        );
    }
    
    // storing the value as an object and passing it to its children it will wrap.
    // So that they will have access to these values.
    const value = { currentUser, setCurrentUser };  
    /** useEffect is called whenever a component unmounts
     * returns null, if state changes from signed in to signed out.
     * useEffect() dependent on empty array means it will only run once
     * unsubscribe makes sure that onAuthStateChange stops listening once whenever you unmount
    */
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
            // create user document whenever authenticated user is detected.
            if (user) {
                createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}