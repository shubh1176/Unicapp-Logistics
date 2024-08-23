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
      {/* RightDiv5 takes full width on small screens and half width on large screens */}
      <div className="lg:w-1/2 w-full h-screen flex items-center justify-center px-6 lg:px-10 bg-white">
        <div className="mt-[-96px] lg:mt-0"> {/* Move RightDiv5 slightly up on small screens */}
          <RightDiv5 />
        </div>
      </div>
    </div>
  );
}

export default Page;
