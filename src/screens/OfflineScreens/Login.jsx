import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/Ui/CustomInput';
import ErrorMessage from '../../components/Ui/ErrorMessage';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/apiConstant';

function Login() {
    //on délcare nos state pour les valeurs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');

    //on récupère le hook de navigation
    const navigate = useNavigate();
    //on récupère la méthode sign du AuthContext
    const { signIn } = useAuthContext();

    useEffect(() => {
        //si j'ai un utilisateur en session, on le redirige sur '/' du OnlineRouter
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    //Méthode qui receptionne les datas du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            if (email === '' || password === '') {
                setErrorMessage("Tous les champs doivent être remplis");
                return;
            }

            const response = await axios.post(`${API_URL}/login_check`, { email, password });

            // Le login_check retourne maintenant token + infos user
            const { token, id, email: userEmail, name, lastname, role } = response.data;

            // Stocke le token pour les prochaines requêtes
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const loggedInUser = { userId: id, email: userEmail, name, lastname, role };

            await signIn(loggedInUser);
            setUser(loggedInUser);

        } catch (error) {
            setErrorMessage("Email ou mot de passe incorrect");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='flex justify-center items-center w-full min-h-[70vh] px-4 sm:px-6 py-8 bg-plum-50'>
            <div className="w-full max-w-md animate-slideup2">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-plum-950">Connectez-vous</h1>
                    <p className="text-plum-600 mt-2 text-sm">Accédez à tous nos services</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='w-full bg-white border border-plum-200 rounded-2xl p-8 sm:p-10 shadow-lg shadow-plum-200/50'>

                    <div className="space-y-4">
                        <CustomInput
                            label={'Email'}
                            type={'email'}
                            placeholder='votre@email.com'
                            state={email}
                            callable={(event) => setEmail(event.target.value)} />

                        <CustomInput
                            label={'Mot de passe'}
                            type={'password'}
                            placeholder='•••••••'
                            state={password}
                            callable={(event) => setPassword(event.target.value)} />
                    </div>

                    {errorMessage && <ErrorMessage message={errorMessage} />}

                    <div className="mt-8">
                        {isLoading ? (
                            <div className="flex justify-center py-2">
                                <ButtonLoader />
                            </div>
                        ) : (
                            <button className='w-full bg-plum-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-plum-700 focus:ring-2 focus:ring-plum-500 focus:outline-none transition-all' type="submit">
                                Se connecter
                            </button>
                        )}
                    </div>

                    <p className="mt-6 text-center text-plum-700 text-sm">
                        Pas encore de compte ?{' '}
                        <Link to={'/register'} className='font-semibold hover:text-plum-900 underline underline-offset-2 transition-colors'>
                            Créer un compte
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login