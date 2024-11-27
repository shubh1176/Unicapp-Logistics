"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import {  useUser } from "@clerk/clerk-react";
import Header2 from "@/components/Header2";
import GetEstimate from "@/components/GetEstimate";
import Header3 from "@/components/Header3";

const AboutUs = () => {
  const router = useRouter();
  const { user } = useUser();
  return (
    <div className="bg-[#F1EDEA]  max-w-screen overflow-hidden pt-0 lg:pb-4 ">
      <div >
        <Header3 />
      </div>
      {/* <div className="block lg:hidden">
        <Header2 />
      </div> */}

      <div className="flex flex-col items-center px-4 lg:px-20">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-14 w-full">
          {/* Left Side */}
          <div className="lg:w-1/2 px-4  lg:px-24 md:-translate-y-10">
            <div className="mt-10 md:mt-40">
              <div className="flex flex-row items-center gap-2 lg:gap-3">
                <span className="text-4xl lg:text-6xl font-generalMedium">
                  About
                </span>
                <span className="font-semibold text-4xl lg:text-6xl tracking-tight">
                  unicapp
                </span>
              </div>
              <div className="mt-2 text-lg">
                <span>We’re here to deliver — any item, any time.</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col mt-8 lg:mt-14 px-4 text-start">
            <span className="text-[#0000008c] text-lg lg:text-2xl font-generalMedium mb-6 lg:mb-12">
              At Unicapp, we’re all about making your life and business run
              smoother than a perfectly brewed cup of coffee on a Monday
              morning. Whether you’re an individual with a last-minute gift to
              send or a business needing to streamline operations, we’ve got the
              magic touch to get it done. Think of us as your reliable sidekick
              in the world of pickup, delivery, and courier services—ready to
              swoop in and save the day, every day.
            </span>
            <div className="mt-6 lg:mt-10">
              <h2 className="text-2xl lg:text-3xl font-generalMedium mb-2 lg:mb-4">
                Deliveries for on-demand needs
              </h2>
              <span className="text-[#0000008c] text-base lg:text-xl font-generalMedium">
                Our on-demand delivery service is like having a personal courier
                at your beck and call. Got an urgent need? No problem! We handle
                everything from picking up your package to delivering it swiftly
                and safely, even when you’re in a pinch. Imagine the peace of
                mind knowing that Unicapp has your back, whether it’s sending a
                forgotten document or a surprise birthday gift. We make it
                happen, and we make it happen fast.
              </span>
            </div>
            <div className="mt-10 lg:mt-16">
              <h2 className="text-2xl lg:text-3xl font-generalMedium mb-2 lg:mb-4">
                Deliveries for businesses
              </h2>
              <span className="text-[#0000008c] text-base lg:text-xl font-generalMedium">
                We see you too! Our intercity courier services are designed to
                take the stress out of logistics. With our dedicated business
                portal, you can track shipments in real-time, integrate
                seamlessly with your online store, and manage all your
                deliveries from one super cool dashboard. It’s like having a
                personal assistant who never sleeps. Experience the efficiency
                and reliability of Unicapp, and watch your business thrive.
              </span>
            </div>
          </div>
        </div>

        {/* Estimate Section */}
        <div className="my-20 lg:my-32 w-full">
          <GetEstimate />
        </div>
      </div>

      {/* Footer */}
      <div className=" md:mb-5 lg:mb-0">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
