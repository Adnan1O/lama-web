import React, { useEffect, useState } from 'react';
import './General.css';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Oval } from "react-loader-spinner";

const General = ({params}) => {
  const [chatbotName, setChatbotName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('');
  const [loading, setLoading] = useState(false)
  const BASE_URL = process.env.BASE_URL || "https://app.sheikhafatimahospital.com/api";

  const checkValues=async()=>{
    try {
        const response = await fetch(`${BASE_URL}/checkvalues/${params.id}`)
        const jsonData = await response.json()
        console.log(jsonData)
        setChatbotName(jsonData.name? jsonData.name : "")
        setWelcomeMessage(jsonData.welcomeMessage ? jsonData.welcomeMessage : "")
        setInputPlaceholder(jsonData.inputPlaceholder ? jsonData.inputPlaceholder : "")
    } catch (error) {
        console.error(error);
    }
  }
    useEffect(()=>{
        checkValues()
    },[])

  const submitDetails = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = {
        project:params.id,
        name: chatbotName,
        welcomeMessage,
        inputPlaceholder,
      };
      const response = await fetch(`${BASE_URL}/chatbotconfig`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
    setLoading(false)
        return toast.error('error occured try later')
     }
    setLoading(false)
      const jsonData = await response.json();
      console.log(jsonData);
      toast.success('details updated successfully')
    } catch (error) {
    setLoading(false)
    toast.error('error occured try later')
      console.error(error);
    }
  };

  return (
    <div className="general">
      <div className="general-inputs">
        <label htmlFor="chatbotName">Chatbot Name</label>
        <input
          type="text"
          id="chatbotName"
          value={chatbotName}
          onChange={(e) => setChatbotName(e.target.value)}
        />
        <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
      </div>
      <div className="general-inputs">
        <label htmlFor="welcomeMessage">Welcome Message</label>
        <input
          type="text"
          id="welcomeMessage"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
        />
        <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
      </div>
      <div className="general-inputs">
        <label htmlFor="inputPlaceholder">Input Placeholder</label>
        <input
          type="text"
          id="inputPlaceholder"
          value={inputPlaceholder}
          onChange={(e) => setInputPlaceholder(e.target.value)}
        />
        <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
      </div>
      <button onClick={submitDetails}>{
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
            "Submit"
            )
          }</button>
      <ToastContainer 
        closeButton={false}
        position="top-center"/>
    </div>
  );
};

export default General;
