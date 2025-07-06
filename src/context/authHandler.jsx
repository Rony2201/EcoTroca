import { createContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();


function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigate('/perfil');
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login')
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}> {children} </AuthContext.Provider>
    )
}

export default AuthProvider;