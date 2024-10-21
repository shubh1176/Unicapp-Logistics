import React from 'react';
import LeftDiv4 from './_components/LeftDiv4';
import RightDiv4 from './_components/RightDiv4';

function Page() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row h-auto lg:h-full bg-[#F1EDEA]">
      <div className="lg:w-1/2 w-full lg:h-full pt-2 sm:pb-28 md:px-6 lg:pt-0 lg:mr-8 -mt-2">
        <LeftDiv4 />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-6 lg:px-12 pb-10 lg:pb-0 lg:items-center lg:-translate-y-48 lg:ml-8">
        <RightDiv4 />
      </div>
    </div>
  );
}

export default Page;
