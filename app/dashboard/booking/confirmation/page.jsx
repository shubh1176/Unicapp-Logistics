import React from 'react';
import LeftDiv5 from './_components/LeftDiv5';
import RightDiv5 from './_components/RightDiv5';

function Page() {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-full bg-white">
      <div className="lg:w-1/2 w-full lg:h-full pt-2 sm:pb-28 px-6 bg-white lg:translate-y-0 lg:mr-8">
        <LeftDiv5 />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-6 lg:px-10 bg-white pb-10">
        <RightDiv5 />
      </div>
    </div>
  );
}

export default Page;
