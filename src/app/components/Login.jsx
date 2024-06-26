'use client'
import React, { useEffect, useState } from 'react'
import "./Popup.css"
import { Oval } from "react-loader-spinner";

const Login = ({closePopup, onChange}) => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const BASE_URL = process.env.BASE_URL || "https://app.sheikhafatimahospital.com/api";
  const EmailInput=(e)=>{
    setError('')
    setEmail(e.target.value)
  }

  useEffect(()=>{
      console.log(BASE_URL)
  },[])

  const UserLogin =async (e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`https://app.sheikhafatimahospital.com/api/login`,{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({email})
      })
      // if (!response.ok) {
      //   const jsonData = await response.json()
      //   setError(jsonData)
      //   console.log(jsonData)
      // } 
  
      if (response.ok) {
        const jsonData = await response.json()
         localStorage.setItem('user', jsonData)
         onChange()
         closePopup()
      }else{
        const jsonData = await response.json()
        setError(jsonData)
        setLoading(false)
      }
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
      <h3>Login In</h3>
      <div className="input-container">
      <label htmlFor="email">Enter Your Email:</label>
      <input 
      onChange={EmailInput}
      type="email" id="email" name="email" placeholder='example@gmail.com' />
      <span>{error && (error)}</span>
      </div>
      <div className="btn-area">
        <button onClick={closePopup} className='cancel'>Cancel</button>
        <button onClick={UserLogin} className='create'>
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
            " Login"
            )
          }
         
          
          </button>
      </div>
        </div>
    </div>
  )
}

export default Login
