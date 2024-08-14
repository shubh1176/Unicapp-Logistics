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

const AboutUs = () => {
  const router = useRouter();
  const { user } = useUser()
  return (
    <div className='bg-[#F1EDEA] pt-1'>
    <div className="bg-[#470A68] flex justify-between items-center px-4 h-20 rounded-xl m-5">
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
    </div>
    <div className="content-center">
        <div className=' flex flex-row gap-14'>
          <div className='mx-20 px-24 w-1/2 -translate-x-20 -translate-y-10'>
            <div className='mt-40 flex flex-row gap-3'>
              <span className='text-6xl font-generalMedium'>About</span><span className='font-filson text-6xl mt-2 -space-x-6 tracking-tight'>unicapp</span>
            </div>
            <div className='mt-2'>
              <span>We’re here to deliver — any item, any time.</span>
            </div>
          </div>
          <div className='flex flex-col mt-14 px-3 mr-6 text-start -translate-x-14'>
            <span className='text-[#0000008c] text-2xl font-generalMedium mb-12'>
            At Unicapp, we’re all about making your life and business run smoother than a perfectly brewed cup of coffee on a Monday morning. Whether you’re an individual with a last-minute gift to send or a business needing to streamline operations, we’ve got the magic touch to get it done. Think of us as your reliable sidekick in the world of pickup, delivery, and courier services—ready to swoop in and save the day, every day.
            </span>
            <div className='mt-10'>
              <h2 className='text-3xl font-generalMedium mb-4'>Deliveries for on-demand needs</h2>
              <span className='mt-4 text-[#0000008c] font-generalMedium text-xl'>
              Our on-demand delivery service is like having a personal courier at your beck and call. Got an urgent need? No problem! We handle everything from picking up your package to delivering it swiftly and safely, even when you’re in a pinch. Imagine the peace of mind knowing that Unicapp has your back, whether it’s sending a forgotten document or a surprise birthday gift. We make it happen, and we make it happen fast.
              </span>
            </div>
            <div className='mt-16'>
              <h2 className='text-3xl font-generalMedium mb-4'>Deliveries for businesses</h2>
              <span className='mt-4 text-[#0000008c] text-xl font-generalMedium'>
              We see you too! Our intercity courier services are designed to take the stress out of logistics. With our dedicated business portal, you can track shipments in real-time, integrate seamlessly with your online store, and manage all your deliveries from one super cool dashboard. It’s like having a personal assistant who never sleeps. Experience the efficiency and reliability of Unicapp, and watch your business thrive. 
              </span>
            </div>
          </div>

        </div>
        <div className="bg-gradient-to-r from-[#470A68] to-[#8D14CE] text-white rounded-xl pl-4 py-3 mx-56 mt-36 mb-16 flex flex-row gap-4 items-center">
          <div className='translate-x-6'>
            <h2 className="text-4xl font-bold mb-4 font-filson translate-y-4 ">Get an estimate</h2>
            <p className="mb-4 font-generalRegular ">Enter your pickup & drop locations to check prices for delivery and courier.</p>
          </div>
          <div className="ml-40"> 
            <Button className="bg-[#F3E545] text-black py-2 px-4 rounded-xl w-96 hover:bg-[#E8D828] gap-4" onClick={()=>{router.push('/estimate')}}>See prices <Image src={'/images/arrow2.svg'} width={30} height={25} /> </Button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
