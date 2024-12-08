import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import {useRouter} from "next/navigation"
const GetEstimate = () => {
  const router = useRouter()
  return (
    <div className="bg-gradient-to-r from-[#470A68] to-[#8D14CE] rounded-xl lg:rounded-2xl flex justify-between items-center p-4 px-6 lg:px-8 lg:py-6 w-[90%]  max-w-5xl mx-auto">

    {/* Text Section */}
    <div>
      <h3 className="text-white font-filson text-lg md:text-xl lg:text-2xl font-bold  lg:mb-1">Get an estimate</h3>
      <p className="text-purple-200 font-filson text-[8px] md:text-xs lg:text-sm">
        Enter your pickup & drop locations to check prices for delivery
      </p>
    </div>

    {/* Button Section */}
    <button onClick={() => {router.push("/")}} className="flex lg:hidden bg-[#F3E545] text-black  gap-3 items-center font-semibold py-1.5  px-4 rounded-sm   text-[8px]  hover:bg-yellow-300 transition-all">
      See prices {" "} <FaLongArrowAltRight className="hidden xl:block" size={15}/>
    </button>

    <button onClick={() => {router.push("/estimate")}} className="hidden lg:flex bg-[#F3E545] text-black  gap-3 items-center font-semibold  lg:py-3  xl:px-36  lg:rounded-lg    lg:text-sm hover:bg-yellow-300 transition-all">
      See prices {" "} <FaLongArrowAltRight className="hidden xl:block" size={15}/>
    </button>
  </div>
  )
}

export default GetEstimate