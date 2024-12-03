import React from 'react';
import LeftDiv3 from './_components/LeftDiv3';
import RightDiv3 from './_components/RightDiv3';
import BookingLeftDiv from '@/components/BookingLeftDiv';

function Page() {
  return (
    <div className="flex flex-col lg:gap-4 lg:flex-row h-auto lg:min-h-screen bg-[#F1EDEA] lg:overflow-hidden">
      <div className="lg:w-1/2 w-full md:w-1/2   lg:pb-0 lg:px-6 lg:pt-0 lg:mr-8 ">
        <BookingLeftDiv />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-6 lg:px-14 pb-10 lg:pb-0   lg:translate-x-20 lg:bg-[#F8F8F8] lg:overflow-y-scroll  pt-10   ">
        <RightDiv3 />
      </div>
    </div>
  );
}

export default Page;
