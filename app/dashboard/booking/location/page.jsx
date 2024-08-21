import React from 'react';
import LeftDiv from './_components/LeftDiv';
import RightDiv from './_components/RightDiv';

export default function page() {
  return (
    <div className='h-screen flex flex-col md:flex-row'>
      <div className='w-full md:w-1/2 bg-slate-100'>
        <LeftDiv />
      </div>
      <div className='w-full md:w-1/2'>
        <RightDiv />
      </div>
    </div>
  );
}
