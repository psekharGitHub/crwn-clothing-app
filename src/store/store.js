import { compose, createStore, applyMiddleware } from "redux";
// logger allows us to see what a state looks like before and after an action is dispatched
// and what the action is
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga"

// root reducer - combination of all reducers
import { rootReducer } from "./root-reducer";

// imports for Redux-Persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/** middlewares are library helpers that run before an action hits the reducer
 *  ACTION -->(dispatched)--> [ MIDDLEWARE ] --> REDUCER
 *  */  

/**
 * Writing our own logger middleware, as Redux Logger bundles up all the logs into one log
 * and displays them, which might not be in correct order of execution, which might create
 * confusion or conflict
 * 
 * loggerMiddleware generates 'SIDE-EFFECTS' with 'ACTIONS' before it hits the reducers
 */

// eslint-disable-next-line
const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next.action;
    }
    
    console.log('type' + action.type);
    console.log('payload' + action.payload);
    console.log('currentState' + store.getState()); // getState() returns the value of current state
        
    /** next() passes the action to the next state
     * next call updates our reducers, which updates our store object, which in turn calls 'useSelector'
     * on all of our components, even though the 'user' is the one thats updating
     * 
     * So, even if one reducer is updated, all the reducers get re-renders
     */
    next(action);
    
    console.log('nextState' + store.getState());    // here, current state will be next state 
}

// Redux-Persist syntax
/** Note: Since loading spinner differentiates between loading and already loaded state, we do not need
 presist config to cache data locally.
 * */ 
const persistConfig = {
    key: 'root',
    storage,
    //blacklist: [ 'user' ]
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

// Redux-Persist syntax
const persistedReducer = persistReducer(persistConfig, rootReducer);


// const middleWares = [ loggerMiddleware ]     // customized redux Middleware.Can use logger from redux-logger    
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware ].filter(Boolean);  //thunk Middleware
// const middleWares = [ sagaMiddleware ]   //saga Middleware

// Using REDUX-DEV-TOOLS
const composeEnhancer = (process.env.NODE_ENV !== 'production' 
                        && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose ;

                        // Generate middleware enhancer (composed of multiple middlewares, if any)
// 'compose' helps to pass multiple functions left to right
const composedEnhancer = composeEnhancer(applyMiddleware(...middleWares));


// We need a root reducer to generate a store
// Store facilitates the movement and passing of actions through these reducers
// Third argument is ''middleware', but instead of passing one middleware, we pass a middleware enhancer
// which is composed of multiple middlewares, if any.
// using persistReducer instead of useReducer to utilizer Redux-Persist features.
export const store = createStore(persistedReducer, undefined, composedEnhancer);

// run rootSaga
sagaMiddleware.run(rootSaga);

// Redux-Persist syntax
export const persistor = persistStore(store);

/** Function Generator/ Currying / Reusable Functions
 * const curryFunc = (a) => (b, c) => {
 *      return a + b - c;
 * }
 * 
 * const with3 = curryFunc(3);      // curryFunc is a function that returns another function
 * const with10 = curryFunc(10);    // can be used in different states
 * 
 * with3(4, 5);
 * with10(11, 12);
 */