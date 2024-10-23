import React from 'react';
import Checkout from './_components/Checkout';
import Details from './_components/Details';

function Page() {
  return (
    <div className="flex flex-col lg:gap-4 lg:flex-row h-auto lg:h-full bg-[#F1EDEA]">
      <div className="lg:w-1/2 w-full lg:h-full pt-2 lg:pb-28 lg:px-6 lg:pt-0 lg:mr-8 -mt-2">
        <Details />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-6 lg:px-12 pb-10 lg:pb-0 lg:items-center lg:-translate-y-56 lg:ml-8">
        <Checkout />
      </div>
    </div>
  );
}

export default Page;
