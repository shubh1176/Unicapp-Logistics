import React from 'react'
import LeftDiv4 from './_components/LeftDiv4'
import RightDiv4 from './_components/RightDiv4'


function page() {
  return (
    <div className='flex'>
      <div className='w-1/2  bg-gray-100 p-10'>
        <LeftDiv4 />
      </div>
      <div className='w-1/2 '>
        <RightDiv4 />
      </div>
    </div>
  )
}

export default page