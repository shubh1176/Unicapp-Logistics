import React from 'react';
import Checkout from './_components/Checkout';
import Details from './_components/Details';


function Page() {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-full bg-white">
      <div className="lg:w-1/2 w-full lg:h-full pt-2 sm:pb-28 px-6 bg-white lg:translate-y-0 lg:mr-8">
        <Details />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-6 lg:px-10 bg-white pb-10">
        <Checkout />
      </div>
    </div>
  );
}

export default Page;
