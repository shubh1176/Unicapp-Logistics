import React from 'react';
import LeftDiv5 from './_components/LeftDiv5';
import RightDiv5 from './_components/RightDiv5';

function Page() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row h-auto lg:h-full bg-[#F1EDEA]">
      <div className="lg:w-1/2 w-full lg:h-full pt-2 sm:pb-28 px-6 lg:pt-0 lg:mr-8 -mt-2">
        <LeftDiv5 />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-6 lg:px-12 pb-10 lg:pb-0 lg:items-center lg:-translate-y-40 lg:translate-x-20 lg:ml-8">
        <RightDiv5 />
      </div>
    </div>
  );
}

export default Page;
