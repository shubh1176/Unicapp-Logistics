import React from 'react';
import Checkout from './_components/Checkout';
import Details from './_components/Details';

function Page() {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-full bg-white px-4 sm:px-6 lg:px-10 py-6 lg:py-10 gap-6 lg:gap-8">
      <div className="lg:w-1/2 w-full lg:h-full pt-2 bg-white lg:translate-y-0">
        <Details />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start bg-white">
        <Checkout />
      </div>
    </div>
  );
}

export default Page;
