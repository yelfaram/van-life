import { createContext, useContext, useState} from "react"
import PropTypes from 'prop-types';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] =  useState(localStorage.getItem("loggedIn"))
    
    const login = () => {
        setLoggedIn(true)
        localStorage.setItem("loggedIn", true)
    }

    const logout = () => {
        setLoggedIn(false)
        localStorage.removeItem("loggedIn");
    }

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }} >
            { children }
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
  children: PropTypes.any,
}

export const useAuth = () => useContext(AuthContext)
