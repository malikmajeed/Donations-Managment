import styles from './index.module.css';
import StudentsList from '../../Students/studentsCards/StudentsList';
import { CausesList, AddCause, UpdateCause, ViewCause } from '../../causes';
import { HeroSection, AboutSection } from './static-sections';

export default function HomePage() {
  return (
    <>
      <section>
        <HeroSection />
       <AboutSection />
      </section>
      <StudentsList />
      <CausesList /> // List all causes
// <AddCause /> // Add new cause (removed to prevent always-on modal)
<UpdateCause /> // Edit cause (requires id parameter)
<ViewCause />
      
    </>
  );
}
