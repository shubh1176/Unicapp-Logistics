"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, CircleUserRound, WalletMinimal, LogOut, EllipsisVertical, X, CircleUserRoundIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';

function Header3() {
  const router = useRouter();
  const { user } = useUser();

  
  return (
    <div className="bg-[#470A68] flex justify-between items-center px-4 h-20 rounded-xl py-1 m-5">
    <div className='relative right-6 lg:right-0'>
      <Image src={'/images/yellowonwhite.svg'} width={200} height={50} alt="Logo" className='w-44 lg:w-auto' onClick={() => router.push('/')} />
    </div>
    <div className="lg:flex items-center gap-4 hidden">
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
    <div className=" items-center gap-2 hidden lg:flex">
    {user ? (
        <div className="flex items-center space-x-4 border-2 rounded-lg py-0 px-3">
        <UserButton />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1  text-white text-xs p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
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
       {/* Mobile Dropdown Menu */}
   <div className="lg:hidden flex ">
    {!user ? (
       <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20  " onClick={() => router.replace('/dashboard')}>
       Sign In
     </Button>
    ):(
      <UserButton  appearance={Image} />
    )}
    
  
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-white focus:outline-none">
            <EllipsisVertical size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black  mt-0 rounded-md shadow-lg w-48 p-2 mr-7">
          {user && <DropdownMenuItem
              className="py-2 w-full border-b border-gray-300  cursor-pointer text-lg"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </DropdownMenuItem>}
            <DropdownMenuItem
              className="py-2 w-full border-b border-gray-300  cursor-pointer text-lg"
              onClick={() => router.push("/businesses")}
            >
              For Business
            </DropdownMenuItem>
            <DropdownMenuItem
              className="py-2 w-full border-b border-gray-300 cursor-pointer  text-lg"
              onClick={() => router.push("/about")}
            >
              About Us
            </DropdownMenuItem>
            <DropdownMenuItem
              className="py-2 w-full cursor-pointer text-lg"
              onClick={() => router.push("/contact")}
            >
              Contact
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  </div>
  )
}

export default Header3