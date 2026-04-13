import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, User, Mail } from 'lucide-react';

import { cn } from '../../../lib/utils';
import { fetchOwners } from '../../../store/User/userSlice';
import PageHeader from '../../../components/AdminDashboard/PageHeader';

export default function OwnersManagement() {
    //state et hook
    const dispatch = useDispatch();
    const { owners, loading, error } = useSelector((state) => state.users);

    const [search, setSearch] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        dispatch(fetchOwners());
    }, [dispatch]);

    //méthode pr filtrer sur le nom  et prénom
    const filtered = useMemo(() => {
        if (!search) return owners;
        return owners.filter(o =>
            `${o.name} ${o.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
            o.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, owners]);

    if (loading) return <div>Chargement des propriétaires...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <div className="animate-slideup2">
            <PageHeader title="Propriétaires" subtitle={`${owners.length} propriétaires enregistrés`} />

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-6">
                <div className="carte">
                    <p className="text-xs text-plum-500 uppercase tracking-wider font-medium">Propriétaires totaux</p>
                    <p className="text-2xl font-bold text-plum-950 font-display mt-1">{owners.length}</p>
                </div>
            </div>

            <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-plum-400" />
                <input
                    type="text"
                    placeholder="Rechercher un propriétaire..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-plum-200 bg-white focus:ring-2 focus:ring-plum-400 focus:border-plum-400 outline-none transition-all text-plum-900 placeholder:text-plum-400"
                />
            </div>

            <div className="space-y-3">
                {filtered.map(owner => (
                    <div key={owner.id} className="carte hover:shadow-md transition-shadow duration-200">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => setExpandedId(expandedId === owner.id ? null : owner.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-plum-100 flex items-center justify-center">
                                    <User className="w-5 h-5 text-plum-600" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-plum-950">{owner.name} {owner.lastname}</h4>
                                    <p className="text-xs text-plum-500">
                                        {owner.products ? owner.products.length : 0} bien(s)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {expandedId === owner.id && (
                            <div className="mt-4 pt-4 border-t border-plum-200 animate-slideup2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-plum-600">
                                            <Mail className="w-4 h-4 text-plum-400" />
                                            {owner.email}
                                        </div>
                                    </div>
                                    <div className="bg-plum-50 rounded-lg p-4">
                                        <p className="text-xs text-plum-500 font-medium mb-2">Biens possédés</p>
                                        <ul className="space-y-1 text-sm list-disc pl-4">
                                            {owner.products && owner.products.length > 0 ? (
                                                owner.products.map((product, index) => (
                                                    <li key={index} className="text-plum-900">
                                                        {product.title}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-plum-500 italic list-none -ml-4">Aucun bien assigné</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}