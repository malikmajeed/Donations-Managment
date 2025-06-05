import { useState } from 'react';
import styles from './index.module.css';
import {FaTrash} from 'react-icons/fa'
import axios from 'axios';


export default function DeleteStudent({studentID, isClicked}){
    

    function deleteAction(e){
        
        const token=localStorage.getItem(token);

        const response = axios.delete(`http://localhost:3000/student/deleteStudent/${studentID}`,token,
           { headers:{
                'Content-Type':'text',
                'Authorization': `Beared ${token}`
            }}
        );

        if(!response.ok){
            return alert('Error occured while deleting student')
        }

        return alert('Student Deleted Successfully!')
        
    }


    return(
        <>
         {
         isClicked?
        <div className={styles.deleteContainer}>
           {/* When Button is clicked - popUp */}
          
           
           <span>Are you sure to delete this student?</span>
           <div>
               <button onClick={(e)=>{
                   setIsClicked(!isClicked)
               }}>cancel</button>

               <button 
               onClick={deleteAction}>
                   <FaTrash />
                  <span>Yes, Delete</span>
               </button>
           </div>
          
       </div>:
       <></>

        
        }
           
        </>
    );
}