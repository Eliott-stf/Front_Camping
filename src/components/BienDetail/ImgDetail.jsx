import { getImageUrl } from "../../lib/utils";

export default function ImgDetail({ product }) {
  const medias = product?.media || [];

  return (
    <>
      {/* Titre */}
      <h1 className="font-display text-4xl text-plum-950 mb-6">{product.title}</h1>

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-500px mb-10">

        {/* Colonne gauche — grande image */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden bg-plum-100 h-300px lg:h-full">
          {medias[0]?.path ? (
            <img
              src={getImageUrl(medias[0].path)}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-plum-400">
              Pas d'image
            </div>
          )}
        </div>

        {/* Colonne droite — 2 petites images  */}
        <div className="grid grid-rows-2 gap-4 h-400px lg:h-full">
          {[medias[1], medias[2]].map((media, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-plum-100 relative">
              {media?.path ? (
                <img
                  src={getImageUrl(media.path)}
                  alt={`${product.title} ${i + 2}`}
                  className="w-full h-full object-cover absolute inset-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-plum-400 text-sm absolute inset-0">
                  Pas d'image
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}