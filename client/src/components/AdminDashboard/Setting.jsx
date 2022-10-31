import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext'; 
import SideMenuAdmin from '../Navbar/SideMenuAdmin';

const fetchTasks = async (admin_id) => {
  let url = `/admins/${admin_id}`;
  const res = await fetch(url);

  const data = await res.json();
  console.log("zdata",data)
  return data;
};

const Setting = () => {
 
        const [admin,setAdmin] = useState([]);
        const {loggedInUser, loginCredentials} = useContext(UserContext);
        console.log(loginCredentials.loggedInUser);

        useEffect(() => {
            
            const getTasks = async () => {
            const tfs = await fetchTasks(loginCredentials.loggedInUser.id);
            setAdmin(tfs);
            };
        
            getTasks();

        }, []);
  return (
    <>
    <div className='fullpage'>
      <SideMenuAdmin/>
      <div className='division'>
     <div className="admin-settings">
      <h2>Admin Info</h2>
      { <><h3>{admin.email}</h3>
      <h4>{admin.password}</h4></> }
   <div>
    <button className="dBlueBtn">Forgot Password</button>
   </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Setting