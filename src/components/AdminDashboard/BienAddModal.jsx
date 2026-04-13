import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../store/Product/productSlice';
import { getImageUrl } from '../../lib/utils';
import axios from 'axios';
import { API_URL } from '../../constants/apiConstant';
import { FaPlus, FaTrash } from 'react-icons/fa6';

export default function BienAddModal({ onClose }) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        type: 'hebergement',
    });
    const [medias, setMedias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [createdProductId, setCreatedProductId] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Ajoute une photo
    const handleAddMedia = async (e) => {
        const file = e.target.files[0];
        if (!file || !createdProductId) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productId', createdProductId);

            const response = await axios.post(`${API_URL}/media/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Backend retourne: { id: 817, path: 'http://localhost:8010/images/uploads/...' }
            const { id, path } = response.data;

            setMedias(prev => [...prev, {
                '@id': `/api/media/${id}`,
                path: path
            }]);
        } catch (error) {
            console.error('Erreur upload media :', error);
            setError('Erreur lors de l\'ajout de la photo');
        } finally {
            setUploading(false);
        }
    };

    // Supprime une photo
    const handleDeleteMedia = async (mediaId) => {
        if (!mediaId || !window.confirm('Supprimer cette photo ?')) return;
        try {
            const deleteUrl = mediaId.startsWith('/')
                ? `http://localhost:8010${mediaId}`
                : `${API_URL}/media/${mediaId}`;

            await axios.delete(deleteUrl);
            setMedias(prev => prev.filter(m => (m['@id'] || m.id) !== mediaId));
        } catch (error) {
            console.error('Erreur suppression media :', error);
            setError('Erreur lors de la suppression de la photo');
        }
    };

    const handleCreate = async () => {
        if (!form.title.trim() || !form.description.trim() || !form.price) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/products`, {
                title: form.title,
                description: form.description,
                price: parseInt(form.price),
                type: form.type,
            });

            // Sauvegarder l'ID du produit créé pour pouvoir uploader les photos
            setCreatedProductId(response.data.id);
            setError('');
        } catch (err) {
            setError('Erreur lors de la création du bien');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFinish = async () => {
        // Recharger la liste et fermer
        dispatch(fetchAllProducts());
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-plum-100 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-semibold text-plum-950">Ajouter un nouveau bien</h2>
                    <button onClick={onClose} className="text-plum-400 hover:text-plum-700 text-xl font-bold">✕</button>
                </div>

                {/* Formulaire */}
                <div className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    {!createdProductId ? (
                        <>
                            {/* Formulaire d'création */}
                            <div>
                                <label className="block text-xs font-medium text-plum-600 mb-1">Titre</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="ex: MH-001 - Caravane 4 places"
                                    disabled={createdProductId}
                                    className="w-full px-3 py-2 rounded-lg border border-plum-200 text-sm text-plum-900 focus:ring-2 focus:ring-plum-400 outline-none disabled:bg-plum-50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-plum-600 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Décrivez le bien..."
                                    disabled={createdProductId}
                                    className="w-full px-3 py-2 rounded-lg border border-plum-200 text-sm text-plum-900 focus:ring-2 focus:ring-plum-400 outline-none resize-none disabled:bg-plum-50"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-plum-600 mb-1">Prix (€/nuit)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="0"
                                        disabled={createdProductId}
                                        className="w-full px-3 py-2 rounded-lg border border-plum-200 text-sm text-plum-900 focus:ring-2 focus:ring-plum-400 outline-none disabled:bg-plum-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-plum-600 mb-1">Type</label>
                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleChange}
                                        disabled={createdProductId}
                                        className="w-full px-3 py-2 rounded-lg border border-plum-200 text-sm text-plum-900 focus:ring-2 focus:ring-plum-400 outline-none disabled:bg-plum-50"
                                    >
                                        <option value="hebergement">Hébergement</option>
                                        <option value="service">Service</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Section upload photos après création */}
                            <div className="bg-plum-50 p-4 rounded-lg border border-plum-200">
                                <p className="text-sm font-semibold text-plum-950 mb-3">Bien créé ! Ajoutez des photos (optionnel)</p>

                                <div>
                                    <p className="text-xs font-medium text-plum-600 mb-2">Photos ({medias.length}/3)</p>
                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                        {medias.map((media) => (
                                            <div key={media['@id'] || media.id} className="relative group aspect-square rounded-lg overflow-hidden bg-plum-100">
                                                <img
                                                    src={getImageUrl(media.path)}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    onClick={() => handleDeleteMedia(media['@id'] || media.id)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTrash className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}

                                        {medias.length < 3 && (
                                            <label className="aspect-square rounded-lg border-2 border-dashed border-plum-200 flex flex-col items-center justify-center cursor-pointer hover:border-plum-400 hover:bg-plum-100 transition-all">
                                                {uploading ? (
                                                    <span className="text-xs text-plum-400">Upload...</span>
                                                ) : (
                                                    <>
                                                        <FaPlus className="w-4 h-4 text-plum-300 mb-1" />
                                                        <span className="text-xs text-plum-400">Ajouter</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleAddMedia}
                                                    disabled={uploading}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-plum-100 sticky bottom-0 bg-white">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-plum-600 hover:text-plum-900 transition-colors"
                    >
                        Annuler
                    </button>
                    {!createdProductId ? (
                        <button
                            onClick={handleCreate}
                            disabled={loading}
                            className="px-5 py-2 text-sm bg-plum-600 text-white rounded-xl hover:bg-plum-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Création...' : 'Créer le bien'}
                        </button>
                    ) : (
                        <button
                            onClick={handleFinish}
                            className="px-5 py-2 text-sm bg-plum-600 text-white rounded-xl hover:bg-plum-700 transition-all"
                        >
                            Terminer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}