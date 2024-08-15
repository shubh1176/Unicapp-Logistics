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
import { ChevronDown, CircleUserRound, WalletMinimal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import EstimateComponent from '@/components/Estimate';
import { UserButton, useUser } from '@clerk/clerk-react'

export default function page() {
  const router = useRouter();
  const { user } = useUser()
  return (
    <div className='bg-[#F1EDEA] pt-1'>
      <div className="bg-gradient-to-r flex justify-between items-center px-4 rounded-xl mt-5 py-1">
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
      </div>


      <div className='flex flex-col items-center justify-center text-center'>
        <div className='flex flex-row gap-1.5'>
          <h2 className='font-generalSemiBold text-3xl '>SHIP WITH THE</h2>
          <h2 className='font-generalSemiBold text-[#9E3CE0] text-3xl'>BEST</h2>
          <h2 className='font-generalSemiBold text-3xl'>IN THE BUSINESS</h2>
        </div>
        <div className='bg-[#F8F6F5] rounded-2xl mx-9 mt-8'>
        <div className='flex flex-row gap-36 p-12 mx-16 justify-center'>
          <div className='flex flex-col items-center text-center'>
            <Image src={'/images/stopwatch.svg'} height={150} width={150} alt="Same Day" />
            <h2 className='font-generalSemiBold mt-4 text-xl'>Same Day</h2>
            <span>We provide same day intracity <br /> deliveries, so that you can make <br /> your customers even happier!</span>
          </div>
          <div className='flex flex-col items-center text-center'>
            <Image src={'/images/calendar.svg'} height={150} width={150} alt="Scheduled" />
            <h2 className='font-generalSemiBold mt-6 text-xl'>Scheduled</h2>
            <span>Plan and schedule your <br /> pickups to ensure you never <br /> miss a delivery</span>
          </div>
          <div className='flex flex-col items-center text-center'>
            <Image src={'/images/8.svg'} height={150} width={150} alt="Multiple drop-off points" />
            <h2 className='font-generalSemiBold mt-4 text-xl'>Multiple drop-off points</h2>
            <span>We value your time, so we provide <br /> multiple drop-off points, eliminating the <br /> need to book each shipment separately.</span>
          </div>
        </div>
        </div>
      </div>


      <div className=' flex flex-col items-center justify-center text-center mt-14 mb-11'>
        <div>
          <h2 className='text-5xl font-generalSemiBold mb-4'>Deliveries Made Easy</h2>
          <span className=''>You amplify sales, we simplify deliveries</span>
        </div>
        <div className='relative'>
        <div className="absolute w-full h-full transform -z-10">
          <Image src={'/images/YellowRibbon.svg'} layout="fill" objectFit="cover" alt="Ribbon Background" />
        </div>
        <div className='grid grid-cols-2 gap-y-16 gap-x-96 mt-28 relative'>
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
      
      <div className='flex justify-center items-center mt-36 mb-28'>
        <Image src={'/images/businessgrouppage.svg'} height={544} width={1306} alt="Business Group" />
      </div>
      <div>
        <Faq />
      </div>
      <Footer />
    </div>
  )
}
