"use client"
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

function LeftDiv() {
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center items-end  h-full pt-24 md:pt-0 px-6 md:px-0 gap-3 bg-gradient-to-b from-[#8D14CE] to-[#470A68] rounded-b-2xl w-full md:bg-none '>
      <div className='-translate-y-10 md:translate-y-0 md:translate-x-1  max-w-sm w-full'>
        {/* Conditionally render the logo for small screens */}
        <div onClick={()=>router.push("/")} className='block md:hidden mb-5 -ml-9 -mt-12'>
          <Image src='/images/yellowonwhite.svg' height={200} width={200} alt="Unicapp Logo" />
        </div>
        {/* Conditionally render the logo for medium and larger screens */}
        <div onClick={()=>router.push("/")} className='hidden md:block  -translate-x-4  md:-translate-x-12 translate-y-5'>
          <Image src='/images/blackonwhitelogo.svg' alt='Unicapp' height={200} width={200} className="w-24 md:w-64 h-36 laptop:h-44 laptop:w-72" />
        </div>
        <div className='mb-4 md:mb-5 text-left  md:mt-0'>
        <h1 className='text-xl md:text-xl laptop:text-2xl font-filson text-white md:text-current leading-relaxed md:leading-normal'>
          One-stop solution for all
        </h1>
        <h1 className='text-xl md:text-xl laptop:text-2xl font-filson text-white md:text-current leading-relaxed md:leading-normal'>
          your delivery needs
        </h1>
          {/* Hide these paragraphs on small screens */}
          <p className='hidden md:block mt-2 md:mt-4 text-sm md:text-sm laptop:text-base font-generalRegular max-w-[16rem]'>
            Unicapp is the easiest way to move anything. Fully insured. On time. Arriving in as little as 30 minutes.
          </p>
          {/* <p className='hidden md:block text-sm md:text-sm font-generalRegular max-w-xs'>
            
          </p> */}
        </div>
        <ul className='list-none hidden md:block text-xs laptop:text-sm'>
          <li className='flex items-center mb-3 font-generalMedium'>
            <span className='flex items-center justify-center w-5 h-5 mr-2 font-bold text-black bg-[#D9D9D9] rounded-full'>1</span> Book your pickup
          </li>
          <li className='flex items-center mb-3 font-generalMedium'>
            <span className='flex items-center justify-center w-5 h-5 mr-2 font-bold text-black bg-[#D9D9D9] rounded-full'>2</span> We’ll take it from here
          </li>
          <li className='flex items-center mb-3 font-generalMedium'>
            <span className='flex items-center justify-center w-5 h-5 mr-2 font-bold text-black bg-[#D9D9D9] rounded-full'>3</span> Leave a review for a job well done
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftDiv;
