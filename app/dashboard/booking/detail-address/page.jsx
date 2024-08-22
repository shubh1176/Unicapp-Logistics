import React from 'react';
import LeftDivAdd from './_components/LeftDivAdd';
import RightDivAdd from './_components/RightDivAdd';

function Page() {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-full bg-white ">
      <div className="lg:w-1/2 w-full p-10 lg:h-full pt-20 pb-20 bg-white lg:-translate-y-20">
        <LeftDivAdd />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start pr-20 bg-white lg:-translate-y-48 sm:pl-32">
        <RightDivAdd />
      </div>
    </div>
  );
}

export default Page;
