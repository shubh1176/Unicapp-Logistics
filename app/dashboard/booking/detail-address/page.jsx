import React from 'react';
import LeftDivAdd from './_components/LeftDivAdd';
import RightDivAdd from './_components/RightDivAdd';

function Page() {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-full bg-white ">
      <div className="lg:w-1/2 w-full lg:h-full pt-2 pb-20 px-6 bg-white lg:-translate-y-5">
        <LeftDivAdd />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start pl-10 bg-white -translate-y-52">
        <RightDivAdd />
      </div>
    </div>
  );
}

export default Page;
