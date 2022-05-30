import React, {createContext, useState} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

type AuthProps = {
    init: boolean
}

export const AuthContext = createContext<AuthProps | undefined>(undefined)

const AuthProvider = ({children}:any) => {
    const init = AsyncStorage.getItem("init")
    if (!init) {

    }
    
    // return (
    //     <AuthContext.Provider value={init}>
    //         {children}
    //     </AuthContext.Provider>
    // )
}

export default AuthProvider