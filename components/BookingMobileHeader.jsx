import React from 'react'
import Header2 from './Header2'
import Image from 'next/image'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { dropLocationState, pickupLocationState } from '@/recoil/store'
import { useRecoilValue } from 'recoil'

const BookingMobileHeader = () => {
    const pickupLocation = useRecoilValue(pickupLocationState);
  const dropLocation = useRecoilValue(dropLocationState);
  return (
    <div className='block lg:hidden'>
  <Header2 />
        <div className="h-[300px] md:h-[500px] w-screen gap-4 pb-6  rounded-t-none  rounded-b-3xl  flex flex-col  items-center  justify-evenly  bg-[linear-gradient(270deg,#9E3CE1_0%,#56217B_100%)] mb-10  ">
          <Image
            src={"/images/mapSmall.png"}
            width={380}
            height={120}
            alt="Logo"
            className=" w-[90%]"
          />
          <div className="flex gap-2 w-full px-10">
            <div className="flex flex-col gap-4 w-[15%] md:w-[8%]">
              <div className="bg-white text-black text-sm rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                <ArrowUp size={30} />
              </div>
              <hr className="border-white border-2 border-dashed trasnform rotate-90 w-16 relative m-0 right-3 z-0" />
              <div className="bg-white text-black text-sm rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                <ArrowDown size={30} />
              </div>
            </div>
            <div className="w-[80%] flex flex-col gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-100 text-opacity-50">Pickup</p>
                <p className="text-[#FFFFFF] font-medium block md:hidden">
                  {pickupLocation.substring(0, 30) + "..." || "N/A"}
                </p>
                <p className="text-[#FFFFFF] font-medium hidden md:block">
                  {pickupLocation.substring(0, 60) + "..." || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-100 text-opacity-50">
                  Delivery
                </p>
                <p className="text-[#FFFFFF] font-medium block md:hidden">
                  {dropLocation.substring(0, 30) + "..." || "N/A"}
                </p>

                <p className="text-[#FFFFFF] font-medium hidden md:block">
                  {dropLocation.substring(0, 60) + "..." || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
  </div>
  )
}

export default BookingMobileHeader