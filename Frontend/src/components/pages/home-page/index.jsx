
import StudentCatalog from '../../students/StudentCatalog';

// import { CausesList, AddCause, UpdateCause, ViewCause } from '../../causes';
import { HeroSection, AboutSection, OurVision } from './static-sections';

export default function HomePage() {
  return (
    <>
    
      <section>
        <HeroSection />
       <AboutSection />
       <OurVision />
      </section>
      <StudentCatalog />




      
    </>
  );
}
