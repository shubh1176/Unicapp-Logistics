import React from 'react';
import LeftDiv from './_components/LeftDiv';
import RightDiv from './_components/RightDiv';

export default function page() {
  return (
    <div className='h-screen flex flex-col md:flex-row'>
      <div className='w-full md:w-1/2 pl-8'>
        <LeftDiv />
      </div>
      <div className='w-full md:w-1/2 pb-10 bg-white'>
        <RightDiv />
      </div>
    </div>
  );
}
