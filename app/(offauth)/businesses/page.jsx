"use client";
import Image from 'next/image';
import React from 'react';

import { useRouter } from 'next/navigation';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import {  useUser } from '@clerk/clerk-react'
import { IoShieldCheckmark } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import TestimonialSection from '@/components/TestimonialSection';
import Header2 from '@/components/Header2';
import GetEstimate from '@/components/GetEstimate';


export default function page() {
  const router = useRouter();
  const { user } = useUser()
  return (
    <div className='bg-[#F1EDEA]  max-w-screen overflow-hidden '>
      
      <Header2 />

      <div className="h-[450px]  md:min-h-screen rounded-t-none rounded-b-3xl md:mb-32 flex flex-col md:flex-row items-center  justify-evenly md:rounded-3xl bg-[linear-gradient(270deg,#9E3CE1_0%,#56217B_100%)] mb-64 md:mx-16 md:px-14 md:py-16">
        
        {/* Left side - Text and Features */}
        <div className="text-white space-y-6 w-full md:w-[60%]">
          <h1 className="text-[27px] md:text-5xl text-center md:text-start font-bold font-filson leading-[50px] md:leading-[60px] mb-6 md:mb-0">
            Need a shipping partner? <br />
            <span className="bg-yellow-400 px-2 py-3 md:leading-[60px] text-black rounded-xl">Unicapp</span> to the rescue!
          </h1>
          <p className="text-lg hidden md:block">
            Enable your store or business to get anything delivered on-demand or nationwide. We promise a 5-star last-mile delivery experience for your customers. Trusted by leading companies for delivery service.
          </p>

          <div className='flex items-center justify-around px-8'>
            <div className='flex items-center'><RiMoneyRupeeCircleFill /><span className='ml-1 font-bold text-xs'>Pocket-friendly</span></div>
            <div className='flex items-center'><IoShieldCheckmark /><span className='ml-1 font-bold text-xs'>Secured</span></div>
            <div className='flex items-center'><FaPhone /><span className='ml-1 font-bold text-xs'>24/7 Assistance</span></div>
          </div>
          <ul className="space-y-4 font-montserrat hidden md:block">
            {/* Feature 1 */}
            <li className="flex items-start space-x-4 w-[55%]">
              <span className="text-2xl mt-1"><RiMoneyRupeeCircleFill /></span>
              <div>
                <h3 className="font-bold text-xl">Pocket-friendly</h3>
                <p className='text-[14px]'>We may not be the cheapest, but our prices are still lower than what's currently on the market.</p>
              </div>
            </li>
            {/* Feature 2 */}
            <li className="flex items-start space-x-4 w-[60%]">
              <span className="text-2xl mt-1"><IoShieldCheckmark/></span>
              <div>
                <h3 className="font-bold text-xl">Secured</h3>
                <p className='text-[14px]'>We ship exclusively with trusted courier partners, ensuring your package is always secure.</p>
              </div>
            </li>
            {/* Feature 3 */}
            <li className="flex items-start space-x-4 w-[55%]">
              <span className="text-2xl mt-1"><FaPhone/> </span>
              <div>
                <h3 className="font-bold text-xl">24/7 Assistance</h3>
                <p className='text-[14px]'>We're here for you 24/7 to address any issues you may have with your shipments.</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Right side - Form */}
        <div className="bg-white p-8 text-sm rounded-lg shadow-lg  max-w-lg relative top-10 md:top-0">
          <form className='space-y-5'>
          <div>
              <input
                type="text"
                placeholder="+91 Phone Number *"
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email ID *"
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Type of business *"
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="terms" className="mt-1"/>
              <label htmlFor="terms" className="text-gray-500 text-sm">
                I accept the <span className="underline">Terms of Use & Privacy Policy</span>.
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-[#FFD966] text-[#470A68] font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-all"
            >
              Sign up
            </button>
          </form>
        </div>
   
      </div>
      {/* <div className="bg-gradient-to-r flex justify-between items-center md:px-4 rounded-xl mt-5 py-1">
        <div>
          <Image src={'/images/blackonwhitelogo.svg'} width={200} height={50} alt="Logo" />
        </div>
        <div className="flex items-center gap-4">
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
            <DropdownMenuTrigger className="flex items-center gap-1 text-black text-xs p-2 rounded-lg cursor-pointer hover:bg-opacity-20 hover:text-black">
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
            <Button variant="ghost" className="text-black hover:bg-[#fefae060] hover:bg-opacity-20 hover:text-black text-md" onClick={()=>router.replace('/dashboard')}>
              Log In
            </Button>
            <Button className="text-white bg-[#9E3CE1] hover:border-2 hover:outline-2 hover:bg-[#fefae060] hover:border-[#9E3CE1] hover:text-black text-md" onClick={()=>router.replace('/dashboard')}>
              Sign up
            </Button>
          </div>
        )}
        </div>
      </div> */}

     

      <div className='w-full flex flex-col items-center justify-center text-center   md:mb-32 '>
     
        <div className='flex flex-row gap-1.5 text-[18px]  md:text-3xl'>
          <h2 className='font-generalSemiBold  '>SHIP WITH THE</h2>
          <h2 className='font-generalSemiBold text-[#9E3CE0] '>BEST</h2>
          <h2 className='font-generalSemiBold '>IN THE BUSINESS</h2>
        </div>
        <div className='bg-[#F8F6F5] rounded-3xl md:rounded-2xl px-10 md:px-0  mx-40  md:mx-10 mt-8 w-[90%] md:w-auto'>
        <div className='w-full flex flex-row gap-12 justify-around md:gap-36 py-10 md:p-12  md:justify-center'>
          <div className='flex flex-col items-center text-sm text-center'>
            <Image src={'/images/stopwatch.svg'} height={150} width={150} alt="Same Day"  className='w-14 h-10 md:w-36 md:h-36'/>
            <h2 className='font-generalSemiBold mt-4 md:mt-4 text-xs md:text-xl'>Same Day</h2>
            <span className='hidden md:block'>We provide same day intracity <br /> deliveries, so that you can make <br /> your customers even happier!</span>
          </div>
          <div className='flex flex-col items-center text-sm text-center'>
            <Image src={'/images/calendar.svg'} height={150} width={150} alt="Scheduled" className='w-14 h-10  md:w-36 md:h-36' />
            <h2 className='font-generalSemiBold mt-4 md:mt-6 text-xs md:text-xl'>Scheduled</h2>
            <span className='hidden md:block'>Plan and schedule your <br /> pickups to ensure you never <br /> miss a delivery</span>
          </div>
          <div className='flex flex-col items-center text-sm text-center'>
            <Image src={'/images/8.svg'} height={150} width={150} alt="Multiple drop-off points" className='w-14 h-10  md:w-36 md:h-36' />
            <h2 className='font-generalSemiBold mt-4 md:mt-4 text-xs md:text-xl'>Multiple drop-<br/>off points</h2>
            <span className='hidden md:block'>We value your time, so we provide <br /> multiple drop-off points, eliminating the <br /> need to book each shipment separately.</span>
          </div>
        </div>
        </div>
      </div>


    

      <div className='z-10 hidden  md:flex flex-col items-center justify-center text-center mt-14 mb-11'>
      <div className='hidden md:block absolute z-0 inset-0 top-[1920px]'>
          <Image src={'/images/ribbonDesktopBusiness.png'} className='w-[1900px] h-[950px] z-0 ' width={2000} height={100} alt="Logo" />
        </div>
        <div className='z-10'>
          <h2 className='text-5xl font-generalSemiBold mb-4'>Deliveries Made Easy</h2>
          <span className=''>You amplify sales, we simplify deliveries</span>
        </div>
        <div className='relative'>
        <div className="absolute w-full h-full transform -z-10">
          <Image src={'/images/YellowRibbon.svg'} layout="fill" objectFit="cover" alt="Ribbon Background" />
        </div>
        <div className='grid grid-cols-2 gap-y-20 gap-x-64 mt-28 mx-40 relative'>
          <div>
            <Image src={'/images/tree.svg'} height={356} width={356} alt="Tree" />
          </div>
          <div>
            <h2 className='text-3xl font-generalSemiBold mb-4 mt-8'>Easy Store Integration</h2>
            <span className=''>You amplify sales, we simplify deliveries</span>
          </div>
          <div>
            <h2 className='text-3xl font-generalSemiBold mb-4 mt-8'>Dedicated Dashboard</h2>
            <span className=''>You amplify sales, we simplify deliveries</span>
          </div>
          <div>
            <Image src={'/images/DashboardLayout.svg'} height={356} width={356} alt="Dashboard" />
          </div>
          <div>
            <Image src={'/images/CustomerSupportPicture.svg'} height={356} width={356} alt="Customer Support" />
          </div>
          <div>
            <h2 className='text-3xl font-generalSemiBold mb-4 mt-8'>24/7 Customer Support</h2>
            <span className=''>You amplify sales, we simplify deliveries</span>
          </div>
        </div>
      </div>
      </div>
     
      <div className='block  md:hidden mt-28 '>
        <Image src={'/images/deliverymadeeasy.png'} className='w-[1900px] z-0 ' width={2000} height={100} objectFit="cover" alt="Ribbon Background" />
        </div>

      <div className='hidden md:flex justify-center items-center mt-56 mb-28'>
        <Image src={'/images/businessgrouppage.svg'} height={544} width={1306} alt="Business Group" />
      </div>
     
<div className='block  md:hidden mt-28 px-8'>
        <Image src={'/images/businessgrouppage2.png'} className=' z-0 ' width={2000} height={100} objectFit="cover" alt="Ribbon Background" />
        </div>
      <div className='max-w-screen overflow-hidden my-36'>
        <TestimonialSection/>
      </div>
      <div className='w-full mb-20'>
      <GetEstimate  />

      </div>
      <div className='mb-20'>
        <Faq />
      </div>
          
      <Footer />

   
    </div>
  )
}
