'use client'
import { useEffect, useState } from "react"
import UploadOptions from "./components/UploadOptions/UploadOptions"
import UploadFile from "./components/UploadFile/UploadFile"
import "./IndividualPage.css"
import Files from "./components/Files/Files"

const IndividualPage = ({params}) => {
    
    const [projectData, setProjectData] = useState([])
    const [updateState, setUploadeState] = useState(false)
    const BASE_URL = process.env.BASE_URL || "https://app.sheikhafatimahospital.com/api";


    const handleChange = () => {
      setUploadeState(!updateState);
    };

    const FileData = async ()=>{
        try {
            const response = await fetch(`${BASE_URL}/getProjectFiles/${params.id}`)
            const jsonData = await response.json()
            console.log(jsonData)
            setProjectData(jsonData)
      
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
            FileData()

    },[updateState])
    const handleAddFile = (newFile) => {
        setProjectData((prevData) => [...prevData, newFile]);
      };

  return (
    <div className="upload">
     <UploadOptions onChange={handleChange} params={params} handleAddFile={handleAddFile} />
     {
        projectData.length > 0 ? <Files onChange={handleChange} params={params} projectData={projectData} projectId={params.id} />:<UploadFile/> 
     }

    </div>
  )
}

export default IndividualPage
