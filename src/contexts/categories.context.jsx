import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from '../shop-data.js'; //data we need to store in Firestore Database

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // when using async function inside a useEffect(), always enclose the function that you are planning
    // to call inside of useEffect, inside another async function. 
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log("acc-array: " + categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);
    
    // IMPORTANT: Uncomment this snippet to add new collection to Firestore Database.
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])
        
    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}