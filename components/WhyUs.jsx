import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, Calendar, Headset, IndianRupee, Navigation, Navigation2, Route } from 'lucide-react';
import Image from 'next/image';

function WhyUs() {
  return (
    <div className="relative bg-[#202020] flex flex-col items-center gap-9 mb-7 pb-10">
      <div className="absolute inset-0 z-0 transform w-full h-full translate-y-80">
        <Image src={'/images/vecribbon.svg'} width={2000} height={200} alt="Ribbon Background" />
      </div>
      <span className='bg-[#394360] text-[#7CC4F8] rounded-lg py-2 px-8 font-generalMedium mt-24 z-10'>WHY US?</span>
      <div className="flex flex-col gap-2 mt-11 text-center z-10 -translate-y-10">
        <div>
          <span className='font-filson text-center text-6xl text-[#F6F6F6]'>Unicapp is simply </span><span className='font-filson text-center text-6xl text-[#FDDA02]'>better</span>
        </div>
        <span className='font-generalRegular text-white mt-1 text-2xl -translate-y-2'>Skip comparing companies and juggling couriers. </span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-48 mb-8 z-10'>
        <Card className="rounded-3xl content-center items-center">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-2'><Calendar className='-translate-y-0.5'/> Need for Speed</CardDescription>
            <CardTitle className='mt-5 font-generalMedium'>Same day delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight'>For businesses, we provide same day intracity deliveries, so that you can make your customers even happier!</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl content-center items-center">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-2'><IndianRupee className='-translate-y-0.5'/> Affordable</CardDescription>
            <CardTitle className='mt-5 font-generalMedium'>Value for money</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight'>We may not be the cheapest, but our prices are still lower than what's currently on the market.</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl content-center items-center">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-2'><Headset  className='-translate-y-0.5'/> Flexibility</CardDescription>
            <CardTitle className='mt-5 font-generalMedium'>24/7 Customer Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight'>We’re here 24/7 to resolve any shipment issues. If you’re a business, your customers can also reach out to us directly for package updates.</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl content-center items-center">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-2'><Route  className='-translate-y-0.5'/> Ease</CardDescription>
            <CardTitle className='mt-5 font-generalMedium'>Multiple drop-off points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight'>We value your time, so we provide multiple drop-off points, eliminating the need to book each shipment separately.</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl content-center items-center">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-2'><Navigation  className='-translate-y-0.5'/>  Track</CardDescription>
            <CardTitle className='mt-5 font-generalMedium'>Live tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-[#777777] font-generalLight'>Get a tracking link for your own updates and easily share it with your customers for their peace of mind.</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl content-center items-center">
          <CardHeader>
            <CardDescription className='flex flex-row gap-2 mb-2'><BadgeCheck  className='-translate-y-0.5'/>  Trusted</CardDescription>
            <CardTitle className='mt-5 font-generalMedium'>Verified Capptains</CardTitle>
          </CardHeader>
          <CardContent >
            <p className='text-[#777777] font-generalLight'>All our delivery executives, known as Capptains, undergo a thorough identity verification process to ensure your package is always in safe hands.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WhyUs;
