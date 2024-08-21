import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, Calendar, Headset, IndianRupee, Navigation, Route } from 'lucide-react';
import Image from 'next/image';

function WhyUs() {
  return (
    <div className="relative bg-[#202020] flex flex-col items-center gap-6 sm:gap-8 md:gap-9 mb-7 pb-10">
      {/* Responsive Ribbon Background */}
      <div className="absolute inset-0 z-0 transform w-full h-20 sm:h-32 md:h-40 lg:h-60 translate-y-10 md:translate-y-20">
        <Image src={'/images/vecribbon.svg'} layout="fill" objectFit="cover" alt="Ribbon Background" />
      </div>

      <span className='bg-[#394360] text-[#7CC4F8] rounded-lg py-1 px-4 sm:px-6 md:px-8 font-generalMedium mt-20 sm:mt-24 z-10 text-sm sm:text-base md:text-lg'>
        WHY US?
      </span>
      
      <div className="flex flex-col gap-1 sm:gap-2 mt-9 sm:mt-11 text-center z-10 -translate-y-8 sm:-translate-y-10">
        <div>
          <span className='font-filson text-center text-3xl sm:text-4xl md:text-6xl text-[#F6F6F6]'>Unicapp is simply </span>
          <span className='font-filson text-center text-3xl sm:text-4xl md:text-6xl text-[#FDDA02]'>better</span>
        </div>
        <span className='font-generalRegular text-white mt-1 text-base sm:text-lg md:text-2xl -translate-y-1 sm:-translate-y-2'>
          Skip comparing companies and juggling couriers.
        </span>
      </div>

      {/* Responsive Grid Layout for Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-4 sm:mx-8 md:mx-24 lg:mx-48 mb-8 z-10'>
        <Card className="rounded-2xl sm:rounded-3xl content-center items-center p-3 sm:p-5 md:p-6">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg'>
              <Calendar className='-translate-y-0.5' /> Need for Speed
            </CardDescription>
            <CardTitle className='mt-3 sm:mt-4 md:mt-5 font-generalMedium text-base sm:text-lg md:text-xl'>
              Same day delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight text-xs sm:text-sm md:text-base'>
              For businesses, we provide same day intracity deliveries, so that you can make your customers even happier!
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl sm:rounded-3xl content-center items-center p-3 sm:p-5 md:p-6">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg'>
              <IndianRupee className='-translate-y-0.5' /> Affordable
            </CardDescription>
            <CardTitle className='mt-3 sm:mt-4 md:mt-5 font-generalMedium text-base sm:text-lg md:text-xl'>
              Value for money
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight text-xs sm:text-sm md:text-base'>
              We may not be the cheapest, but our prices are still lower than what's currently on the market.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl sm:rounded-3xl content-center items-center p-3 sm:p-5 md:p-6">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg'>
              <Headset className='-translate-y-0.5' /> Flexibility
            </CardDescription>
            <CardTitle className='mt-3 sm:mt-4 md:mt-5 font-generalMedium text-base sm:text-lg md:text-xl'>
              24/7 Customer Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight text-xs sm:text-sm md:text-base'>
              We’re here 24/7 to resolve any shipment issues. If you’re a business, your customers can also reach out to us directly for package updates.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl sm:rounded-3xl content-center items-center p-3 sm:p-5 md:p-6">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg'>
              <Route className='-translate-y-0.5' /> Ease
            </CardDescription>
            <CardTitle className='mt-3 sm:mt-4 md:mt-5 font-generalMedium text-base sm:text-lg md:text-xl'>
              Multiple drop-off points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight text-xs sm:text-sm md:text-base'>
              We value your time, so we provide multiple drop-off points, eliminating the need to book each shipment separately.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl sm:rounded-3xl content-center items-center p-3 sm:p-5 md:p-6">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg'>
              <Navigation className='-translate-y-0.5' /> Track
            </CardDescription>
            <CardTitle className='mt-3 sm:mt-4 md:mt-5 font-generalMedium text-base sm:text-lg md:text-xl'>
              Live tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight text-xs sm:text-sm md:text-base'>
              Get a tracking link for your own updates and easily share it with your customers for their peace of mind.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl sm:rounded-3xl content-center items-center p-3 sm:p-5 md:p-6">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg'>
              <BadgeCheck className='-translate-y-0.5' /> Trusted
            </CardDescription>
            <CardTitle className='mt-3 sm:mt-4 md:mt-5 font-generalMedium text-base sm:text-lg md:text-xl'>
              Verified Capptains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight text-xs sm:text-sm md:text-base'>
              All our delivery executives, known as Capptains, undergo a thorough identity verification process to ensure your package is always in safe hands.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WhyUs;
