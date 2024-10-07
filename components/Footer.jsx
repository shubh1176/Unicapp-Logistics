import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function Footer() {
  const router = useRouter()
  return (
    <div className="bg-[#202020] md:rounded-2xl rounded-t-3xl rounded-b-none  sm:mx-0 sm:mb-0 md:mx-5 content p-8 md:p-10 text-white relative mt-10">
      <div className="flex flex-col justify-between mb-5 md:mb-10">
        <div className="flex flex-row gap-4 md:gap-8 pl-2 md:pl-4 translate-y-3">
          <Image src={'/images/yellowcaplogo.svg'} alt="Unicapp Logo" width={150} height={150} className='w-[100px] md:w-[150px]' />
          <span className='mt-2 md:mt-4 text-xs md:text-sm space-x-2 md:space-x-5'>We’re here to deliver—any item, any time.</span>
        </div>
        <div className='flex flex-col md:flex-row mt-3 md:mt-6 ml-4 md:ml-7 text-xs md:text-sm gap-4 md:gap-8 translate-y-5 -translate-x-1 md:-translate-x-3'>
          <div className='flex gap-8'>
          <div className="flex flex-col">
            <h4 className="text-lg mb-2 md:mb-4 text-neutral-500">MENU</h4>
            <span className="mb-2 text-xs md:text-sm text-neutral-400 hover:cursor-pointer" onClick={() => { router.push('/') }}>Home</span>
            <span className="mb-2 text-xs md:text-sm text-neutral-400 hover:cursor-pointer" onClick={() => { router.push('/courier') }}>Services</span>
            <span className="mb-2 text-xs md:text-sm text-neutral-400 hover:cursor-pointer" onClick={() => { router.push('/about') }}>About Us</span>
            <span className="mb-2 text-xs md:text-sm text-neutral-400 hover:cursor-pointer" onClick={() => { router.push('/contact') }}>Contact</span>
          </div>
          <div className="flex flex-col">
            <h4 className="text-lg mb-2 md:mb-4 text-neutral-500">SERVICES</h4>
            <span className="mb-2 text-xs md:text-sm text-neutral-400 hover:cursor-pointer" onClick={() => { router.push('/Pickup-and-drop') }}>Same Day Pickup/Delivery</span>
            <span className="mb-2 text-xs md:text-sm text-neutral-400 hover:cursor-pointer" onClick={() => { router.push('/courier') }}>Courier Delivery</span>
            <span className="mb-2 text-xs md:text-sm text-neutral-400 hover:cursor-pointer" onClick={() => { router.push('/businesses') }}>Online Store Integration</span>
            <span className="mb-2 text-xs md:text-sm text-neutral-400 hover:cursor-pointer" onClick={() => { router.push('/businesses') }}>Last-mile Delivery</span>
          </div>

          </div>
        
          <div className="flex flex-col">
            <h4 className="text-lg mb-2 md:mb-4 text-neutral-500">REACH US AT</h4>
            <div className="flex items-center mb-2">
              <Image src="/images/yellowEnvelopestr.svg" alt="Email" width={20} height={20} />
              <span className="ml-2 text-xs md:text-sm text-neutral-400">contact@unicapp.in</span>
            </div>
            <div className="flex items-center mb-2">
              <Image src="/images/locationpin.svg" alt="Address" width={20} height={20} />
              <span className="ml-2 text-xs md:text-sm text-neutral-400">44, Backary portion, 2nd Floor, Regal Building,<br></br> Connaught Place, New Delhi -110001</span>
            </div>
            <div className="flex items-center">
              <Image src="/images/Instagram.svg" alt="Instagram" width={20} height={20} />
              <span className="ml-2 text-xs md:text-sm text-neutral-400">@unicapp.in</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-7 md:top-32 right-20 md:right-36 w-40 md:w-80 h-40 md:h-80 transform translate-x-20 md:translate-x-36 -translate-y-0.5 rotate-0">
        <Image src={'/images/84.svg'} alt="Ribbon" layout="fill" objectFit="contain" />
      </div>
      <div className="pt-4 text-start space-y-2 text-gray-400 text-xs md:text-sm translate-x-1 md:translate-x-3">
        <p>© 2023 Unicapp Logistics Pvt Ltd </p>
        <p>CIN: U52219DL2023PTC416502</p>
         
      </div>
    </div>
  )
}

export default Footer