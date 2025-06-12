
import styles from './index.module.css';
import {FaTrash} from 'react-icons/fa'



export default function DeleteConfirmationModel({onClose, onConfirm}){
    

    return(
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <h3>Are you sure to Delete this Student?</h3>
                <div className={styles.buttonsSection}>
                    <button onClick={onClose} className={styles.cancelButton}>
                        Cancel
                    </button>
                     <button onClick={onConfirm} className={styles.deleteButton}>
                    <FaTrash />
                    <span>Yes, Delete</span></button>
                    </div>
                
            </div>

        </div>
    );
}