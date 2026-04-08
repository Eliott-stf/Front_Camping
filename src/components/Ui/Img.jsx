export function Img({ url }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={url}
          alt=""
          className="w-full h-72 sm:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
        />
        
      </div>
    </div>
  );
}