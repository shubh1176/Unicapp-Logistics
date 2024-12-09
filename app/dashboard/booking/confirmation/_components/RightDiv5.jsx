"use client"
import { Button } from '@/components/ui/button'
import { LucideArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function RightDiv5() {
    const router = useRouter()
  return (
    <div className="flex justify-start laptop:items-center "> {/* Ensure RightDiv5 is centered on the screen */}
      <div className='flex flex-col gap-7 mt-0 lg:mt-20   lg:text-left'> {/* Adjust margin for small screens */}
        <div className='flex flex-col lg:flex-row gap-1 lg:gap-4 lg:justify-center lg:items-center'>
            <Image src={'/images/Approval.svg'} width={100} height={10} className='mx-auto'/>
            <h2 className='font-generalSemiBold mt-4 lg:mt-8 text-4xl lg:mb-6'>Order Confirmed!</h2>
        </div>
        <div className='lg:translate-x-4'>
            <span className='text-base font-generalMedium'>
            Now sit back and relax! We'll assign a delivery <br></br> Capptain to your specified time. <br /><br /> Tracking details will be on their way as soon<br /> as your order is dispatched. You can check <br /> them in My Profile section
            </span>
        </div>
        <div className='w-60 lg:translate-x-4 mt-4 mx-auto lg:mx-0' onClick={()=>{router.push('/dashboard')}}>
            <div className='flex flex-row justify-between border-2 border-zinc-950 rounded-xl py-1 px-6'>
                <span className='font-generalMedium mt-2'>
                    Go to My Profile
                </span>
                <div>
                <Button className="rounded-full bg-[#9E3CE1] border-spacing-1 border-2 px-1 h-10 w-10 hover:bg-[#9E3CE1]"><LucideArrowUpRight size={18}/></Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default RightDiv5;
