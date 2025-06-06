

import styles from './index.module.css';


export default function ProfileCard({student}){

console.log('mouse over triggered');
    return(
        <div className={styles.ProfileContainer}>
            <div className={styles.profileImage}>
            <img src={student.profileUrl} alt={`${student.firstName[0]} ${student.lastName[0]}`} />
           
            </div>
             <div className={styles.textSection}>
                <p className={styles.label}>Name</p>
                <p className={styles.Input}>{`${student.firstName} ${student.lastName}`}</p>
            </div>
            <div className={styles.textSection}>
                <p className={styles.label}>Class</p>
                <p className={styles.Input}>{student.grade}</p>
            </div>
            <div className={styles.textSection}>
                <p className={styles.label}>Age</p>
                <p className={styles.Input}>{student.dateOfBirth}</p>
            </div>
        </div>
    );





}