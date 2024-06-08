'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import youtube from "../../../../../../public/youtube.png"
import stotify from "../../../../../../public/stotify.png"
import range from "../../../../../../public/range.png"
import "./UploadOptions.css"
import Popup from './Popup/Popup'

const uploadOptionsData = [
  {
    imgSrc: youtube,
    title: 'Upload', 
    title2: 'from YouTube',
    tag: "youtube"
  },
  {
    imgSrc: stotify,
    title: 'Upload', 
    title2: 'Spotify Podcast',
    tag: "spotify"

  },
  {
    imgSrc: range ,
    title: 'Upload', 
    title2: 'from RSS Feed',
    tag: "rss"


  }
]

const UploadOptions = ({params, handleAddFile}) => {

    const [openPopup, setOpenPopup] = useState(false)
    const [selectedTab, setSelectedTab] = useState([])

    const tab=(index)=>{
        setOpenPopup(prveState=> !prveState)
        setSelectedTab(uploadOptionsData[index])
        console.log(selectedTab)
    }
    const closePopup=()=>{
        setOpenPopup(false)
      }

  return (
    <div className='UploadOptions'>
      <h2>Upload Options</h2>
      <div className="upload-option-container">
      {uploadOptionsData.map((option, index) => (
        <div 
        onClick={()=>tab(index)}
        key={index} 
        className="upload-option">
          <Image src={option.imgSrc} alt={option.title} width={50} height={50} />
          <div className="title-area">
          <span>{option.title}</span>
          <span>{option.title2}</span>
          </div>
        </div>

      ))}
              </div>
              {
      openPopup && <Popup handleAddFile={handleAddFile} selectedTab={selectedTab} closePopup={closePopup} params={params} />
    }
    </div>
  )
}

export default UploadOptions
