import styles from './index.module.css';
import { MdBoy, MdGirl, MdPerson, MdCalendarToday, MdClass, MdAttachMoney } from 'react-icons/md';

export default function StudentCard({
  profileImage,
  firstName,
  lastName,
  gender,
  age,
  studentClass,
  fee,
  sponsored
}) {
  let GenderIcon = MdPerson;
  if (gender === 'male') GenderIcon = MdBoy;
  else if (gender === 'female') GenderIcon = MdGirl;

  return (
    <div className={styles.studentCard}>
      <div className={styles.statusRow}>
        <span className={styles.status + ' ' + (sponsored ? styles.sponsored : styles.notSponsored)}>
          {sponsored ? 'Sponsored' : 'Not Sponsored'}
        </span>
        <span className={styles.genderAvatar}>
          <GenderIcon size={40} />
        </span>
      </div>
      <img
        src={profileImage || '/default-avatar.avif'}
        alt={firstName + ' ' + lastName}
        className={styles.profileImage}
        loading="lazy"
      />
      <div className={styles.nameRow}>
        <span className={styles.fullName}>{firstName} {lastName}</span>
      </div>
      <div className={styles.infoColumn}>
        <span className={styles.infoItem}><MdCalendarToday size={20} style={{marginRight: 6, color: '#4f8cff'}}/>Age: {age}</span>
        <span className={styles.infoItem}><MdClass size={20} style={{marginRight: 6, color: '#4f8cff'}}/>Class: {studentClass}</span>
        <span className={styles.infoItem}>Monthly Fee: <span className={styles.feeValue}>${fee}</span></span>
      </div>
      <div className={styles.cardButtons}>
        <button className={styles.sponsorBtn}>Sponsor</button>
        <button className={styles.viewProfileBtn}>View Profile</button>
      </div>
    </div>
  );
}
