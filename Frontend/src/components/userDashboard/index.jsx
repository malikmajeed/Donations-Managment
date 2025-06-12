import { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';

export default function UserDashboard(){
    const[donationsList, setDonationsList]=useState([]);
    const[user, setUser]=useState({});
    const token = localStorage.getItem('token');

    useEffect(()=>{
        fetchDonations();
        fetchUserProfile();
    },[])

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error.message);
        }
    };

    const fetchDonations= async()=>{
        try{
            const response = await axios.get('http://localhost:3000/donation/',
                {headers:{
                    'Authorization':`Bearer ${token}`
                }}
            )
            setDonationsList(response.data);
        }catch(error){
            console.log(error.message)
        }
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.dashboardContainer}>
                {/* Left Column - Profile Section */}
                <div className={styles.profileSection}>
                    <div className={styles.profileImageContainer}>
                        <img 
                            src={user.profileURL || '/default-avatar.png'} 
                            alt={`${user.fName || 'User'}'s profile`} 
                            className={styles.profileImage}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-avatar.png';
                            }}
                        />
                    </div>
                    
                    <div className={styles.userName}>
                        <span className={styles.title}>{user.gender === 'male' ? 'Mr.' : 'Ms.'}</span>
                        <span className={styles.name}>{user.fName && user.lName ? `${user.fName} ${user.lName}` : 'Loading...'}</span>
                    </div>

                    <div className={styles.privateInfo}>
                        <div className={styles.infoBox}>
                            <p className={styles.infoItem}>{user.email || 'Loading...'}</p>
                            <p className={styles.infoItem}>{user.phone ? `+${user.phone}` : 'Loading...'}</p>
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
                        <h3>Donation History</h3>
                        {donationsList ? 
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Student</th>
                                    <th>Current Status</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donationsList.map((Donation, index)=>(
                                    <tr key={Donation._id} className={styles.tableRow}>
                                        <td className={styles.srNoColumn}>{index+1 || 'NA'}</td>
                                        <td><span>{`${Donation.donationTo.firstName} ${Donation.donationTo.lastName}` || 'NA'}</span></td>
                                        <td><span>{Donation.status || 'NA'}</span></td>
                                        <td><span>${Donation.Amount || 'NA'}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : <div>No donations found</div>}
                    </div>

                    <div className={styles.statsContainer}>
                        <div className={styles.statBox}>
                            <p>Number Of Donations</p>
                            <p className={styles.statValue}>{donationsList.length}</p>
                        </div>
                        <div className={styles.statBox}>
                            <p>Number Of Students Sponsored</p>
                            <p className={styles.statValue}>{donationsList.length}</p>
                        </div>
                        <div className={styles.statBox}>
                            <p>Total Amount Donated</p>
                            <p className={styles.statValue}>${donationsList.reduce((sum, donation) => sum + (donation.Amount || 0), 0)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}