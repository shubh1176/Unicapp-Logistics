// components/Header.js
"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, CircleUserRound, WalletMinimal, LogOut, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UserButton, useUser, useClerk } from '@clerk/clerk-react'

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="bg-[#8D14CE] flex justify-between items-center px-4 py-2">
      <div className=''>
        <Image src={'/images/yellowonwhite.svg'} width={150} height={40} alt="Logo" />
      </div>

      <div className="hidden md:flex items-center gap-2 md:gap-4">
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-sm md:text-lg">
          Home
        </Button>
        {/* Services dropdown only visible on medium and larger screens */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-white text-sm md:text-lg p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
            Services<ChevronDown />
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
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.push('/businesses')}>
              Last-mile Delivery
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-sm md:text-lg" onClick={() => router.push('/businesses')}>
          For business
        </Button>
        <Button variant="ghost" onClick={() => router.push('about')} className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-sm md:text-lg">
          About us
        </Button>
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-sm md:text-lg" onClick={() => router.push('contact')}>
          Contact
        </Button>
      </div>

      <div className="hidden md:flex items-center">
        {user ? (
          <div className="flex items-center space-x-2 md:space-x-4 rounded-lg py-2 w-32 md:w-48 h-10 md:h-12 text-xs md:text-sm pl-2">
            {/* Combined Dropdown for account, wallet, and sign out */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-white text-xs md:text-sm p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
                {user.fullName || 'Guest'} <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => router.push('/dashboard')}>
                  <CircleUserRound /> Account
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => router.push('/dashboard/wallet')}>
                  <WalletMinimal /> Wallet
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => signOut()}>
                  <LogOut /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-xs md:text-md" onClick={() => router.replace('/dashboard')}>
              Log In
            </Button>
            <Button className="text-xs md:text-md text-[#470A68] bg-white hover:border hover:outline-2 hover:bg-[#9E3CE1] hover:text-white" onClick={() => router.replace('/dashboard')}>
              Sign up
            </Button>
          </>
        )}
      </div>

      {/* Mobile menu and login/sign-up buttons */}
      <div className="flex md:hidden items-center space-x-2">
        {!user && (
          <>
            <Button variant="ghost" className="text-white text-xs" onClick={() => router.replace('/dashboard')}>
              Log In
            </Button>
            <Button className="text-xs text-[#470A68] bg-white hover:border hover:outline-2 hover:bg-[#9E3CE1] hover:text-white" onClick={() => router.replace('/dashboard')}>
              Sign up
            </Button>
          </>
        )}
        <button onClick={toggleDrawer} className="text-white focus:outline-none">
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#8D14CE] z-50 flex flex-col items-start p-4">
          <div className="flex justify-between w-full mb-8">
            <Image src={'/images/yellowonwhite.svg'} width={150} height={40} alt="Logo" />
            <button onClick={toggleDrawer} className="text-white focus:outline-none">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-4 w-full">
            <Button variant="ghost" className="text-white text-left w-full hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => { router.push('/'); toggleDrawer(); }}>
              Home
            </Button>
            {/* Services option is removed for mobile screens */}
            <Button variant="ghost" className="text-white text-left w-full hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('/businesses')}>
              Business
            </Button>
            <Button variant="ghost" className="text-white text-left w-full hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('about')}>
              About us
            </Button>
            <Button variant="ghost" className="text-white text-left w-full hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('contact')}>
              Contact
            </Button>
          </nav>
          <div className="mt-auto w-full">
            {user ? (
              <div className="flex items-center space-x-4 border-2 rounded-lg py-2 w-full h-12 text-sm pl-2">
                <UserButton />
                <div className="flex flex-col">
                  <span className="text-white text-sm">{user.fullName || 'Guest'}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-white text-sm p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
                      <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
                      <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => { router.push('/dashboard'); toggleDrawer(); }}>
                        <CircleUserRound />Account
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => { router.push('/dashboard/wallet'); toggleDrawer(); }}>
                        <WalletMinimal />Wallet
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => { signOut(); toggleDrawer(); }}>
                        <LogOut />Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : null }
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
