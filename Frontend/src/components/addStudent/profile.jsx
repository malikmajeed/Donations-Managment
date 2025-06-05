import { useState } from "react"
import { FaCamera } from "react-icons/fa";
import styles from './profile.module.css'



export default function ProfileImageFunction(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);


    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file))
       
    };

  


    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <>

            <div className={styles.profileImageContainer}>
                <div className={styles.profileImage}>
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected profile" />
                    ) : (
                        <div className={styles.placeholderImage}>
                           <span>NA</span>
                        </div>
                    )}
                    
                    <div className={styles.imageOverlay} >
                        <label htmlFor="profileUpload" className={styles.uploadButton}>
                            <FaCamera size={20} />
                            <span>Change Photo</span>
                        </label>
                        <input
                            type="file"
                            id="profileUpload"
                            accept="image/*"

                            onChange={handleImageChange}
                            className={styles.hiddenInput}
                        />
                    </div>
                   
                </div>
                
            </div>


        </>
    )


}