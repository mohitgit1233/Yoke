import React from 'react'
import { useState,useEffect } from 'react';
import Accept from './Accept';
import Decline from './Decline';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import { useParams } from "react-router-dom";
import "./viewprofile.css"

const fetchTasks = async (request_id) => {
  let url = `/requests/${request_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("PARTICULAR REQ: ",data);
  return data;
};

const approve = async (students) => {
  let url = `/requests/${students._id}/approve`;
//   const bod1 = {
//     "adminId": `${adminId}`
// }

const bod1 = {
  "adminId": `633a0695b149556c00bfc720`
}

  const res = await fetch(url, {method: 'PATCH',
   body: JSON.stringify(bod1), 
      headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const decline = async (students) => {
  let url = `/requests/${students._id}/decline`;
  const bod1 = {
    "adminId": `633a0695b149556c00bfc720`
  }
  const res = await fetch(url, {method: 'PATCH', body: JSON.stringify(bod1),     headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const updateStudentNotes = async (students, newNote) => {
  let url = `/students/${students.requestedStudent._id}`;
  const bod1 = {
    "notes": "asdsadasdsaads asdkldjalks"
    }
  const res = await fetch(url, {method: 'PATCH',
   body: JSON.stringify(bod1),  
     headers: {
    'Content-Type': 'application/json'
  }, });
  const data = await res.json();

  console.log("IMPPPPPPPPPPPPP:",data);
  return data;
};

const Viewprofile = () => {
  const [students,setStudents] = useState([]);
  let params = useParams();

  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks(params.id);
      setStudents(tfs);
    };
    getTasks();
  }, []);

  return (
    <>
      <SideMenuAdmin/>
    <div className='box'>
      <h3>{students.requestedStudent && students.requestedStudent.name}</h3>

      <h4>student number: {students.requestedStudent && students.requestedStudent.studentNumber}</h4>
      {/* <h4>student id: {students.requestedStudent && students.requestedStudent._id}</h4> */}

      <h4>travel date: {students.requestedStudent && students.requestedStudent.flightDate}</h4>

      <h4>current license: {students.requestedStudent && students.requestedStudent.studentRequirements.licenseType}</h4>
      <h4>current program: {students.requestedStudent && students.requestedStudent.program}</h4>

      <h4>Hours flown: {students.requestedStudent && students.requestedStudent.studentRequirements.flownHours}</h4>

      <h4>License images will be shown here......</h4>

      <textarea name="" id="" cols="30" rows="10" value={students.requestedStudent && students.requestedStudent.notes}></textarea> <br />
      <button onClick={(e) => { updateStudentNotes(students, e.target.value)} }>Update Notes</button>


      <h4>Req Id: {params.id}</h4>
      {/* <div>
      <Accept/>
      <Decline/>
      </div> */}
      { (!students.isApproved) && <button onClick={(e) => { approve(students)} }>Approve</button> }
     { (!students.isRejected) && <button onClick={(e) => { decline(students)} }>Decline</button> }
    </div>
    </>

  )
}

export default Viewprofile