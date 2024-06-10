'use client';
import React, { useEffect, useState } from 'react'
import "./home.css"
import Image from 'next/image'
import home from "../../../public/home.png"
import plusicon from "../../../public/plusicon.svg"
import Popup from '../components/Popup'
import Login from '../components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight } from 'react-icons/fa';


const HomePage = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(true)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [sharedState, setSharedState] = useState(false);


  const handleChange = () => {
    setSharedState(true);
  };
  const closePopup=()=>{
    setOpenPopup(false)
    setShowLoginPopup(true)
  }

  useEffect(()=>{
    const user = localStorage.getItem('user')
    setShowLoginPopup(!!user);
    setUserLoggedIn(!!user)
  },[userLoggedIn,sharedState])

  const createProjectBtn=()=>{
      
    const user = localStorage.getItem('user')
    if (!user) {
      console.log('error')
      toast.error('Please log in to create a project.');
      // setShowLoginPopup(prveState=> !prveState)
    } else {
         setOpenPopup(prveState=> !prveState)
    }
 
  }

  return (
    <div className='homepage'>
      <h2>Create a New Project</h2>
      <Image className='banner' src={home} height={400} width={400} alt='banner' />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
        <button
         onClick={createProjectBtn} ><Image src={plusicon} height={30} width={30}/>Create New Project</button>
    {
      !showLoginPopup && <Login  onChange={handleChange} closePopup={closePopup}/>
    }
    {
      openPopup && <Popup closePopup={closePopup} />
    }


      {
        !userLoggedIn && <button 
        className='login-btn'
         onClick={()=>setShowLoginPopup(prveState=> !prveState)}>
          Login<FaArrowRight /> </button>
      }     
    <ToastContainer 
        closeButton={false}
        position="top-center"/>
    
    </div>
  )
}

export default HomePage
