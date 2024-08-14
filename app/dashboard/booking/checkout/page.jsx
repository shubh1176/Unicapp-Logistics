import React from 'react'
import Checkout from './_components/Checkout'
import Details from './_components/Details'

function page() {
  return (
    <div className='flex'>
      <div className='w-1/2  bg-gray-100 p-10'>
        <Details />
      </div>
      <div className='w-1/2'>
        <Checkout />
      </div>
    </div>
  )
}

export default page