import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged  //Observable Listener (Observer Pattern)
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTwt3Xya132vmzuE18BWY43dSpcrejXlE",
  authDomain: "crnw-db-9971d.firebaseapp.com",
  projectId: "crnw-db-9971d",
  storageBucket: "crnw-db-9971d.appspot.com",
  messagingSenderId: "902126880334",
  appId: "1:902126880334:web:c4db8ef4cca4f7183e251f"
};

// Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// Snippet for storing category items

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // return a collection reference from db with the name/key collectionKey
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    /**
     * doc returns a document reference from the collection, even if it does not have the object yet.
     * It still returns a reference to the location, where the object ought to be present. So we can 
     * use that reference, and create the object there using 'set'.
     */
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Done Batching!!');
};

// since this is an async function, the promise for 'categoryMap'(return categoryMap) wont return untill
// getDocs(await getDocs(q)) has finished execution.
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  // console.log(collectionRef);

  // signOutUser(); // Force Sign Out

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot);

  // Now, this function will return 'categories' as an array.(trivial form)
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);  //extracts the data inside the Document userDocRef
    // console.log(userSnapshot);
    
    if (!userSnapshot.exists()) {
      /** For signup displayName is null, as createUserWithEmailAndPassword takes email and passwords as 
      argument so it returns user object with no name as such. So, displayName is extracted from Form field as
      additionalInformation parameter.    */
      const { displayName, email } = userAuth; 
      const createdAt = new Date();
      
      try {
        setDoc(userDocRef, {        //sets the data as an object inside the Document received using 'doc'
            displayName,
            email,
            createdAt,
            ...additionalInformation  //spreading additionalInformation overwrites the necessary fields(here, displayName)
        });
      } catch(error) {
        console.log("Unexpected Error Occured!!", error.message);
      }
    } // checks if the data even exists or not ?

    return userSnapshot;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//auth is keeping track of the state of the user i.e., whether sign in or sign out. even in between refreshes
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// NEW METHOD FOR SAGA: Promise-version of checking is auth state has changed or not
// A substitute to onAuthStateChangedListener
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe =  onAuthStateChanged(
      auth, 
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      }, reject
      );
  });
}