import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function Footer() {
  const router = useRouter()
  return (
    <div className="bg-[#202020] rounded-2xl mx-5 content p-10 text-white relative mt-10">
      <div className="flex flex-col justify-between mb-10">
        <div className="flex flex-row gap-8 pl-4 translate-y-3">
          <Image src={'/images/yellowcaplogo.svg'} alt="Unicapp Logo" width={200} height={200} />
          <span className='mt-4 text-sm space-x-5'>We’re here to deliver—any item, any time.</span>
        </div>
        <div className='flex flex-row mt-6 ml-7 text-sm gap-8 translate-y-5 -translate-x-3'>
        <div className="flex flex-col">
          <h4 className="text-lg mb-4 text-neutral-500">MENU</h4>
          <span className="mb-2 text-sm text-neutral-400 hover:cursor-pointer" onClick={()=>{router.push('/')}}>Home</span>
          <span className="mb-2 text-sm text-neutral-400 hover:cursor-pointer" onClick={()=>{router.push('/courier')}}>Services</span>
          <span className="mb-2 text-sm text-neutral-400 hover:cursor-pointer" onClick={()=>{router.push('/about')}}>About Us</span>
          <span className="mb-2 text-sm text-neutral-400 hover:cursor-pointer" onClick={()=>{router.push('/contact')}}>Contact</span>
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg mb-4 text-neutral-500">SERVICES</h4>
          <span className="mb-2 text-sm text-neutral-400 hover:cursor-pointer" onClick={()=>{router.push('/Pickup-and-drop')}}>Same Day Pickup/Delivery</span>
          <span className="mb-2 text-sm text-neutral-400 hover:cursor-pointer" onClick={()=>{router.push('/courier')}}>Courier Delivery</span>
          <span className="mb-2 text-sm text-neutral-400 hover:cursor-pointer" onClick={()=>{router.push('/businesses')}}>Online Store Integration</span>
          <span className="mb-2 text-sm text-neutral-400 hover:cursor-pointer" onClick={()=>{router.push('/businesses')}}>Last-mile Delivery</span>
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg mb-4 text-neutral-500">REACH US AT</h4>
          <div className="flex items-center mb-2">
            <Image src="/images/yellowEnvelopestr.svg" alt="Email" width={24} height={24} />
            <span className="ml-2 text-sm text-neutral-400">contact@unicapp.in</span>
          </div>
          <div className="flex items-center mb-2">
            <Image src="/images/locationpin.svg" alt="Address" width={24} height={24} />
            <span className="ml-2 text-sm text-neutral-400">44, Backary portion, 2nd Floor, Regal Building,<br></br> Connaught Place, New Delhi -110001</span>
          </div>
          <div className="flex items-center">
            <Image src="/images/Instagram.svg" alt="Instagram" width={24} height={24} />
            <span className="ml-2 text-sm text-neutral-400">@unicapp.in</span>
          </div>
        </div>

        </div>
      </div>
      <div className="absolute top-32 right-36 w-80 h-80 transform translate-x-36 -translate-y-0.5 rotate-0">
        <Image src={'/images/ribbon84.svg'} alt="Ribbon" layout="fill" objectFit="contain" />
      </div>
      <div className="pt-4 text-start text-gray-400 text-sm translate-x-3">
        © 2023 Unicapp Logistics Pvt Ltd | CIN: U52219DL2023PTC416502
      </div>
    </div>
  )
}

export default Footer
