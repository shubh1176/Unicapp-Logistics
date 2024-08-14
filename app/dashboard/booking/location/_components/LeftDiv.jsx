import React from 'react'

function LeftDiv() {
  return (
    <div className='flex flex-col justify-center items-start h-full p-10 gap-3 ml-40'>
      <div className='-translate-y-20 translate-x-1'>
      <div className='mb-2 -translate-x-12 translate-y-6'>
        <img src='/images/blackonwhitelogo.svg' alt='unicapp' />
      </div>
      <div className='mb-10'>
        <h1 className='text-3xl font-generalSemiBold'>One-stop solution for</h1>
        <h1 className='text-3xl font-generalSemiBold'>all your delivery needs</h1>
        <p className='mt-4 text-lg font-generalRegular'>Unicapp is the easiest way to move anything. Fully</p>
        <p className='text-lg font-generalRegular'>insured. On time. Arriving in as little as 30 minutes.</p>
      </div>
      <ul className='list-none'>
        <li className='flex items-center mb-3 font-generalMedium'>
          <span className='flex items-center justify-center w-6 h-6 mr-2 font-bold text-black bg-[#D9D9D9] rounded-full'>1</span> Book your pickup
        </li>
        <li className='flex items-center mb-3 font-generalMedium'>
          <span className='flex items-center justify-center w-6 h-6 mr-2 font-bold text-black bg-[#D9D9D9] rounded-full'>2</span> We’ll take it from here
        </li>
        <li className='flex items-center mb-3 font-generalMedium'>
          <span className='flex items-center justify-center w-6 h-6 mr-2 font-bold text-black bg-[#D9D9D9] rounded-full'>3</span> Leave a review for a job well done
        </li>
      </ul>
        
      </div>
    </div>
  )
}

export default LeftDiv
