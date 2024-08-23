import React from 'react';
import LeftDiv5 from './_components/LeftDiv5';
import RightDiv5 from './_components/RightDiv5';

function Page() {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-full bg-white">
      {/* Hide LeftDiv5 on small screens and show it on large screens */}
      <div className="hidden lg:block lg:w-1/2 lg:h-full pt-2 sm:pb-28 px-6 bg-white lg:translate-y-0 lg:mr-8">
        <LeftDiv5 />
      </div>
      <div className="lg:w-1/2 w-full h-screen lg:h-full flex items-center justify-center px-6 lg:px-10 lg:pt-32 bg-white">
        <RightDiv5 />
      </div>
    </div>
  );
}

export default Page;
