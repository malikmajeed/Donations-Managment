import { useEffect, useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';
// import Students from '../../../../Backend/Models/students.model';
// import { getUser } from '../../../../Backend/Controllers/users.controller';



export default function UserDashboard(){

    const[donationsList, setDonationsList]=useState();
    const[user, setUser]=useState({});

    const token= localStorage.getItem('token');



    useEffect(()=>{
        fetchDonations();
    },[])

    // getting users own details
    // const getStudent=(studentId)=>{
    //     const userResponse = axios.get(`http://localhost:3000/user/${studentId}`,
    //         {headers:{
    //             'Content-Type':'any',
    //             'Authorization':`Bearer ${token}`
    //         }}
    //     )
    //     const firstName = userResponse.data.firstName;
    //      const lastName = userResponse.data.lastName;
    //      return `${firstName} ${lastName}`;
    //     }


    // const token= localStorage.getItem('token'); //redecleared variable


    // getting users own details
    // const getStudent=(studentId)=>{
    //     const userResponse = axios.get(`http://localhost:3000/user/${studentId}`,
    //         {headers:{
    //             'Content-Type':'any',
    //             'Authorization':`Bearer ${token}`
    //         }}
    //     )

    //     const firstName = userResponse.data.firstName;
    //     const lastName = userResponse.data.lastName;

        // const user = {firstName, lastName};
    //     return `${firstName} ${lastName}`;
    
    // }
    
const fetchDonations= async()=>{
    try{
        console.log('fetching data')
        const response = await axios.get('http://localhost:3000/donation/',
            {headers:{
           
                'Authorization':`Bearer ${token}`
            }}
        )
        
        console.log(`Response received:${response.data.data}`)
        
       
        setDonationsList(response.data);
        console.log(donationsList);
       
    
    

    }catch(error){
        console.log(error.message)
    }

}
    //getting donations related to the user
    

console.log(`Donation Array: ${donationsList}`)

    return(
        <>
        {/* Outer Section */}
        <div className={styles.dashboardContainer}>
            {/* Inner Left - Verticle Section */}
            <div className={styles.profileSection}>
                <img src={ user.profileURL} alt="" />
                <div className={styles.userName}>
                 <span>  {user.gender=='male'?'Mr.': 'Ms. '}</span>
                   <span>{`${user.fName} ${user.lName}`}</span>
                </div>
                <div className={styles.privateInfo}>
                    <p>{user.email}</p>
                    <p className={styles.phoneNumber}>+{user.phone}`</p>
                </div>
            </div>

            {/* Inner Right - Content Section */}

            <div className={styles.contentSection}>
                <h2>Dashboard</h2>
                <div className={styles.donationsTable}>
                    <h3>Sponsorship History</h3>
                    {donationsList? 
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
                           {
                           donationsList.map((Donation, index)=>(
                            <tr key={Donation._id} className={styles.tableRow}>
                                <td className={styles.srNoColumn}>{index+1 || 'NA'}</td>
                                <td><span>{`${Donation.donationTo.firstName} ${Donation.donationTo.lastName}` || 'NA'}</span></td>
                                <td><span>{Donation.status || 'NA'}</span></td>
                                <td><span>${Donation.Amount ||  'NA'}</span></td>
                            </tr>

                           ))
                            
                            }
                        </tbody>

                    </table>
                    :<div>Nothing here</div>}
                </div>
                <div className={styles.numberOfStudents}>
                    <p>Number Of Donations</p>
                    <p>{donationsList.length}</p>
                </div>
                <div className={styles.numberOfDonations}>
                <p>Number Of Donations</p>
                <p>{numberOfStudents}</p>
                </div>
                <div className={styles.amountOfDonations}>
                <p>Amount Donated</p>
                <p>{amountDonated}</p>
                </div>

            </div>
        </div>
        
        </>
    );
}