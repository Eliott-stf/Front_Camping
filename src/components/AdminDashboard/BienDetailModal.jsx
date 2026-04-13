import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, fetchAllProducts } from '../../store/Product/productSlice';
import { getImageUrl } from '../../lib/utils';
import { API_ROOT, API_URL } from '../../constants/apiConstant';
import axios from 'axios';
import { FaTrash, FaPlus } from 'react-icons/fa6';

export default function BienDetailModal({ bien, onClose }) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        type: '',
    });
    const [medias, setMedias] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (bien) {
            setForm({
                title: bien.title ?? '',
                description: bien.description ?? '',
                price: bien.price ?? '',
                type: bien.type ?? '',
            });
            setMedias(bien.media ?? []);
        }
    }, [bien]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        dispatch(updateProduct(bien.id, {
            title: form.title,
            description: form.description,
            price: parseInt(form.price),
            type: form.type,
        }));
        onClose();
    };

    // Supprime une photo
    const handleDeleteMedia = async (mediaId) => {
        if (!mediaId || !window.confirm('Supprimer cette photo ?')) return;
        try {
            // Si mediaId est déjà une IRI complet (/api/media/xxx), l'utiliser directement
            const deleteUrl = mediaId.startsWith('/')
                ? `${API_ROOT}${mediaId}`
                : `${API_URL}/media/${mediaId}`;

            await axios.delete(deleteUrl);
            setMedias(prev => prev.filter(m => (m['@id'] || m.id) !== mediaId));
        } catch (error) {
            console.error('Erreur suppression media :', error);
            alert('Erreur lors de la suppression de la photo');
        }
    };

    // Ajoute une photo
    const handleAddMedia = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productId', bien.id);

            const response = await axios.post(`${API_URL}/media/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Backend retourne: { id: 817, path: 'http://localhost:8010/images/uploads/69dcb2ba5c94e.jpg' }
            const { id, path } = response.data;

            setMedias(prev => [...prev, {
                '@id': `/api/media/${id}`,
                path: path  // L'URL complète
            }]);
            alert('Photo ajoutée avec succès');
        } catch (error) {
            console.error('Erreur upload media :', error);
            alert('Erreur lors de l\'ajout de la photo: ' + (error.response?.data?.detail || error.message));
        } finally {
            setUploading(false);
            dispatch(fetchAllProducts());
        }
    };

    if (!bien) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-plum-100 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-semibold text-plum-950">Modifier le bien</h2>
                    <button onClick={onClose} className="text-plum-400 hover:text-plum-700 text-xl font-bold">✕</button>
                </div>

                <div className="p-6 space-y-6">

                    {/* Photos */}
                    <div>
                        <p className="text-xs font-medium text-plum-600 mb-2">
                            Photos ({medias.length}/3)
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {medias.map((media) => (
                                <div key={media['@id'] || media.id} className="relative group aspect-square rounded-lg overflow-hidden bg-plum-100">
                                    <img
                                        src={getImageUrl(media.path)}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Bouton suppression photo */}
                                    <button
                                        onClick={() => handleDeleteMedia(media['@id'] || media.id)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <FaTrash className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}

                            {/* Bouton ajout photo si moins de 3 */}
                            {medias.length < 3 && (
                                <label className="aspect-square rounded-lg border-2 border-dashed border-plum-200 flex flex-col items-center justify-center cursor-pointer hover:border-plum-400 hover:bg-plum-50 transition-all">
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

                    {/* Formulaire */}
                    <div>
                        <label className="block text-xs font-medium text-plum-600 mb-1">Titre</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border border-plum-200 text-sm text-plum-900 focus:ring-2 focus:ring-plum-400 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-plum-600 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-plum-200 text-sm text-plum-900 focus:ring-2 focus:ring-plum-400 outline-none resize-none"
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
                                className="w-full px-3 py-2 rounded-lg border border-plum-200 text-sm text-plum-900 focus:ring-2 focus:ring-plum-400 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-plum-600 mb-1">Type</label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-plum-200 text-sm text-plum-900 focus:ring-2 focus:ring-plum-400 outline-none"
                            >
                                <option value="hebergement">Hébergement</option>
                                <option value="service">Service</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-plum-100 sticky bottom-0 bg-white">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-plum-600 hover:text-plum-900 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 text-sm bg-plum-600 text-white rounded-xl hover:bg-plum-700 transition-all"
                    >
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
}