import { createContext, useContext, useState, useEffect } from "react"
import PropTypes from 'prop-types';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] =  useState(localStorage.getItem("loggedIn"))

    useEffect(() => {
        const handleStorageChange = () => {
          console.log("Storage changed");
          setLoggedIn(localStorage.getItem("loggedIn"));
        }
    
        console.log("Adding storage event listener");
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
          console.log("Removing storage event listener");
          window.removeEventListener('storage', handleStorageChange);
        }
      }, [])
    
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
