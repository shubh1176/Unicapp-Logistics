import Image from 'next/image';
import React from 'react';

function LeftDiv() {
  return (
    <div className='flex flex-col justify-start items-start h-full pt-24 md:pt-12 px-6 md:px-16 gap-3 bg-gradient-to-b from-[#8D14CE] to-[#470A68] rounded-b-2xl w-full md:bg-none md:relative md:left-20 md:top-20'>
      <div className='-translate-y-10 md:translate-y-0 md:translate-x-1'>
        {/* Conditionally render the logo for small screens */}
        <div className='block md:hidden mb-5 -ml-9 -mt-12'>
          <Image src='/images/yellowonwhite.svg' height={200} width={200} alt="Unicapp Logo" />
        </div>
        {/* Conditionally render the logo for medium and larger screens */}
        <div className='hidden md:block mb-2 -translate-x-4 translate-y-6 md:-translate-x-12'>
          <img src='/images/blackonwhitelogo.svg' alt='Unicapp' className="w-24 md:w-64" />
        </div>
        <div className='mb-4 md:mb-10 text-left -mt-9 md:mt-0'>
        <h1 className='text-xl md:text-3xl font-filson text-white md:text-current leading-relaxed md:leading-normal'>
          One-stop solution for
        </h1>
        <h1 className='text-xl md:text-3xl font-filson text-white md:text-current leading-relaxed md:leading-normal'>
          all your delivery needs
        </h1>
          {/* Hide these paragraphs on small screens */}
          <p className='hidden md:block mt-2 md:mt-4 text-sm md:text-lg font-generalRegular'>
            Unicapp is the easiest way to move anything. Fully
          </p>
          <p className='hidden md:block text-sm md:text-lg font-generalRegular'>
            insured. On time. Arriving in as little as 30 minutes.
          </p>
        </div>
        <ul className='list-none hidden md:block'>
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
