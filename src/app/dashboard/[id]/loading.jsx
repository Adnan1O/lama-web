import Image from "next/image"
import logo from "../../../../public/logo.png"
export default function Loading() {

    return (
      <div className="" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <Image style={{alignSelf:"center"}} src={logo} height={80} width={80} />
    </div>
    )
  }