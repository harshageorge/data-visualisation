import userEvent from "@testing-library/user-event";
import { createContext, useContext } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged}  from "firebase/auth";
import {auth} from '../firebase';

export const UserContext = createContext();
export const AuthContextProvider = ({children}) => {
    const createUser =(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const contextValue = {
        createUser
    }
    return (
        <UserContext.Provider value={contextValue} >
          {children}
        </UserContext.Provider>
      );
}
// export const UserAuth=()=>{
//     return useContext(UserContext)
// }