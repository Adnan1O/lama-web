'use client'
import { MdOutlineHome } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import "./Topbar.css"
import { FaRegBell } from 'react-icons/fa'
const Topbar = () => {
    const pathname = usePathname()
    const firstSegment = pathname.split('/')[3] || 'upload'
    
  return (
    <div className='topbar'>
        <div className="topbar-one">
      <MdOutlineHome />
       <p>/ Sample Project /</p>
       <h3>{firstSegment}</h3> 
       </div>
       <div className="topbar-two">
       <FaRegBell />
       </div>
    </div>
  )
}

export default Topbar
