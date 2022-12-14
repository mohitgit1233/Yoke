import React from 'react'
import { useState,useEffect, useContext } from 'react';
import StudentUpload from './studentUpload';
import { Link } from "react-router-dom";
import SideMenu from '../Navbar/SideMenu';
import {UserContext} from '../../Contexts/UserContext'
import { useNavigate } from "react-router-dom";
import  abcd  from "../images/abcd.png"
import  abcd2  from "../images/abcd2.png"

// import './studentAccountStatus.css';
// import '../../App.css';


//Fetch Data using API

const fetchTasks = async (loggedInUser) => {
  let url = `/api/students/${loggedInUser.id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  console.log("fetch works")
  return data;
};
const StudentAccountStatus = () => {
  const {pageTitle, setPageTitle} = useContext(UserContext)
  const [images, setImages]= useState([])
  const [imagesId, setImagesId]= useState(0)
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
}

useEffect(() => {
  setPageTitle("Account Status")
  // let isLoggedIn  = true
  
  // if (!isLoggedIn){
  //   handleClick();
  // }
  if(!JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn){
    handleClick();
    }

}, []
);

  const {loggedInUser, loginCredentials} = useContext(UserContext)

            const [students,setStudents] = useState([]);
            useEffect(() => {
                const getTasks = async () => {
                const tfs = await fetchTasks(loginCredentials.loggedInUser);
                setStudents(tfs);
                setImages([
                  {
                    original: `${tfs.requestedStudent.studentRequirements.license}`,
                    thumbnail: `${tfs.requestedStudent.studentRequirements.license}`,
                  },
                  {
                    original: `${tfs.requestedStudent.studentRequirements.medicalLicense}`,
                    thumbnail: `${tfs.requestedStudent.studentRequirements.medicalLicense}`,
                  },
                  {
                    original: `${tfs.requestedStudent.studentRequirements.radioLicense}`,
                    thumbnail: `${tfs.requestedStudent.studentRequirements.radioLicense}`,
                  },
                  {
                    original: `${tfs.requestedStudent.studentRequirements.englishProficiency}`,
                    thumbnail: `${tfs.requestedStudent.studentRequirements.englishProficiency}`,
                  },
                ]);
                };
                getTasks();
            }, []);
            // const isEmpty = Object.keys(students).length === 0;
            // console.log(isEmpty);
  return (
    <div>
       <div className='fullpage'>
       <SideMenu/>
      <div className='division'>
      
      <div className='box studentProfile'>
      <h3 className=' fontFira-bold studentAccountName'>{students.name}</h3>
     
        <div className='studentimage fullProfile'>
          <div className="profileWrapper">
            <img
            className='studentImg' src={students.photo}   alt='profile of student' />
          </div>
          
          <div className='studentviews'>
            
            <div>
              <h4 className='fontFira-bold'>Student ID:&nbsp;</h4>
              <span>{students.studentNumber?  students.studentNumber : "Not found" }</span>
            </div>

            {students.length===0? console.log("Nothing") : 
            <div>
                <h4 className='fontFira-bold'>Account Balance: &nbsp;</h4>
                
                <span>${students.studentRequirements &&  ( students.studentRequirements.balance?  students.studentRequirements.balance : "Not found" )  }
                </span> 
            </div>
            }
            
            {students.length===0? console.log("Nothing") : 
            <div>
              <h4 className='fontFira-bold'>Hours Flown:&nbsp;</h4>
              <span>{students.studentRequirements && ( students.studentRequirements.flownHours?  students.studentRequirements.flownHours : "Not found" ) }  </span>
            </div>
            }

            <div>
              <h4 className='fontFira-bold'>Course:&nbsp;</h4>
              <span>{students.program?  students.program : "Not found" }</span>
            </div>  
      
            
          
              {/* {students.length===0 ? console.log("Nothing") : <h2>Hours Flown : {students.requests[0].isApproved? students.requests[0].isApproved : "No upcoming flights"}</h2>  } */}
          </div>
        </div>
      {students.length===0? console.log("Nothing") : <StudentUpload starry = {students} />  }
      </div>
      </div>
      </div>
      </div>
  )
}
export default StudentAccountStatus;