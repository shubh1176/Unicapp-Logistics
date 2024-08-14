import React from 'react'
import LeftDiv2 from './_components/LeftDiv2'
import RightDiv2 from './_components/RightDiv2'

function page({params}) {
  return (
    <div className='flex'>
      <div className='w-1/2  bg-gray-100 p-10'>
        <LeftDiv2 />
      </div>
      <div className='w-1/2'>
        <RightDiv2 />
      </div>
    </div>
  );
}

export default page