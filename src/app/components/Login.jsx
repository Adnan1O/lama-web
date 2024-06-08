import React, { useState } from 'react'
import "./Popup.css"
const Login = ({closePopup}) => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const EmailInput=(e)=>{
    setError('')
    setEmail(e.target.value)
  }


  const UserLogin =async (e)=>{
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/login",{
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
         closePopup()
      }else{
        const jsonData = await response.json()
        setError(jsonData)
      }
    } catch (error) {
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
        <button onClick={UserLogin} className='create'>Login</button>
      </div>
        </div>
    </div>
  )
}

export default Login