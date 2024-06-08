'use client'
import React, { useState } from 'react'
import "./config.css"
import General from './General/General'
import Display from './Display/Display'
const Config = ({params}) => {
  const [active, setActive] = useState('general')
  return (
    <div className='config'>
      <h2>Configuration</h2>
      <div className="tab-bar">
        <span 
        onClick={()=>setActive('general')}
        className={active=== 'general' ? 'active':''}>General</span>
        <span
        onClick={()=>setActive('display')}
        className={active=== 'display' ? 'active':''}
        >Display</span>
        <span
        onClick={()=>setActive('advanced')}
        className={active=== 'advanced' ? 'active':''}
        >Advanced</span>
      </div>
      {
        active === "general" ? <General params={params} /> : <Display params={params}/>
      }
    </div>
  )
}

export default Config
