import DescriptionSections from '../../components/PageHome/DescriptionSections';
import { dataSections } from '../../constants/appConstant';
import HeroSection from '../../components/PageHome/HeroSection';

function Home() {
  return (
    <div>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 space-y-24 lg:space-y-32 pb-16">
        {dataSections.map((section) => (
          <DescriptionSections
            key={section.id}
            id={section.id}
            badge={section.badge}
            title={section.title}
            description={section.description}
            imageUrl={section.imageUrl}
            reversed={section.reversed}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;