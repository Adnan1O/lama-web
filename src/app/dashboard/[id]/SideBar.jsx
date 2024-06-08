'use client'
import Image from 'next/image'
import logo from "@public/logo.png"
import "./Sidebar.css"
import Link from 'next/link'
import { LuSettings } from "react-icons/lu";

const SideBar = ({params}) => {

  return (
    <div className='sidebar'>
     <div className="header-area">
      <Link href='/' >
     <Image src={logo} width={170} height={170} alt='LAMA' />
     </Link>
     <small>Podcast Upload Flow</small>
     </div>
     <ul>
     <Link href={`/dashboard/${params.id}/`}>
        <li><span>1</span>Projects</li>
        </Link>
        <Link href={`/dashboard/${params.id}/config`}>
        <li><span>2</span>Widget Configurations</li>
        </Link>
        <li><span>3</span>Deployment</li>
        <li><span>4</span>Pricing</li>
        <Link href={`/dashboard/${params.id}/setting`}>
        <li className='setting'><span><LuSettings/></span>Settings</li>
        </Link>
     </ul>
    </div>
  )
}

export default SideBar
