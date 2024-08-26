import React from 'react';
import LeftDiv from './_components/LeftDiv';
import RightDiv from './_components/RightDiv';

export default function Page() {
  return (
    <div className='h-screen flex flex-col md:flex-row bg-[#F1EDEA]'>
      <div className='w-full md:w-1/2 px-4 md:px-8'>
        <LeftDiv />
      </div>
      <div className='w-full md:w-1/2 px-4 md:px-8 md:ml-auto md:translate-x-20'>
        <RightDiv />
      </div>
    </div>
  );
}
