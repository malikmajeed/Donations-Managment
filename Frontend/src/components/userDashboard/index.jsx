import { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';
import defaultAvatar from '../../../public/default-avatar.avif'

export default function UserDashboard(){
    const[donationsList, setDonationsList]=useState([]);
    const[user, setUser]=useState(null);
    const[isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(()=>{
        fetchUserData();
        fetchDonations();
    },[])

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:3000/user/dashboard', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('User data:', response.data);
            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDonations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/donation/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Donations data:', response.data);
            setDonationsList(response.data);
        } catch (error) {
            console.error('Error fetching donations:', error.message);
            setDonationsList([]);
        }
    };

    const getProfileImageUrl = () => {
        if (!user || !user.profileUrl) {
            return defaultAvatar;
        }
        // If the profileUrl is a relative path, prepend the base URL
        if (user.profileUrl.startsWith('/')) {
            return `http://localhost:3000${user.profileUrl}`;
        }
        return user.profileUrl;
    };

    return(
        <div className={styles.mainContainer}>
            <div className={styles.dashboardContainer}>
                {/* Left Column - Profile Section */}
                <div className={styles.profileSection}>
                    <div className={styles.profileImageContainer}>
                        {isLoading ? (
                            <div className={styles.loadingPlaceholder}>Loading...</div>
                        ) : (
                            <img 
                                src={getProfileImageUrl()}
                                alt={user ? `${user.fName || 'User'}'s profile` : 'User profile'} 
                                className={styles.profileImage}
                                onError={(e) => {
                                    console.log('Image load error, using default avatar');
                                    e.target.onerror = null;
                                    e.target.src = defaultAvatar;
                                }}
                            />
                        )}
                    </div>
                    
                    <div className={styles.userName}>
                        <span className={styles.title}>
                            {isLoading ? 'Loading...' : (user?.gender === 'male' ? 'Mr.' : 'Ms.')}
                        </span>
                        <span className={styles.name}>
                            {isLoading ? 'Loading...' : (user ? `${user.fName || ''} ${user.lName || ''}` : 'User')}
                        </span>
                    </div>

                    <div className={styles.privateInfo}>
                        <div className={styles.infoBox}>
                            <p className={styles.infoItem}>{isLoading ? 'Loading...' : (user?.email || 'Not provided')}</p>
                            <p className={styles.infoItem}>
                                {isLoading ? 'Loading...' : (user?.phone ? `+${user.phone}` : 'Not provided')}
                            </p>
                        </div>
                        <p className={styles.privacyNote}>This information is private and is only visible to you</p>
                    </div>

                    <button className={styles.updateProfileButton}>
                        Update Profile
                    </button>
                </div>

                {/* Right Column - Content Section */}
                <div className={styles.contentSection}>
                    <div className={styles.donationsTable}>
                        <h3>Sponsorship History</h3>
                        {isLoading ? (
                            <div className={styles.loadingPlaceholder}>Loading donations...</div>
                        ) : donationsList.length > 0 ? (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Students</th>
                                        <th>Current Status</th>
                                        <th>Amount</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    {donationsList.map((donation, index)=>(
                                        <tr key={donation._id} className={styles.tableRow}>
                                            <td className={styles.srNoColumn}>{index+1}</td>
                                            <td>
                                                <span>
                                                    {donation.donationTo ? 
                                                        `${donation.donationTo.firstName} ${donation.donationTo.lastName}` : 
                                                        'Student not found'}
                                                </span>
                                            </td>
                                            <td><span>{donation.status || 'NA'}</span></td>
                                            <td><span>${donation.Amount || 'NA'}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={styles.noData}>No donations found</div>
                        )}
                    </div>

                    <div className={styles.statsContainer}>
                        <div className={styles.statBox}>
                            <p>Number Of Donations</p>
                            <p className={styles.statValue}>{donationsList.length}</p>
                        </div>
                        <div className={styles.statBox}>
                            <p>Number Of Students Sponsored</p>
                            <p className={styles.statValue}>
                                {new Set(donationsList.map(d => d.donationTo?._id)).size}
                            </p>
                        </div>
                        <div className={styles.statBox}>
                            <p>Total Amount Donated</p>
                            <p className={styles.statValue}>
                                ${donationsList.reduce((sum, donation) => sum + (donation.Amount || 0), 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}