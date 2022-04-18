import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
       // can't directly pass async in useEffect so have to declare and call it inside.
       const getCategoriesMap = async () => {
           const categoryMap = await getCategoriesAndDocuments();

           setCategoriesMap(categoryMap);
        }
        
        getCategoriesMap();
    }, [])
    
    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
}