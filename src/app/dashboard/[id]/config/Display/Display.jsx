'use client'
import React, { useEffect, useState } from 'react'
import './Display.css'
import Switch from 'react-switch';
import Image from 'next/image';
import placeholder from "../../../../../../public/placeholder.png"
import { MdOutlineFileUpload } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Display = ({params}) => {
    const [primaryColor, setPrimaryColor] = useState('#')
    const [fontColor, setFontColor] = useState('#')
    const [fontSize, setFontSize] = useState('');
    const [chatHeight, setChatHeight] = useState('');
    const [iconSize, setIconSize] = useState('');
    const [iconPosition, setIconPosition] = useState('');
    const [distanceFromBottom, setDistanceFromBottom]= useState('')
    const [horizontalDistance, setHorizontalDistance]= useState('')
    const [showSources, setShowSources] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        const checkValues = async () => {
          try {
            const response = await fetch(`http://localhost:5001/api/checkvalues/${params.id}`);
            const jsonData = await response.json();
            setPrimaryColor(jsonData.primaryColor || '#');
            setFontColor(jsonData.fontColor || '#');
            setFontSize(jsonData.fontSize || '');
            setChatHeight(jsonData.chatHeight || '');
            setIconSize(jsonData.iconSize || '');
            setIconPosition(jsonData.iconPosition || '');
            setDistanceFromBottom(jsonData.distanceFromBottom || '');
            setHorizontalDistance(jsonData.horizontalDistance || '');
            setShowSources(jsonData.showSources !== undefined ? jsonData.showSources : false);
            // setImageUrl(jsonData.image || "");
       
          } catch (error) {
            console.error(error);
          }
        };
    
        checkValues();
        console.log(imageUrl)
      }, [params]);

    const submitDetails = async (e) => {
        e.preventDefault()
        const body = {
          project:params.id,
          primaryColor,
          fontColor,
          fontSize,
          chatHeight,
          iconSize,
          iconPosition,
          distanceFromBottom,
          horizontalDistance,
          showSources,
        };
    
        try {
          const response = await fetch('http://localhost:5001/api/chatbotconfig', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
            if (!response.ok) {
               return toast.error('error occured try later')
            }
          const jsonData = await response.json();
          console.log(jsonData);
          toast.success('details updated successfully')
        } catch (error) {
            toast.error('error occured try later')
          console.error(error);
        }
      };


      const imageInput=(e)=>{
        setSelectedFile(e.target.files[0])
        setDisable(!disable)
      }

  const uploadImage = async (e) => {
      e.preventDefault()
        if (!selectedFile) {
          console.error('No file selected!');
          toast.error('Please select a file to upload.');
          return;
        }   
        try {
          const formData = new FormData();
          formData.append('image', selectedFile);
          formData.append('id', params.id);
    
          const response = await fetch('http://localhost:5001/api/uploadImage', {
            method: 'POST',
            body: formData,
          });
    
          if (!response.ok) {
            console.error('Server responded with an error:', response.status);
           toast.error('Image upload failed. Please try again.');
            return;
          }    
          const jsonData = await response.json();
          console.log('Image URL:', jsonData.imageUrl);
          // setImageUrl(jsonData.imageUrl);
          // window.location.reload()
          toast.success('Image uploaded successfully!');
        } catch (error) {
          console.error('Image upload error:', error.message);
          toast.error('An error occurred during the image upload.');
        }
      };

    const toggleChange = () => {
        setShowSources(prvestate => !prvestate);
      };
  return (
    <div className='display'>
        <div className="top-half">
        <div className="two-inputs">
           <div className="general-inputs">
        <label htmlFor="chatbotName">Primary Color</label>
        <div className="input-color">
        <input
          type="text"
          id="chatbotName"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
        <div className="color-display" style={{background:primaryColor ? primaryColor : "#ffff"}}></div>
        </div>
        <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
      </div> 

       <div className="general-inputs">
        <label htmlFor="chatbotName">Font Color</label>
        <div className="input-color">
        <input
          type="text"
          id="chatbotName"
        value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
               <div className="color-display" style={{background:fontColor ? fontColor : "#ffff"}}></div>
        </div>
        <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
      </div>    
        </div>
        <div className="two-inputs">
        <div className="general-inputs">
          <label htmlFor="fontSize">Font Size (in px)</label>
          <input
            type="text"
            id="fontSize"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
          <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
        </div>

        <div className="general-inputs">
          <label htmlFor="chatHeight">Chat Height (in % of screen)</label>
          <input
            type="text"
            id="chatHeight"
            value={chatHeight}
            onChange={(e) => setChatHeight(e.target.value)}
          />
          <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
        </div>
      </div>

    <div className="toggle-area">
        <div className="text-source">
        <strong>Show Sources</strong>
        <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
        </div>
        <Switch
          onChange={toggleChange}
          checked={showSources === true}
          id="statusToggle"
          value={showSources}
        />

    </div>

    </div>

    

<div className="bottom-half">
      <div className="two-inputs">
  <div className="general-inputs">
    <label htmlFor="iconSize">Chat Icon Size</label>
    <select
      id="iconSize"
      value={iconSize}
      onChange={(e) => setIconSize(e.target.value)}
    >
      <option value="">Select Size</option>
      <option value="small (48x48px)">Small (48x48px)</option>
      <option value="medium (64x64px)">Medium (64x64px)</option>
      <option value="large (80x80px)">Large (80x80px)</option>
    </select>
    <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
  </div>

  <div className="general-inputs">
    <label htmlFor="iconPosition">Position on Screen</label>
    <select
      id="iconPosition"
      value={iconPosition}
      onChange={(e) => setIconPosition(e.target.value)}
    >
      <option value="">Select Position</option>
      <option value="top">Top</option>
      <option value="bottom">Bottom</option>
      <option value="left">Left</option>
      <option value="right">Right</option>
    </select>
    <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
  </div>
</div>


<div className="two-inputs">
        <div className="general-inputs">
          <label htmlFor="fontSize">Distance from Bottom (in px)</label>
          <input
            type="text"
            id="fontSize"
            value={distanceFromBottom}
            onChange={(e) => setDistanceFromBottom(e.target.value)}
          />
          <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
        </div>

        <div className="general-inputs">
          <label htmlFor="chatHeight">Horizontal Distance (in px)</label>
          <input
            type="text"
            id="chatHeight"
            value={horizontalDistance}
            onChange={(e) => setHorizontalDistance(e.target.value)}
          />
          <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
        </div>
      </div>
      <div className="img-upload">
      <strong>Bot Icon</strong>
        <div className="img-upload-area">
        {imageUrl ? (
        <Image src={`${imageUrl}`} height={80} width={80} alt='uploaded bot icon' />
      ) : (
        <Image src={placeholder} height={80} width={80} alt='bot icon' />
      )}
      <div className="btn-small">
      {/* <form ref={formRef} onSubmit={uploadImage}> */}
      <input
          type="file"
          accept="image/*"
          onChange={imageInput}
          id="upload-button"
      />
                        
      <button disabled={!disable} style={{background:!disable?"grey" : ""}}  onClick={uploadImage} >Upload Image <MdOutlineFileUpload /></button>
      {/* </form> */}
      <small>Recommended Size: 48x48px</small>
      </div>

        </div>
      </div>
      <button onClick={submitDetails}>Submit</button>
      {/* <ImageUpload/> */}
     </div>
     <ToastContainer 
        closeButton={false}
        position="top-center"/>
    </div>
  )
}

export default Display
