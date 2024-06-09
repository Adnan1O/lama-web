'use client'
import React, { useState } from 'react'
 import "../../../../../components/Popup.css"
import Image from 'next/image'


const Popup = ({handleAddFile,selectedTab,closePopup, params,onChange}) => {
const [fileName, setFileName] = useState('')
const [description, setDescription] = useState('')
const [error, setError] = useState('')
const BASE_URL = process.env.BASE_URL || "https://app.sheikhafatimahospital.com/api";


const FileNameInput=(e)=>{
  setError('')
  setFileName(e.target.value)
}
const DescriptionInput=(e)=>{
  setError('')
  setDescription(e.target.value)
}


const UploadData =async (e)=>{
  e.preventDefault();
  try {
    const user = localStorage.getItem('user')
    const response = await fetch(`${BASE_URL}/UploadData`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({projectId:params.id, tabName:selectedTab.tag ,fileName,description,user, })
    })

    if (response.ok) {
      // router.push('/dashboard')
      onChange()
      const jsonData = await response.json()
      console.log(jsonData)     
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
          <div className="img-title">
          <Image src={selectedTab.imgSrc} height={50} width={50} alt='logo' />
      <h3>{selectedTab.title} {selectedTab.title2}</h3>
      </div>
      <div className="input-container">
      <label htmlFor="email">Name</label>
      <input
      onChange={FileNameInput}
      type="" id="" name="" placeholder='Type here' />
      </div>
      <div className="input-container">
      <label htmlFor="email">description</label>
      <input
      onChange={DescriptionInput}
      type="" id="" name="" placeholder='Enter description' />
      <span>{error &&(error)}</span>
      </div>
      <div className="btn-area">        
        <button
        onClick={UploadData}
        className='upload-btn'>upload</button>
      </div>
        </div>
    </div>
  )
}

export default Popup
