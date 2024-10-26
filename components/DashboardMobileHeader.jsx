import React from "react";
import Header2 from "./Header2";
import { useUser } from "@clerk/nextjs";

const DashboardMobileHeader = () => {
  const { user } = useUser();
  return (
    <div className="h-[190px] lg:hidden w-screen bg-[linear-gradient(270deg,#9E3CE1_0%,#56217B_100%)] rounded-b-[3rem]">
      <Header2 />
     
       
        <h1 className="text-3xl font-bold text-center text-white mt-5">
          Welcome {user?.firstName} 👋
        </h1>
      
    </div>
  );
};

export default DashboardMobileHeader;
