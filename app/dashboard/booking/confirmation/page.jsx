import React from 'react'
import LeftDiv5 from './_components/LeftDiv5'
import RightDiv5 from './_components/RightDiv5'

function page({params}) {
  return (
    <div className='flex'>
      <div className='w-1/2  bg-gray-100 p-10'>
        <LeftDiv5 />
      </div>
      <div className='w-1/2'>
        <RightDiv5 />
      </div>
    </div>
  );
}

export default page