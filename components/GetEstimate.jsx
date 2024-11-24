import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import {useRouter} from "next/navigation"
const GetEstimate = () => {
  const router = useRouter()
  return (
    <div className="bg-gradient-to-r from-[#470A68] to-[#8D14CE] rounded-xl lg:rounded-2xl flex justify-between items-center p-4 lg:px-8 lg:py-6 w-[90%]  max-w-5xl mx-auto">

    {/* Text Section */}
    <div>
      <h3 className="text-white text-base md:text-xl lg:text-2xl font-bold mb-1">Get an estimate</h3>
      <p className="text-purple-200 text-[8px] md:text-xs lg:text-sm">
        Enter your pickup & drop locations to check prices for delivery
      </p>
    </div>

    {/* Button Section */}
    <button onClick={() => {router.push("/")}} className="bg-[#F3E545] text-black flex gap-3 items-center font-semibold py-1.5 lg:py-3 px-4 xl:px-48 rounded-sm lg:rounded-lg  text-[8px] md:text-xs lg:text-sm hover:bg-yellow-300 transition-all">
      See prices {" "} <FaLongArrowAltRight className="hidden xl:block" size={15}/>
    </button>
  </div>
  )
}

export default GetEstimate