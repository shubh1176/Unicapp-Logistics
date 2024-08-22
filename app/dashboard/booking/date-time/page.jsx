import React from 'react';
import LeftDiv2 from './_components/LeftDiv2';
import RightDiv2 from './_components/RightDiv2';

function Page() {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-full bg-white">
      <div className="lg:w-1/2 w-full lg:h-full pt-2 sm:pb-28 px-6 bg-white lg:translate-y-0 lg:mr-8">
        <LeftDiv2 />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-6 lg:px-10 bg-white">
        <RightDiv2 />
      </div>
    </div>
  );
}

export default Page;
