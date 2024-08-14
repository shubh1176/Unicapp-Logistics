"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ArrowLeft, ArrowRight, CircleUserRound, WalletMinimal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import Faq from '@/components/Faq';
import CourierComponent from './_components/courierbox';
import { UserButton, useUser } from '@clerk/clerk-react'


function page() {
    const router = useRouter()
    const { user } = useUser()
  return (
    <div className='bg-[#F1EDEA] pt-1'>
      <div className="bg-gradient-to-r flex justify-between items-center px-4 rounded-xl m-5">
        <div>
          <Image src={'/images/blackonwhitelogo.svg'} width={200} height={50} alt="Logo" />
        </div>
        <div className="flex items-center gap-4 ml-10">
          <Button variant="ghost" className="text-black hover:bg-[#E5D5E6] text-lg hover: rounded-xl" onClick={() => router.push('/')}>
            Home
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-black text-lg hover:cursor-pointer ">
              Services <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.push('/Pickup-and-drop')}>
                Pickup & Drop
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.replace('/courier')}>
                Intercity Courier
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                API Integration
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.replace('/businesses')}>
                Last-mile Delivery
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" className="text-black hover:bg-[#E5D5E6] text-lg" onClick={() => router.push('/businesses')}>
            For business
          </Button>
          <Button variant="ghost" className="text-black hover:bg-[#E5D5E6] text-lg" onClick={() => router.push('/about')}>
            About us
          </Button>
          <Button variant="ghost" className="text-black hover:bg-[#E5D5E6] text-lg" onClick={() => router.push('/contact')}>
            Contact
          </Button>
        </div>
        <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center space-x-4 border-2 rounded-lg py-2 px-3">
          <UserButton />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-black text-lg p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20">
              {user.fullName || 'Guest'} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => router.push('/dashboard')}>
              <CircleUserRound />Account
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => router.push('/dashboard/wallet')}>
              <WalletMinimal />Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        ) : (
          <div className='flex flex-row gap-2 mr-6'>
            <Button variant="ghost" className="text-black hover:bg-[#fefae060] hover:bg-opacity-20 hover:text-black text-lg" onClick={()=>router.replace('/dashboard')}>
              Log In
            </Button>
            <Button className="text-white bg-[#9E3CE1] hover:border-2 hover:outline-2 hover:bg-[#fefae060] hover:border-[#9E3CE1] hover:text-black text-lg" onClick={()=>router.replace('/dashboard')}>
              Sign up
            </Button>
          </div>
        )}
        </div>
      </div>

      <div className='mb-10'>
        <CourierComponent />
      </div>

      <div className='bg-[#2A2A2A] w-full flex flex-row pt-7 pb-7 justify-between pr-10 pl-10 mt-10'>
        <div className='flex flex-col'>
            <div className='flex flex-row gap-2'>
                <span className='text-[#F3E545] font-semibold text-xl'>Unicapp</span><span className=' text-white font-semibold text-xl'>ships through</span>
            </div>
            <div>
                <span className='text-[#FFFFFF] font-generalLight text-sm'>& many more</span>
            </div>
        </div>
        <div className='mt-2'>
            <Image src={'/images/shipcompanies.svg'} width={957.14} height={50} />
        </div>
      </div>

      <div className='flex justify-center items-center content-center mb-28 mt-20'>
        <Image src={'/images/courierguy.svg'} height={565} width={1121} />
      </div>
      <div className='mb-20'>
        <Faq />
      </div>
      <div className='mt-10'>
        <Footer />
      </div>
        
    </div>
  )
}

export default page
