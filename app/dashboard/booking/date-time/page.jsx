import React from 'react';
import LeftDiv2 from './_components/LeftDiv2';
import RightDiv2 from './_components/RightDiv2';

function Page() {
  return (
    <div className="flex flex-col lg:gap-4 lg:flex-row h-auto lg:h-full bg-[#F1EDEA]">
      <div className="lg:w-1/2 w-full lg:h-full pt-2 lg:pb-28 lg:px-6 lg:pt-0 lg:mr-8 -mt-2">
        <LeftDiv2 />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-6 lg:px-12 pb-10 lg:pb-0 lg:items-center lg:-translate-y-40 lg:translate-x-20 lg:ml-8">
        <RightDiv2 />
      </div>
    </div>
  );
}

export default Page;
