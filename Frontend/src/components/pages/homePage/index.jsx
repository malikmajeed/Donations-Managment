import styles from './index.module.css';
import StudentsList from '../../Students/studentsCards/StudentsList';
import { CausesList, AddCause, UpdateCause, ViewCause } from '../../causes';

export default function HomePage() {
  return (
    <>
      <section className={styles.heroSection}>
        <img
          src="/HomePage Hero Section.webp"
          alt="Empowering Afghanistan's Future"
          className={styles.backgroundImage}
          draggable={false}
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.title}>Empowering Afghanistan's Future</h1>
          <p className={styles.subtitle}>
            PROVIDING EMERGENCY RELIEF, QUALITY EDUCATION, HEALTHCARE, AND SUSTAINABLE DEVELOPMENT
          </p>
          <div className={styles.buttonGroup}>
            <button className={`${styles.macButton} ${styles.primary}`}>Donate Now</button>
            <button className={styles.macButton}>Know More</button>
          </div>
        </div>
      </section>
      <StudentsList />
      <CausesList /> // List all causes
// <AddCause /> // Add new cause (removed to prevent always-on modal)
<UpdateCause /> // Edit cause (requires id parameter)
<ViewCause />
      
    </>
  );
}
