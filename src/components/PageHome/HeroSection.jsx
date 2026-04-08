
export default function HeroSection() {
  return (
    <section id="accueil" className="relative pt-48 pb-28 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-plum-950 mb-6 leading-tight animate-slideup">
          Votre séjour
          <br />
          <span className="text-plum-600">au cœur des Pyrénées</span>
        </h1>

        {/* Subtitle */}
        <p className="text-plum-700/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-body animate-slideup" style={{ animationDelay: "0.2s" }}>
          Découvrez un havre de paix niché entre pins centenaires et lavande, 
          où chaque séjour devient un souvenir inoubliable.
        </p>
        <div 
          className="w-16 sm:w-24 h-px bg-plum-300 mx-auto mt-12 animate-slideup" 
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </section>
  );
}