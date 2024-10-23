import React from 'react';
import LeftDivAdd from './_components/LeftDivAdd';
import RightDivAdd from './_components/RightDivAdd';

function Page() {
  return (
    <div className="flex flex-col md:gap-4 lg:flex-row h-auto lg:h-full bg-[#F1EDEA]">
      <div className="lg:w-1/2 w-full md:w-1/2 lg:h-full md:pt-2 md:pb-28 lg:px-6 lg:pt-0 lg:mr-8 md:-mt-2">
        <LeftDivAdd />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-6 lg:px-10 pb-10 lg:pb-0 lg:items-center lg:-translate-y-40">
        <RightDivAdd />
      </div>
    </div>
  );
}

export default Page;
