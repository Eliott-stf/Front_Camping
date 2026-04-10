import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries, CiLogout } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { dataNavbar } from "../../constants/appConstant";
import Navlinks from "./Navlinks";
import { IMAGE_URL } from "../../constants/apiConstant";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { userId, signOut } = useAuthContext();
    const navigate = useNavigate();
    const ImgSrc = `${IMAGE_URL}/logo.png`;

    const handleLogout = async () => {
        await signOut();
        navigate("/");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-plum-200/50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 no-underline">
                    <img src={ImgSrc} alt="Les Lilas Logo" className="w-18 h-14" />
                    <span className="font-display text-xl font-bold text-plum-950 tracking-tight">
                        Les Lilas
                    </span>
                </Link>

                <Navlinks
                    data={dataNavbar}
                    userId={userId}
                    marginTop="hidden md:flex items-center gap-1 bg-plum-100/60 rounded-full p-1.5"
                    className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 no-underline text-plum-700 hover:bg-plum-700 hover:text-white [&.active]:bg-plum-700 [&.active]:text-white [&.active]:shadow-md"
                />

                {/* Boutons Desktop */}
                <div className="hidden md:flex items-center gap-2">
                    {userId ? (
                        <>
                            <Link
                                to="/compte"
                                className="flex items-center gap-2 bg-plum-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-plum-700 focus:ring-2 focus:ring-plum-500 focus:outline-none transition-all no-underline text-sm font-medium"
                            >
                                <FaRegUser className="w-4 h-4" />
                                <span>Mon compte</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-plum-700 hover:text-plum-950 p-2 rounded-md hover:bg-plum-100/50 transition-all text-sm font-medium"
                                title="Se déconnecter"
                            >
                                <CiLogout className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-plum-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-plum-700 focus:ring-2 focus:ring-plum-500 focus:outline-none transition-all no-underline text-sm font-medium"
                        >
                            <FaRegUser className="w-4 h-4" />
                            <span>Se connecter</span>
                        </Link>
                    )}
                </div>

                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 text-plum-700"
                >
                    {mobileOpen ? <AiOutlineClose className="w-6 h-6" /> : <CiMenuFries className="w-6 h-6" />}
                </button>
            </div>

            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-plum-200 px-6 pb-6 pt-2 space-y-1">
                    <Navlinks
                        data={dataNavbar}
                        userId={userId}
                        handleClick={() => setMobileOpen(false)}
                        marginTop="flex flex-col space-y-1"
                        className="block px-4 py-3 rounded-xl text-sm font-medium transition-all no-underline text-plum-700 hover:bg-plum-700 hover:text-white [&.active]:bg-plum-700 [&.active]:text-white"
                    />

                    {/* Boutons Mobile */}
                    <div className="space-y-2 mt-4">
                        {userId ? (
                            <>
                                <Link
                                    to="/compte"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 bg-plum-600 text-white px-4 py-3 rounded-md shadow-sm hover:bg-plum-700 focus:ring-2 focus:ring-plum-500 focus:outline-none transition-all text-center no-underline text-sm font-medium"
                                >
                                    <FaRegUser className="w-4 h-4" />
                                    <span>Mon compte</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 text-plum-700 hover:text-plum-950 px-4 py-3 rounded-md hover:bg-plum-100/50 transition-all text-sm font-medium"
                                >
                                    <CiLogout className="w-5 h-5" />
                                    <span>Se déconnecter</span>
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-2 bg-plum-600 text-white px-4 py-3 rounded-md shadow-sm hover:bg-plum-700 focus:ring-2 focus:ring-plum-500 focus:outline-none transition-all text-center no-underline text-sm font-medium"
                            >
                                <FaRegUser className="w-4 h-4" />
                                <span>Se connecter</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}