import React, { useEffect, useState } from 'react';
import './General.css';

const General = ({params}) => {
  const [chatbotName, setChatbotName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('');

  const checkValues=async()=>{
    try {
        const response = await fetch(`http://localhost:5001/api/checkvalues/${params.id}`)
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
    try {
      const body = {
        project:params.id,
        name: chatbotName,
        welcomeMessage,
        inputPlaceholder,
      };
console.log(body)
      const response = await fetch('http://localhost:5001/api/chatbotconfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
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
      <button onClick={submitDetails}>Submit</button>
    </div>
  );
};

export default General;
