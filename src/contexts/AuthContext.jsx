import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { USER_INFOS } from "../constants/appConstant";

const AuthContext = createContext({
    userId: '',
    email: '',
    name: '',
    lastname: '',
    setUserId: () => {},
    setEmail: () => {},
    setName: () => {},
    setLastname: () => {},
    signIn: async () => {},
    signOut: async () => {}
});

const AuthContextProvider = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [email, setEmail]   = useState('');
    const [name, setName]     = useState('');
    const [lastname, setLastname] = useState('');

    // Recharge token + user au démarrage de l'app
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        const savedUser = localStorage.getItem(USER_INFOS);
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUserId(user.userId);
            setEmail(user.email);
            setName(user.name);
            setLastname(user.lastname);
        }
    }, []);
    //méthode de connexion
    const signIn = async (user) => {
        try {
            setUserId(user.userId);
            setEmail(user.email);
            setName(user.name);
            setLastname(user.lastname);
            localStorage.setItem(USER_INFOS, JSON.stringify(user));
        } catch (error) {
            throw new Error(`Erreur lors de la connexion: ${error}`);
        }
    };

    //méthode de déconnexion
    const signOut = async () => {
        try {
            setUserId('');
            setEmail('');
            setName('');
            setLastname('');
            localStorage.removeItem(USER_INFOS);
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        } catch (error) {
            throw new Error(`Erreur lors de la déconnexion: ${error}`);
        }
    };

    const value = { userId, email, name, lastname, setUserId, setEmail, setName, signIn, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };