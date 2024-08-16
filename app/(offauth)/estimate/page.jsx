"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronLeft, ChevronRight, CircleUserRound, WalletMinimal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import WhyUs from '@/components/WhyUs';
import Footer from '@/components/Footer';
import Faq from '@/components/Faq';
import EstimateComponent from '@/components/Estimate';
import { UserButton, useUser } from '@clerk/clerk-react';

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const items = [
    { src: "/images/envelop.svg", label: "Documents", height: 80, width: 80},
    { src: "/images/charger.svg", label: "Charger",  height: 80, width: 80},
    { src: "/images/Medicines1.svg", label: "Medicines", height: 80, width: 80 },
    { src: "/images/flowerrr8.svg", label: "Flowers", height: 80, width: 80 },
    { src: "/images/20.svg", label: "Courier", height: 80, width: 80 },
    { src: "/images/key.svg", label: "Keys", height: 80, width: 80 },
    { src: "/images/dress.svg", label: "Clothes", height: 80, width: 80 },
    { src: "/images/lunchbox.svg", label: "Tiffin", height: 80, width: 80 },
    { src: "/images/book.svg", label: "Books", height: 80, width: 80 },
    { src: "/images/grocery.svg", label: "Store Pickups", height: 80, width: 80 },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  return (
    <div className='bg-[#F1EDEA] pt-1'>
      <div className="bg-gradient-to-r flex justify-between items-center px-4 rounded-xl m-5">
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
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
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
            <DropdownMenuTrigger className="flex items-center gap-1 text-black text-lg p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
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
      <div className=' mt-16'>
        <EstimateComponent />

        <div className='bg-white rounded-3xl mx-auto mt-72 p-8 relative overflow-hidden h-full py-20' style={{ maxWidth: '85%'}}>
        <div className="absolute inset-0 z-0">
          <Image src={'/images/another_ribbon.svg'} layout="fill" objectFit="cover" alt="Ribbon Background" />
        </div>
        <div className='translate-y-4'>
        <h2 className='font-generalSemiBold text-5xl mb-4 z-10 relative -translate-y-10 translate-x-4'>We deliver, all your needs.</h2>
        <h2 className='z-10 relative font-generalRegular text-2xl -translate-y-8 translate-x-4'>Anything you want to move from A to B.</h2>

        {/* Navigation buttons at top-right */}
        <div className="absolute top-1 right-1 flex gap-2 z-20">
          <button
            className="bg-white rounded-full border-2 p-2 -translate-y-6 -translate-x-4"
            onClick={handlePrev}
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={26} />
          </button>
          <button
            className="bg-[#9E3CE1] rounded-full border-2 p-2 text-white -translate-y-6 -translate-x-4"
            onClick={handleNext}
            disabled={currentSlide === items.length - 1}
          >
            <ChevronRight size={26} />
          </button>
        </div>

        <div className='relative mt-6 z-10 ml-3'>
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            infinite={true}  // Enables infinite scrolling
            autoPlay={false}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500} // Smoother transition duration
            keyBoardControl={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
            afterChange={(previousSlide, { currentSlide }) => setCurrentSlide(currentSlide)}
          >
            {items.map((item, index) => (
              <div key={index} className="flex-none w-full p-1">
                <div className="p-1 bg-[#F6EFF9] rounded-3xl h-52 w-52 transform transition-transform duration-300 hover:scale-105">
                  <div className="flex flex-col items-center p-3 gap-3">
                    <Image src={item.src} height={item.height} width={item.width} alt={item.label} className="pt-5"/>
                    <span className='pt-8 text-xl font-generalRegular'>{item.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        </div>
      </div>
      <div className='mt-16'>
        <WhyUs />
      </div>
      <div className="relative flex flex-col content-center items-center mt-20 mb-28">
        <div className="relative">
          <Image src={'/images/sticker.svg'} height={800} width={1000} />
          <div className="absolute bottom-40 right-60 w-20 h-20 transform translate-x-1/2 rotate-0">
            <Image src={'/images/iconblack.svg'} height={80} width={80} />
          </div>
        </div>
      </div>
      <div>
        <Faq />
      </div>
      <Footer />
      </div>

     
    </div>
  );
}
