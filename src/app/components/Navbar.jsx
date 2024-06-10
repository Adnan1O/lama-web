'use client';
import Image from 'next/image'
import { LuSettings } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import logo from "../../../public/logo.png"
import "./Navbar.css"
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()

  // const [showLoginPopup, setShowLoginPopup] = useState(true)
  // const [userLoggedIn, setUserLoggedIn] = useState(false)

  // useEffect(()=>{
  //   const user = localStorage.getItem('user')
  //   setUserLoggedIn(!!user)
  // },[])



  // const closePopup=()=>{
  //  setShowLoginPopup(true)
  // }



  return (
    <div className='navbar' >
        <div className="col-one">
          <Link href='/'>
        <Image className='logo' src={logo} width={200} height={200} alt='LAMA' />
        </Link>
      <div className="icons-container">
      <LuSettings />
      <FaRegBell />
      {/* {
        !userLoggedIn &&  <Image onClick={()=>setShowLoginPopup(false)} src={login} height={25} width={35}/>
      }      */}
      
         
      </div>
         </div>
        <Link href={pathname === '/dashboard' ? '/' : '/dashboard'} >
        <div className="back-home-btn">
        <MdOutlineHome />
           <span>{pathname ==='/dashboard' ? 'Back to Home' : 'Dashboard'}</span>
        </div>
        </Link>
        {/* {
      !showLoginPopup && <Login closePopup={closePopup}/>
    } */}
    </div>
  )
}

export default Navbar
