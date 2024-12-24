"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowBigRightDash, ArrowRight, ChevronDown, CircleUserRound, CircleUserRoundIcon, WalletMinimal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Footer from '@/components/Footer';
import { UserButton, useUser } from '@clerk/clerk-react'
import Faq2 from '@/components/Faq2';
import GetEstimate from '@/components/GetEstimate';
import Header3 from '@/components/Header3';

const AboutUs = () => {
  const router = useRouter();
  const { user } = useUser()
  return (
    <div className='bg-[#F1EDEA] min-w-screen overflow-hidden '>
    {/* <div className="bg-[#470A68] flex justify-between items-center px-4 h-20 rounded-xl m-5">
      <div>
        <Image src={'/images/yellowonwhite.svg'} width={200} height={50} alt="Logo" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('/')}>
          Home
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-white text-lg p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
            Services <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.push('/Pickup-and-drop')}>
              Pickup & Drop
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.push('/courier')}>
              Intercity Courier
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
              API Integration
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.push('/businesses')}>
              Last-mile Delivery
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('/businesses')}>
          For business
        </Button>
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('/about')}>
          About us
        </Button>
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('/contact')}>
          Contact
        </Button>
      </div>
      <div className="flex items-center gap-2">
      {user ? (
          <div className="flex items-center space-x-4 border-2 rounded-lg py-2 px-3">
          <UserButton />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white text-lg p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
              {user.fullName || 'Guest'} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => router.push('/dashboard')}>
              <CircleUserRoundIcon />Account
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => router.push('/dashboard/wallet')}>
              <WalletMinimal />Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        ) : (
          <>
            <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-md" onClick={()=>router.replace('/dashboard')}>
              Log In
            </Button>
            <Button className="text-[#470A68] bg-white hover:border-2 hover:outline-2 hover:bg-[#470A68] hover:text-white" onClick={()=>router.replace('/dashboard')}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </div> */}
     <div >
        <Header3 />
      </div>
    <div className="">
        <div className=' flex flex-col items-center lg:items-start gap-10 lg:gap-0 lg:flex-row '>
          <div className='lg:mx-20 lg:px-24 lg:w-1/2 lg:-translate-x-10 lg:-translate-y-10'>
            <div className='lg:mt-40 flex flex-row gap-3'>
              <span className='text-5xl lg:text-8xl font-generalBold'>FAQs</span>
            </div>
            <div className='mt-2'>
              <span>Still have questions?<br />Reach us at +91 96258 11881 or <br />email us at contact@unicapp.in.</span>
            </div>
          </div>
          <div className='w-full flex justify-center mt-5 lg:mr-10'>
            <Faq2 />
          </div>


        </div>
        {/* <div className="bg-gradient-to-r from-[#470A68] to-[#8D14CE] text-white rounded-xl pl-4 py-3 mx-56 mt-36 mb-16 flex flex-row gap-4 items-center">
          <div className='translate-x-6'>
            <h2 className="text-4xl font-bold mb-4 font-filson translate-y-4 ">Get an estimate</h2>
            <p className="mb-4 font-generalRegular ">Enter your pickup & drop locations to check prices for delivery and courier.</p>
          </div>
          <div className="ml-40"> 
            <Button className="bg-[#F3E545] text-black py-2 px-4 rounded-xl w-96 hover:bg-[#E8D828] gap-4" onClick={()=>{router.push('/estimate')}}>See prices <Image src={'/images/arrow2.svg'} width={30} height={25} /> </Button>
          </div>
        </div> */}
        <div className='my-20 lg:my-32 '>
        <GetEstimate/>
        </div>
      </div>
      <div >
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
