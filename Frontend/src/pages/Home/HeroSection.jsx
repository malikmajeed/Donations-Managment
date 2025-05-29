import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <h1>Ansar Relief Foundation</h1>
      <span>
        Helping under-served communities and reducing child labour by funding small businesses
        for families and giving free education to children.
      </span>
      <div className={styles.heroSectionButton}>
        <button className={styles.button1} type="button">
          Learn More
        </button>
        <button className={styles.donateButton}>Donate Now!</button>
      </div>
    </div>
  );
}
