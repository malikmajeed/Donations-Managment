import styles from './index.module.css';
import { MdBoy, MdGirl, MdPerson, MdCalendarToday, MdClass, MdAttachMoney } from 'react-icons/md';

export default function StudentCard({
  profileImage,
  firstName,
  lastName,
  gender,
  age,
  profileUrl,
  studentClass,
  fee,
  sponsored,
  adminView = false,
  studentId
}) {
  let GenderIcon = MdPerson;
  if (gender === 'male') GenderIcon = MdBoy;
  else if (gender === 'female') GenderIcon = MdGirl;

  // Use default avatar if profileImage is missing, null, or empty string
  let imageSrc = '/default-avatar.avif';
  if (profileImage && profileImage.trim() !== '') {
    imageSrc = profileImage.startsWith('http')
      ? profileImage
      : `http://localhost:3000/${profileImage.replace(/^\/+/, '')}`;
  }

  

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
        src={imageSrc}
        alt={firstName + ' ' + lastName}
        className={styles.profileImage}
        loading="lazy"
      />
      <div className={styles.nameRow}>
        <span className={styles.fullName}>{firstName} {lastName}</span>
      </div>
      <div className={styles.infoColumn}>
        <span className={styles.infoItem}><MdCalendarToday size={20} style={{marginRight: 6, color: '#4f8cff'}}/>Age: {age} years</span>
        <span className={styles.infoItem}><MdClass size={20} style={{marginRight: 6, color: '#4f8cff'}}/>Class: {studentClass}</span>
        <span className={styles.infoItem}>Monthly Fee: <span className={styles.feeValue}>${fee}</span></span>
      </div>
      <div className={styles.cardButtons}>
        {adminView ? (
          <>
            <button className={styles.viewProfileBtn} data-studentid={studentId}>View Profile</button>
            <button className={styles.sponsorBtn} data-studentid={studentId}>Edit</button>
          </>
        ) : (
          <>
            <button className={styles.sponsorBtn}>Sponsor</button>
            <button className={styles.viewProfileBtn}>View Profile</button>
          </>
        )}
      </div>
    </div>
  );
}
