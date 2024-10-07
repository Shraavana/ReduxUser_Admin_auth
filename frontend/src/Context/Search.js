import React,{createContext, useState} from "react";

export const searchResult = createContext()

export const SearchProvider = ({children})=>{
    const [userData,setUserData] = useState([])
    return (
        <searchResult.Provider value={{userData,setUserData}}>
            {children}
        </searchResult.Provider>
    )
}