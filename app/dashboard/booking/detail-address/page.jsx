import React from 'react';
import LeftDivAdd from './_components/LeftDivAdd';
import RightDivAdd from './_components/RightDivAdd';

function page({ params }) {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
      <div className="lg:w-1/2 w-full p-10 sm:-translate-y-11 bg-white">
        <LeftDivAdd />
      </div>
      <div className="lg:w-1/2 w-full bg-white">
        <RightDivAdd />
      </div>
    </div>
  );
}

export default page;
