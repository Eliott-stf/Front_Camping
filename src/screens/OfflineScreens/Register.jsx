import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/Ui/CustomInput';
import ErrorMessage from '../../components/Ui/ErrorMessage';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_ROOT } from '../../constants/apiConstant';

const Register = () => {

    //on délcare nos state pour les valeurs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [consentDataRetention, setConsentDataRetention] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');

    //on récupère le hook de navigation
    const navigate = useNavigate();
    //on récupère la méthode signIn du context
    const { signIn } = useAuthContext();

    useEffect(() => {
        //si j'ai un utilisateur en session, on le redirige sur '/' du OnlineRouter
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    //Méthode qui receptionne les datas du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault(); //on empeche le comportement naturel du formulaire
        setIsLoading(true);
        setErrorMessage('');
        try {
            //verifs
            if (email === '' || name === '' || lastname === '' || password === '' || confirmPassword === '') {
                setErrorMessage("Tout les champs sont obligatoires");
                return;
            } else if (password !== confirmPassword) {
                setErrorMessage("Les mots de passe doivent être identiques");
                return;
            } else if (password.length < 4) {
                setErrorMessage("Le mot de passe doit contenir au moins 4 caractères");
                return;
            } else {
                const response = await axios.post(`${API_ROOT}/register`, {
                    email,
                    password,
                    name,
                    lastname,
                    consentDataRetention
                });

                if (response.data?.success === false) {
                    setErrorMessage(response.data.message);
                } else {
                    const loggedInUser = {
                        userId: response.data.user.id,
                        email: response.data.user.email,
                        name: response.data.user.name,
                        lastname: response.data.user.lastname,
                        role: response.data.user.role || 'USER',
                    }

                    //on appelle la méthode signIN de authcontext pour enregistrer l'utilisateur
                    await signIn(loggedInUser);
                    setUser(loggedInUser);

                    //on force la redirection vers la plateforme
                    navigate("/");
                }
            }

        } catch (error) {
            console.log(`Erreur de requete lors de la création du compte: ${error}`);
            setErrorMessage(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='flex justify-center items-center w-full min-h-[70vh] px-4 sm:px-6 py-8 bg-plum-50'>
            <div className="w-full max-w-md animate-slideup2">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-plum-950">Inscrivez-vous</h1>
                    <p className="text-plum-600 mt-2 text-sm">Rejoignez la plateforme en quelques secondes</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='w-full bg-white border border-plum-200 rounded-2xl p-8 sm:p-10 shadow-lg shadow-plum-200/50'>

                    <div className="space-y-4">
                        <CustomInput
                            label={'Prénom'}
                            type={'text'}
                            placeholder='votre prénom'
                            state={name}
                            callable={(event) => setName(event.target.value)} />
                        <CustomInput
                            label={'Nom'}
                            type={'text'}
                            placeholder='votre nom'
                            state={lastname}
                            callable={(event) => setLastname(event.target.value)} />
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
                        <CustomInput
                            label={'Confirmer votre mot de passe'}
                            type={'password'}
                            placeholder='•••••••'
                            state={confirmPassword}
                            callable={(event) => setConfirmPassword(event.target.value)} />

                        <div className="flex items-start pt-2">
                            <div className="flex items-center h-5">
                                <input
                                    id="consent"
                                    type="checkbox"
                                    checked={consentDataRetention}
                                    onChange={(e) => setConsentDataRetention(e.target.checked)}
                                    className="w-4 h-4 text-plum-600 bg-white border-plum-300 rounded focus:ring-plum-500 focus:ring-2 cursor-pointer"
                                    required
                                />
                            </div>
                            <label htmlFor="consent" className="ml-2 text-sm text-plum-700 cursor-pointer">
                                J'accepte la conservation de mes données personnelles.
                            </label>
                        </div>
                    </div>

                    {errorMessage && <ErrorMessage message={errorMessage} />}

                    <div className="mt-8">
                        {isLoading ? (
                            <div className="flex justify-center py-2">
                                <ButtonLoader />
                            </div>
                        ) : (
                            <button className='w-full bg-plum-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-plum-700 focus:ring-2 focus:ring-plum-500 focus:outline-none transition-all' type="submit">
                                S'inscrire
                            </button>
                        )}
                    </div>

                    <p className="mt-6 text-center text-plum-700 text-sm">
                        Déjà un compte ?{' '}
                        <Link to={'/login'} className='font-semibold hover:text-plum-900 underline underline-offset-2 transition-colors'>
                            Se connecter
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register