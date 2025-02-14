import React from 'react';
import LeftDiv from './_components/LeftDiv';
import RightDiv from './_components/RightDiv';

export default function Page() {
  return (
    <div className='h-screen flex flex-col md:flex-row bg-[#F1EDEA] md:overflow-hidden'>
      <div className='w-full md:w-1/2 px-4 md:px-8 '>
        <LeftDiv />
      </div>
      <div className='w-full md:w-1/2 px-4 md:px-14  md:translate-x-20 md:bg-[#F8F8F8] md:overflow-y-scroll md:min-h-screen md:pt-10 '>
        <RightDiv />
      </div>
    </div>
  );
}
