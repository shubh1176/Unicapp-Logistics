import React from 'react';
import LeftDivAdd from './_components/LeftDivAdd';
import RightDivAdd from './_components/RightDivAdd';

function page({ params }) {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen bg-white">
      <div className="lg:w-1/2 w-full p-10 lg:h-[70vh] pt-20 pb-20">
        <LeftDivAdd />
      </div>
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-start px-5 lg:pr-20">
        <RightDivAdd />
      </div>
    </div>
  );
}

export default page;