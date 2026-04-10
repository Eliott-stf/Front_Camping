import React, { useEffect, useState } from "react";

export default function Options({ services, adults, childrenCount, onUpdate }) {
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (services && services.length > 0 && Object.keys(quantities).length === 0) {
      const initialQuantities = {};
      const initialSelected = [];

      services.forEach((service) => {
        const isEnfant = service.title.toLowerCase().includes("enfant");
        const maxLimit = isEnfant ? childrenCount : adults;
        
        // Initialiser avec le maximum possible selon le nombre de personnes
        initialQuantities[service.id] = maxLimit;

        for (let i = 0; i < maxLimit; i++) {
          initialSelected.push(service);
        }
      });

      setQuantities(initialQuantities);
      onUpdate(initialSelected);
    }
  }, [services, adults, childrenCount]);

  const updateQuantity = (service, delta) => {
    const isEnfant = service.title.toLowerCase().includes("enfant");
    const maxLimit = isEnfant ? childrenCount : adults;

    setQuantities((prev) => {
      const currentQty = prev[service.id] || 0;
      // Empêche de descendre sous 0 et de dépasser le maxLimit
      const newQty = Math.max(0, Math.min(currentQty + delta, maxLimit));

      if (currentQty === newQty) return prev;

      const newQuantities = { ...prev, [service.id]: newQty };

      const updatedSelected = [];
      services.forEach((s) => {
        const qty = s.id === service.id ? newQty : (prev[s.id] || 0);
        for (let i = 0; i < qty; i++) {
          updatedSelected.push(s);
        }
      });

      onUpdate(updatedSelected);
      return newQuantities;
    });
  };

  return (
  <div className="mt-8 bg-white border border-plum-100 rounded-2xl shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-plum-50">
      <h3 className="text-lg font-semibold text-plum-900">Options supplémentaires</h3>
    </div>
    
    <div className="p-6">
      {services && services.length > 0 ? (
        <div className="space-y-6">
          {services.map((service) => {
            const isEnfant = service.title.toLowerCase().includes("enfant");
            const maxLimit = isEnfant ? childrenCount : adults;
            const currentQty = quantities[service.id] || 0;
            const isDisabled = maxLimit === 0;

            return (
              <div 
                key={service.id} 
                className={`flex items-center justify-between transition-all ${isDisabled ? 'opacity-30 grayscale pointer-events-none' : ''}`}
              >
                <div className="flex flex-col">
                  <span className="text-plum-900 font-medium text-base">{service.title}</span>
                  <span className="text-plum-500 text-sm">{service.price}€ / pers.</span>
                </div>

                <div className="flex items-center bg-plum-50/50 rounded-full p-1 border border-plum-100">
                  <button
                    type="button"
                    onClick={() => updateQuantity(service, -1)}
                    disabled={isDisabled || currentQty <= 0}
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-xl font-semibold text-plum-700 hover:text-plum-900 hover:bg-plum-50 transition-all disabled:opacity-30"
                  >
                    −
                  </button>
                  
                  <span className="w-10 text-center font-bold text-plum-900">
                    {currentQty}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => updateQuantity(service, 1)}
                    disabled={isDisabled || currentQty >= maxLimit}
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-xl font-semibold text-plum-700 hover:text-plum-900 hover:bg-plum-50 transition-all disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-plum-400 text-center italic">Aucune option disponible pour ce séjour.</p>
      )}
    </div>
  </div>
);
}