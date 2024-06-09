'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import profile from "../../../../../public/profile.png"
import "./setting.css"
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Setting = () => {

  const [emailId, setEmailId] = useState('')
  const [userName, setUserName] = useState('')
  const [disable, setDisable] = useState(true)
  const router = useRouter()
  const BASE_URL = process.env.BASE_URL || "https://app.sheikhafatimahospital.com/api";

  const getUserDetails=async()=>{
    try {
      const user = localStorage.getItem('user')
      if (!user) {
        router.push('/', { scroll: false })
      }
      const response = await fetch(`${BASE_URL}/getUserName/${user}`)
      if (!response.ok) {
        setUserName('')
      }
      const jsonData = await response.json()
      console.log(jsonData)
      setUserName(jsonData.userName)
      setEmailId(user)
    } catch (error) {
      console.error(error.message);
    }
  }

 const updateUserName =async()=>{
  try {
    const user = localStorage.getItem('user')
     const response = await fetch(`${BASE_URL}/updateUserName`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email: user, userName: userName})
     })
     const jsonData = await response.json()
     setUserName(jsonData)
     toast.success('file deleted successfully')
  } catch (error) {
    toast.error('error occured please try again later');
    console.error(error.message);
  }
 }
const userNameChange =(e)=>{
  setDisable(false)
  setUserName(e.target.value)
}


  useEffect(()=>{
    getUserDetails()
  },[])

  return (
    <div className='setting'>
      <h2>Account settings</h2>
      <div className="profile-area">
        <Image src={profile} height={80} width={100} />
        <div className="input-area">
          <label htmlFor="name" >User Name</label>
          <input 
          value={userName}
          onChange={userNameChange}
          type="text" placeholder='userName'  />
        </div>
        <div className="input-area">
          <label htmlFor="email">Email</label>
          <input className='readOnly' readOnly value={emailId} type="email" name='email' id='email' placeholder='emaiId'  />
        </div>
        {
          !disable &&
        <button onClick={updateUserName}>Submit</button>       

        }
      </div>
      <div className="subscription">
      <h2>Subscriptions</h2>
      <div className="plan"><p>You are currently on the Ques AI Basic Plan!</p>
      <button>Upgrade</button>
      </div>
      <span>cancel subscription</span>
      </div>
      <ToastContainer 
        closeButton={false}
        position="top-center"/>
    </div>
  )
}

export default Setting
