import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "../../contexts/AuthContext";
import { dataNavbar } from "../../constants/appConstant";
import Navlinks from "./Navlinks";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { userId } = useAuthContext();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-plum-200/50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 no-underline">
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

                <Link to="#contact" className="hidden md:block bg-plum-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-plum-700 focus:ring-2 focus:ring-plum-500 focus:outline-none transition-all no-underline text-sm">
                    Réserver
                </Link>

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

                    <Link to="#contact" onClick={() => setMobileOpen(false)} className="block bg-plum-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-plum-700 focus:ring-2 focus:ring-plum-500 focus:outline-none transition-all text-center no-underline mt-3 text-sm">
                        Réserver
                    </Link>
                </div>
            )}
        </nav>
    );
}