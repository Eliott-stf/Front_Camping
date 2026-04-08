import React from "react";
import { MdMailOutline, MdOutlinePhone } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import Navlinks from "./Navlinks";
import { dataNavbar } from "../../constants/appConstant";

export default function Footer() {
  return (
    <footer id="contact" className="bg-plum-950 text-plum-300 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Marque */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-xl font-bold text-white">Les Lilas</span>
            </div>
            <p className="text-plum-400 text-sm leading-relaxed">
              Un camping familial au cœur des Pyrénées, où la nature 
              et le confort se rencontrent pour des vacances parfaites.
            </p>
          </div>

          {/* Navigation via Navlinks */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <Navlinks 
              data={dataNavbar}
              marginTop="space-y-2"
              className="navlink-footer block text-sm text-plum-400 hover:text-white transition-colors no-underline"
            />
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MdOutlinePhone className="w-4 h-4 text-plum-500" />
                <span>+33 4 90 12 34 56</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MdMailOutline className="w-4 h-4 text-plum-500" />
                <span>contact@leslilas.fr</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiMapPin className="w-4 h-4 text-plum-500" />
                <span>Route des Lavandes, 84000 Provence</span>
              </div>
            </div>
          </div>
        </div>

        <div className="separateur border-plum-800! my-8!" />

        <p className="text-center text-plum-500 text-xs">
          © 2026 Camping Les Lilas — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}