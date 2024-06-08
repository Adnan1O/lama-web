import React from 'react'
import cloud_upload from "../../../../../../public/cloud_upload.png"

import Image from 'next/image'
import "./UploadFile.css"

const UploadFile = () => {
  return (
    <div className='UploadFile'>
     <p>Or</p>
     <div className="file-box">
        <Image src={cloud_upload} height={90} width={90} />
        <div className="box-txt">
            <p>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
            <small>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </small>
            <button>Select File</button>
        </div>
     </div>
    </div>
  )
}

export default UploadFile
