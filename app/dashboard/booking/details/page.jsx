import React from 'react'
import LeftDiv3 from './_components/LeftDiv3'
import RightDiv3 from './_components/RightDiv3'

function page() {
  return (
    <div className='flex'>
      <div className='w-1/2 bg-gray-100 p-10'>
        <LeftDiv3 />
      </div>
      <div className='w-1/2'>
        <RightDiv3 />
      </div>
    </div>
  )
}

export default page