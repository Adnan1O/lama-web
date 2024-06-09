'use client'
import React, { useEffect, useState } from 'react'
import "./trans.css"
import { MdOutlineModeEdit } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transcript = ({params}) => {
    const router = useRouter()
    const [script, setScript]= useState('')
    const [edit, setEdit] = useState(false)
  const BASE_URL = process.env.BASE_URL || "https://app.sheikhafatimahospital.com/api";


    useEffect(()=>{
        const GetTranscript=async()=>{           
        try {
            const { transcript: projectId, id: fileId } = params;
            const response = await fetch(`${BASE_URL}/GetTranscript/${projectId}/${fileId}`)
            const jsonData = await response.json()
            setScript(jsonData.description)
            console.log(jsonData)
        } catch (error) {
            console.error(error.message);
        }
    }
    GetTranscript();
    },[])

   const editTrans = async()=>{
        try {
            const { transcript: projectId, id: fileId } = params;
            const response = await fetch(`${BASE_URL}/updateScript`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify({projectId,fileId,script})
            })
            console.log(response)
            if (!response.ok) {             
               return toast.error("error occured")
               }   
           
        toast.success("updated successfully")
        setTimeout(() => {
            router.push(`/dashboard/${params.id}`, { scroll: false });
        }, 3000);
        } catch (error) {
            console.error(error.message);
            toast.error("error occured")
        }
    }

const discard =()=>{
    router.push(`/dashboard/${params.id}`, { scroll: false });
}

  return (
    <div className='transcript'>
   
    <div className="trans-header">
    <h2>Edit Transcript</h2>
    <div className="saveDiscard">
        <button onClick={discard} className='discard'>Discard</button>
        <button 
        onClick={editTrans}
        disabled={!edit}
        style={{ backgroundColor:!edit ? "grey" : '' }}
         className='saveandexit'>Save & Exit</button>
        </div>
    </div>
    <div className="transcript-area">
        <button
         className={edit ? 'edit-btn-active' : ""}
          onClick={()=>setEdit(!edit)}>
            <MdOutlineModeEdit />{edit? "Editing" :"EditMode"}</button>
    <div className="trans">
    <input onChange={(e)=>setScript(e.target.value)} type="text" value={script} readOnly={!edit} />
        {/* <p>{script ? script.description : ""}</p> */}
    </div>
    </div>
    <ToastContainer 
        closeButton={false}
        position="top-center"/>
    </div>
  )
}

export default Transcript
