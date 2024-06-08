'use client'
import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import Image from 'next/image'
import plusicon from "../../../public/plusicon.svg"
import Project from './project'
import Popup from '../components/Popup'



const Dashboard = () => {
    
    const [projects, setProjects] = useState([])
    const [openPopup, setOpenPopup] = useState(false)

    const tab=()=>{
      setOpenPopup(prveState=> !prveState)

  }

  const closePopup=()=>{
      setOpenPopup(false)
    }

    const getProjects = async()=>{
        console.log("calling the api")
        const user = localStorage.getItem('user')
        const response = await fetch(`http://localhost:5001/api/getProject?user=${user}`)
        const jsonData = await response.json();
        setProjects(jsonData)
        console.log(jsonData)
    }

    useEffect(()=>{
        getProjects()
    },[])

  return (
    <div className='dashboard'>
        <div className="heading-area">
      <h2>Project</h2>
      <button onClick={tab} className='createBtn'><Image src={plusicon} height={30} width={30}/>Create New Project</button> 
      </div>
      <div className="projects-container">
      {projects.length > 0 ? (
          projects.map((pro, i) => (
            <Project key={i} pro={pro} index={i} />
          ))
        ) : (
          <p>No projects found.</p>
        )}
        
      </div>
      {
      openPopup && <Popup closePopup={closePopup}  />
    }
    </div>
  )
}

export default Dashboard
