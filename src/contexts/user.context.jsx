import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as the actual value you want to access. Sets context as null as well
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});


//a component re-renders whenever its state changes or its props update
export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);     //set current state as null
    const value = { currentUser, setCurrentUser };              // storing the value as an object and passing it to its children it will wrap. So that they will have access to these values.

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