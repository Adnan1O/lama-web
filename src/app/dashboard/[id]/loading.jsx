import Image from "next/image"
import logo from "../../../../public/logo.png"
export default function Loading() {

    return (
      <div className="">
      <Image style={{alignSelf:"center"}} src={logo} height={30} width={30} />
    </div>
    )
  }