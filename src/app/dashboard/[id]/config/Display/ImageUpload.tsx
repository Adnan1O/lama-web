'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { MdOutlineFileUpload } from 'react-icons/md';
import placeholder from "../../../../../../public/placeholder.png"

const ImageUpload = ({params}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const uploadImage = async (event: FormEvent<HTMLFormElement>) => {
       
        event.preventDefault();
        const form = event.target.closest('form');
        if (!form) {
            console.error('Form element not found!');
            return;
        }
        //  const formData = new FormData(e.currentTarget);
        const formData = new FormData(form);
        formData.append('image', selectedFile);    
        try {
            const response = await fetch('http://localhost:5001/api/uploadImage', {
                method: 'POST',
                body: formData,
            });    
            if (!response.ok) {
                console.log("error")
            }    
            const jsonData = await response.json();
            console.log('Image URL:', jsonData.imageUrl);
            setImageUrl(jsonData.imageUrl);
        } catch (error) {
            console.error('Image upload error:', error.message);
            throw error;
        }
    };
    
  return (
    <div className="img-upload">
      <strong>Bot Icon</strong>
        <div className="img-upload-area">
            <Image src={imageUrl ? imageUrl : placeholder} height={80} width={80} alt='bot icon' />
      <div className="btn-small">
      <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            id="upload-button"
                        />
      <button onClick={uploadImage} >Upload Image <MdOutlineFileUpload /></button>
      <small>Recommended Size: 48x48px</small>
      </div>

        </div>
      </div>
  )
}

export default ImageUpload
