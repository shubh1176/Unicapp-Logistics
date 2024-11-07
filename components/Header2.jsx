"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, CircleUserRound, EllipsisVertical, WalletMinimal } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
const Header2 = () => {
    const router = useRouter();
    const { user } = useUser()
    return (
        <div className="w-screen bg-[linear-gradient(270deg,#9E3CE1_0%,#56217B_100%)] lg:bg-none flex justify-between items-center px-4  lg:mt-0  lg:py-0">
        <div>
        <Image src={'/images/yellowonwhite.svg'} width={160} height={30} alt="Logo" className='block lg:hidden relative right-3' />
          <Image src={'/images/blackonwhitelogo.svg'} width={200} height={50} alt="Logo" className='hidden lg:block' />
        </div>
        <div className="lg:flex items-center gap-4 hidden ">
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
        <div className="hidden lg:flex items-center gap-2">
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

        {/* Mobile Dropdown Menu */}
   <div className="lg:hidden flex ">
    {!user && (
       <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20  " onClick={() => router.replace('/dashboard')}>
       Sign In
     </Button>
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

export default Header2