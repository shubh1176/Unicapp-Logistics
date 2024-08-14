import React from 'react'
import LeftDivAdd from './_components/LeftDivAdd'
import RightDivAdd from './_components/RightDivAdd'

function page({params}) {
  return (
    <div className='flex'>
      <div className='w-1/2  bg-gray-100 p-10'>
        <LeftDivAdd />
      </div>
      <div className='w-1/2'>
        <RightDivAdd />
      </div>
    </div>
  );
}

export default page