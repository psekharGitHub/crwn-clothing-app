import { USER_ACTION_TYPES } from "./user.types";

// When we initialize our application, we have no current user, so set it NULL
const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

// set default/initial state as unlike useReducer, we do not have a way to pass INITIAL_STATE otherwise.

export const userReducer = (state = INITIAL_STATE, action) => {
    console.log("dispatched");
    console.log(action);
    
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload };
        
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null };

        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload };
        /** As action is passed to every single reducer, so in default case we return the 
         * 'state' to know, which reducer is actually failing to match the action type/switch case.
         * */ 
        default:
           return state;
    }
}
