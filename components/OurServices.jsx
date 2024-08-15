// components/OurServices.js
import { LucideArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

function OurServices() {
  const router = useRouter()
  return (
    <div className='bg-[#fefae060]'>
      <div className='flex flex-col items-center gap-10 border-solid bg-[#ffffffa3] px-8 pb-5 pt-16 mt-10 mb-10 mx-24 rounded-3xl shadow-lg'>
        <span className='bg-[#7cc4f851] text-[#4B8EBF] rounded-lg py-2 px-3 font-generalMedium'>OUR SERVICES</span>
        <div className='text-center'>
          <h2 className='text-[#000000] font-filson text-6xl'>One-stop solution for all</h2>
          <h2 className='text-[#000000] font-filson text-6xl'>your delivery needs</h2>
        </div>

        <div className='text-center'>
          <span className='font-generalRegular text-2xl'>A personal <span className='font-generalRegular text-[#9E3CE1] text-2xl'>delivery</span> partner for everyone</span>
        </div>

        <div className='flex flex-row gap-7 mb-8 mt-16 mx-8 px-56'>
          <div className='flex flex-col items-center'>
            <div className='bg-[#F8EBAB] h-60 w-60 rounded-2xl flex justify-center items-center'>
                <Image src={'/images/groupimage.svg'} height={200} width={200} alt="Flower" />
            </div>
            <div className='w-60 mt-0 hover:cursor-pointer' onClick={()=>router.replace('/Pickup-and-drop')}>
              <span className='flex flex-row justify-between bg-black rounded-2xl p-2'>
                <span className='font-generalRegular text-white py-2 px-2 space-x-1'>Pickup & Drop</span>
                <Button className="rounded-full bg-[#9E3CE1] border-spacing-1 p-2 hover:bg-[#9E3CE1]"><LucideArrowUpRight/></Button>
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='bg-[#F8EBAB] h-60 w-60 rounded-2xl flex justify-center items-center'>
              <Image src={'/images/delivery.svg'} height={60} width={150} alt="Delivery" />
            </div>
            <div className='w-60 mt-0 hover:cursor-pointer' onClick={()=>router.replace('/courier')}>
              <span className='flex flex-row justify-between bg-black rounded-2xl p-2'>
                <span className='font-generalRegular text-white py-2 px-2 space-x-1'>Intercity Courier</span>
                <Button className="rounded-full bg-[#9E3CE1] border-spacing-1 p-2 hover:bg-[#9E3CE1]" onClick={()=>router.replace('/courier')}><LucideArrowUpRight/></Button>
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='bg-[#F8EBAB] h-60 w-60 rounded-2xl flex justify-center items-center'>
              <Image src={'/images/shmf.svg'} height={110} width={194} alt="API Integration" />
            </div>
            <div className='w-60 mt-0 hover:cursor-pointer' onClick={()=>router.replace('/businesses')}>
              <span className='flex flex-row justify-between bg-black rounded-2xl p-2'>
                <span className='font-generalRegular text-white py-2 px-2 space-x-1'>API Integration</span>
                <Button className="rounded-full bg-[#9E3CE1] border-spacing-1 p-2 hover:bg-[#9E3CE1]" ><LucideArrowUpRight/></Button>
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='bg-[#F8EBAB] h-60 w-60 rounded-2xl flex justify-center items-center'>
              <Image src={'/images/delman.svg'} height={90} width={170} alt="Last-mile Delivery" />
            </div>
            <div className='w-60 mt-0 hover:cursor-pointer' onClick={()=>router.replace('/businesses')}>
              <span className='flex flex-row justify-between bg-black rounded-2xl p-2'>
                <span className='font-generalRegular text-white py-2 px-2 space-x-1'>Last-mile Delivery</span>
                <Button className="rounded-full bg-[#9E3CE1] border-spacing-1 p-2 hover:bg-[#9E3CE1]" onClick={()=>router.replace('/businesses')}><LucideArrowUpRight/></Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurServices
