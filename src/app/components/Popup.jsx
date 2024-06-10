'use client'
import React, { useState } from 'react'
import "./Popup.css"
import { useRouter } from 'next/navigation'
import { Oval } from "react-loader-spinner";

const Popup = ({closePopup}) => {
const [title, setTitle] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
const router = useRouter()
const BASE_URL = process.env.BASE_URL || "https://app.sheikhafatimahospital.com/api";


const TitleInput=(e)=>{
  setError('')
  setTitle(e.target.value)
}


const CreateProject =async (e)=>{
  e.preventDefault();
  setLoading(true)
  try {
    const user = localStorage.getItem('user')
    const response = await fetch(`${BASE_URL}/createproject`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({user, title})
    })

    if (response.ok) {
      router.push('/dashboard')
      
      const jsonData = await response.json()
    

    }else{
      const jsonData = await response.json()
      setError(jsonData)
    }
    // setLoading(false)
  } catch (error) {
    setLoading(false)
    setError(jsonData)
    console.error(error.message);
  }
}
  return (
    <div className='popup-page'>
         <div className="overlay" onClick={closePopup}></div>
        <div className="popup-container">
      <h3>Create Project</h3>
      <div className="input-container">
      <label htmlFor="email">Enter Project Name:</label>
      <input
      onChange={TitleInput}
      type="" id="" name="" placeholder='Type here' />
      <span>{error &&(error)}</span>
      </div>
      <div className="btn-area">
        <button onClick={closePopup} className='cancel'>Cancel</button>
        <button
        onClick={CreateProject}
        className='create'>
          {
            loading ? (
              <Oval
              visible={true}
              height="20"
              width="50"
              color="#ffffff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            ):(
              'Create'
            )
          }
         
      
          
          </button>
      </div>
        </div>
    </div>
  )
}

export default Popup
