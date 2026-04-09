import InfoField from "./InfoField";
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export default function ProfileSection({ utilisateur }) {
  return (
    <div className="carte animate-slideup">
      <h2 className="titre text-xl font-semibold mb-5 flex items-center gap-2">
        <FaRegUser className="h-5 w-5 text-plum-600" />
        Informations personnelles
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoField label="Nom" value={utilisateur.nom} />
        <InfoField label="Prénom" value={utilisateur.prenom} />
        <div className="sm:col-span-2">
          <InfoField
            label="Email"
            value={utilisateur.email}
            icon={<CiMail className="h-4 w-4 text-plum-400" />}
          />
        </div>
      </div>
    </div>
  );
}