"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Faq from '@/components/Faq';
import { ArrowRight, ChevronDown, CircleUserRound, WalletMinimal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserButton, useUser } from '@clerk/clerk-react'

function Contact() {
  const router = useRouter();
  const { user } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Your message has been sent successfully.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      alert('Failed to send your message. Please try again later.');
    }
  };

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
              <CircleUserRound />Account
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => router.push('/dashboard/wallet')}>
              <WalletMinimal />Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        ) : (
          <>
            <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={()=>router.replace('/dashboard')}>
              Log In
            </Button>
            <Button className="text-[#470A68] bg-white hover:border hover:outline-2 hover:bg-[#9E3CE1] hover:text-white" onClick={()=>router.replace('/dashboard')}>
              Sign up
            </Button>
          </>
        )}
        </div>
      </div>

      <div className='flex flex-row gap-9 p-20'>
        <div className='flex flex-col ml-8 translate-y-11 translate-x-20'>
          <div className=''>
            <h2 className='text-6xl font-generalSemiBold'>Contact Us</h2>
            <div className='flex flex-col mt-5 p-2'>
              <span className='font-generalLight text-xl'>Email, call or complete the form to learn how</span>
              <span className='font-generalLight text-xl'>Unicapp can help you with your deliveries.</span>
              <span className='font-generalLight text-xl mt-10'>Email: contact@unicapp.in</span>
              <span className='font-generalLight text-xl mt-2'>Call : +91 9625811881</span>
            </div>
          </div>
          <div className='flex flex-row gap-5 mt-12'>
            <div className='w-60'>
              <h3 className='font-generalMedium underline text-base mb-2'>Customer Support</h3>
              <span className='font-generalRegular mt-1 text-right text-sm'>Our support team is available <br></br> around the clock to address any <br></br> concerns or queries you may <br></br> have.</span>
            </div>
            <div className='w-60'>
              <h3 className='font-generalMedium underline text-base mb-2'>Feedback and Suggestions</h3>
              <span className='font-generalRegular mt-1 text-right text-sm'>Our support team is available <br></br> around the clock to address any <br></br> concerns or queries you may <br></br> have.</span>
            </div>
          </div>
        </div>
        <div>
          <div className='bg-white rounded-2xl flex flex-col p-10 ml-52 mr-14 shadow-md'>
            <h1 className='font-generalLight text-5xl mb-9'>Get in touch</h1>
            <span className='font-semibold mb-4 text-sm'>Customer Support</span>
            <p className='text-gray-600 mb-8'>
              Our support team is available around the clock to address any concerns or queries you may have.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                  <Input
                    className="shadow appearance-none bordee rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                  <Textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                  ></Textarea>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12 ml-32 flex flex-row">
        <div className="w-5/12 h-96 translate-x-14">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d799.555333633901!2d77.21645935361299!3d28.63083352312202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd49c7175d4f%3A0x16da96dd1f463918!2sRegal%20Building%2C%20Hanuman%20Road%20Area%2C%20Connaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1722761292583!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 3 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className='rounded-2xl'
          ></iframe>
        </div>
        <div className='ml-32 mt-10 flex flex-col translate-y-8'>
          <h2 className=' mb-3'>Our Location</h2>
          <h2 className='text-3xl font-generalLight'>Connecting Near and Far</h2>
          <span className='mt-8 font-bold'>Head Office</span>
          <span className='mt-4'>Unicapp Logistics Pvt. Ltd.<br /> 44, Backary portion, 2nd Floor, <br /> Regal Building, Connaught Place,<br /> New Delhi -110001<br />India</span>
        </div>
      </div>

      <div className='mt-20 mb-36'>
      <div className="bg-gradient-to-r from-[#470A68] to-[#8D14CE] text-white rounded-xl pl-4 pr-4 py-3 mx-56 mt-36 mb-16 flex flex-row gap-4 items-center">
          <div className='translate-x-6'>
            <h2 className="text-4xl font-bold mb-4 font-filson translate-y-4 ">Get an estimate</h2>
            <p className="mb-4 font-generalRegular ">Enter your pickup & drop locations to check prices for delivery and courier.</p>
          </div>
          <div className="ml-40"> 
            <Button className="bg-[#F3E545] text-black py-2 px-4 rounded-xl w-96 hover:bg-[#E8D828] gap-4" onClick={()=>{router.push('/estimate')}}>See prices <Image src={'/images/arrow2.svg'} width={30} height={25} /> </Button>
          </div>
        </div>
      </div>

      <div className='mt-20 mb-24'>
        <Faq />
      </div>
      <div className='mb-3'>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
