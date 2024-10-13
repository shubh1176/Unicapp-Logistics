// pages/index.js (Home Page)
"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { FaArrowUp, FaArrowUpLong } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import GetEstimate from "@/components/GetEstimate";


// Load non-essential components lazily to improve loading performance
const Faq = dynamic(() => import("@/components/Faq"));
const Footer = dynamic(() => import("@/components/Footer"));
const OurServices = dynamic(() => import("@/components/OurServices"));
const WhyUs = dynamic(() => import("@/components/WhyUs"));
const TestimonialSection = dynamic(() =>
  import("@/components/TestimonialSection")
);
const MissionSection = dynamic(() => import("@/components/MissionSection"));

export default function Home() {
  const router = useRouter();

  return (
    <div className="max-w-screen  flex flex-col overflow-hidden xl:pb-6  gap-4 justify-center bg-[#F1EDEA]">
      <div className="relative">
        <Header />
        <div className="md:py-20 text-center bg-gradient-to-b h-auto md:h-[80vh] lg:h-[70vh] from-[#8D14CE] to-[#470A68] text-white pb-16 md:pb-24  rounded-br-[36px] rounded-bl-[36px] flex flex-col justify-center items-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="flex flex-col px-4  mb-1">
              <h1 className="text-[29px] leading-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-filson">
                <span className="bg-[#F5E27B] text-center pt-1 px-2 sm:pt-2 sm:px-3 lg:pt-3 lg:px-4 font-filson inline-flex rounded-lg lg:rounded-2xl text-[#202020]">
                  Deliver
                </span>{" "}
                any item, any time
              </h1>
              <h1 className="text-[29px] leading-[32px]  sm:text-4xl md:text-5xl lg:text-6xl font-filson">
                with just a few clicks!
              </h1>
            </div>
            <p className="text-center w-[60%] md:w-auto sm:mt-6 text-sm sm:text-lg md:text-xl lg:text-2xl font-generalLight">
              No need to step out, ship with ease using our{" "}
              <br className="hidden md:block" /> doorstep pickup and delivery
              service.
            </p>
          </div>
          {/* Input Fields and Get Estimate Button */}


          <div className="hidden md:block   hover:cursor-pointer">
            <Image 
              src={'/images/getEst.svg'} 
              width={90} 
              height={60} 
              className="w-24 h-16 md:w-48 md:h-28" 
              alt="Pickup" 
              onClick={() => router.push('/estimate')} 
              priority 
            />
          </div>
          <div className="md:hidden w-full px-20 max-w-md md:max-w-lg lg:max-w-xl mt-8 flex flex-col md:flex-row justify-between gap-1 font-montserrat">
            <div className="flex flex-col gap-1">
              <div className="relative w-full">
                {/* FaArrowUp Icon positioned inside the input */}
                <FaArrowUpLong className="absolute left-3 top-3  text-white" />
                <input
                  type="text"
                  placeholder="Pickup Location"
                  className="w-full p-3 pl-10 py-2 rounded-lg bg-[#FFFFFF80] placeholder:text-[#FFFFFF] placeholder:text-sm text-[#FFFFFF] text-md focus:outline-none focus:ring-2 focus:ring-[#F5E27B]"
                />
              </div>
              <div className="relative w-full">
                {/* FaArrowUp Icon positioned inside the input */}
                <FaArrowUpLong className="absolute left-3 top-3 text-white" />
                <input
                  type="text"
                  placeholder="Dropout Location"
                  className="w-full p-3 pl-10 py-2 rounded-lg bg-[#FFFFFF80] placeholder:text-[#FFFFFF] placeholder:text-sm text-[#FFFFFF] text-md focus:outline-none focus:ring-2 focus:ring-[#F5E27B]"
                />
              </div>
            </div>

            <button
              className="w-full md:w-auto bg-[#F5E27B] hover:bg-[#e8d06c] text-[#202020] text-sm md:text-auto font-semibold px-6 py-2 md:h-16 md:px-8 md:my-auto md:ml-2  rounded-lg transition-all duration-300"
              onClick={() => router.push("/estimate")}
            >
              Get an estimate
            </button>
          </div>
          {/* Responsive Image Loading and Positioning */}
          <div className="absolute top-40   sm:top-96 md:top-40 lg:top-32 left-8 sm:left-20 md:left-14 lg:left-52 w-12 sm:w-12 md:w-16 lg:w-24 h-12 sm:h-12 md:h-16 lg:h-24 transform -translate-x-1/2 rotate-0">
            <Image
              src={"/images/flower.png"}
              alt="Flower Bouquet"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 50px, (max-width: 768px) 75px, (max-width: 1024px) 100px, 150px"
            />
          </div>
          <div className="absolute top-56  sm:bottom-6 md:bottom-9 lg:top-[430px] left-6 sm:right-48 md:right-96 lg:left-[900px] w-8 sm:w-10 md:w-12 lg:w-16 h-8 sm:h-10 md:h-12 lg:h-16 transform translate-x-1/2 rotate-12">
            <Image
              src={"/images/lunchbox.png"}
              alt="Lunch Box"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 50px, (max-width: 768px) 75px, (max-width: 1024px) 100px, 150px"
            />
          </div>
          <div className="absolute bottom-14 sm:bottom-24 md:bottom-44 lg:bottom-52 lg:left-28 left-12 sm:left-20 md:left-32 w-8 sm:w-12 md:w-16 lg:w-16 h-8 sm:h-12 md:h-16 lg:h-16 transform -translate-x-1/2 rotate-12">
            <Image
              src={"/images/book.png"}
              alt="Book"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 50px, (max-width: 768px) 75px, (max-width: 1024px) 100px, 150px"
            />
          </div>
          <div className="absolute bottom-14 sm:bottom-8 md:bottom-10 right-0 sm:left-64 md:left-96 w-12 sm:w-16 md:w-20 lg:w-28 h-12 sm:h-16 md:h-20 lg:h-28 transform -translate-x-1/2 rotate-12">
            <Image
              src={"/images/charger.png"}
              alt="Charger"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, (max-width: 1024px) 100px, 150px"
            />
          </div>
          <div className="absolute top-52 sm:bottom-20 md:bottom-24 lg:top-[340px] right-6 sm:left-32 md:left-56 w-10 sm:w-12 md:w-16 lg:w-24 h-10 sm:h-12 md:h-16 lg:h-24 transform -translate-x-1/2 rotate-0">
            <Image
              src={"/images/drink.png"}
              alt="Coffee Cup"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, (max-width: 1024px) 100px, 150px"
            />
          </div>
          <div className="absolute top-40 sm:bottom-28 md:bottom-44 lg:top-60 right-0 sm:left-40 md:left-64 w-10 sm:w-12 md:w-16 lg:w-20 h-10 sm:h-12 md:h-16 lg:h-20 transform -translate-x-1/2 rotate-0">
            <Image
              src={"/images/Medicines1.png"}
              alt="Medicines"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, (max-width: 1024px) 100px, 150px"
            />
          </div>
          <div className="hidden md:block absolute top-20 sm:top-48 md:top-48 lg:top-36 right-24 sm:right-4 md:right-64 lg:right-44 w-10 sm:w-16 md:w-20 lg:w-28 h-10 sm:h-16 md:h-20 lg:h-28 transform translate-x-1/2 sm:translate-x-7 rotate-4">
            <Image
              src={"/images/dress.png"}
              alt="Dress"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 60px, (max-width: 768px) 100px, (max-width: 1024px) 150px, 200px"
            />
          </div>
          <div className="hidden md:block absolute top-32 sm:top-40 md:top-60 lg:top-64 right-16 sm:right-20 md:right-32 w-10 sm:w-12 md:w-16 lg:w-20 h-10 sm:h-12 md:h-16 lg:h-20 transform translate-x-1/2 rotate-0">
            <Image
              src={"/images/key.png"}
              alt="Key"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, (max-width: 1024px) 100px, 150px"
            />
          </div>
          <div className="absolute top-[300px] sm:bottom-20 md:bottom-28 left-[-10px] sm:right-32  lg:left-[980px] w-10 sm:w-12 md:w-16 lg:w-24 h-10 sm:h-12 md:h-16 lg:h-24 transform translate-x-1/2 rotate-0">
            <Image
              src={"/images/grocery.png"}
              alt="Grocery Basket"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, (max-width: 1024px) 100px, 150px"
            />
          </div>
          <div className="absolute md:hidden top-72 sm:top-80 md:top-96 right-8 sm:right-12 md:right-24 w-12 sm:w-10 md:w-12 lg:w-16 h-12 sm:h-10 md:h-12 lg:h-16 transform translate-x-1/2 rotate-0">
            <Image
              src={"/images/box.png"}
              alt="Box"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 50px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
            />
          </div>

          <div className="hidden md:block absolute  sm:bottom-8 md:bottom-8 lg:bottom-11 right-8 sm:right-12 md:right-24 lg:right-40 w-12 sm:w-10 md:w-12 lg:w-16 h-12 sm:h-10 md:h-12 lg:h-16 transform translate-x-1/2 rotate-0">
            <Image
              src={"/images/envelop.png"}
              alt="Box"
              fill
              objectFit="contain"
              priority
              sizes="(max-width: 640px) 50px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
            />
          </div>
          {/* <div className="mt-6 md:mt-10 hover:cursor-pointer">
            <Image
              src={"/images/getEst.svg"}
              width={90}
              height={60}
              className="w-24 h-16 md:w-48 md:h-28"
              alt="Pickup"
              onClick={() => router.push("/estimate")}
              priority
            />
          </div> */}
        </div>
      </div>

      {/* Eliminate unnecessary space */}
      <div className="bg-[#fefae060] rounded-sm">
        <OurServices />
      </div>

      <div>
        <WhyUs />
      </div>

      <MissionSection />
      {/* <div className="relative w-full gap-4 flex flex-col md:flex-row justify-center content-center items-center mt-10 mb-20">
        <div>
        <Image
            src={"/images/ourmission.png"}
            height={360}
            width={380}
            className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            loading="lazy"
            alt="Sticker"
          />
        </div>
        <div className="relative">
          <Image
            src={"/images/yellowCard.png"}
            height={350}
            width={380}
            className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            loading="lazy"
            alt="Sticker"
          />
          <div className="absolute bottom-[58px] sm:bottom-12 md:bottom-24 right-16 sm:right-16 md:right-24 lg:right-28 h-5 w-5 md:h-12 md:w-12">
            <Image
              src={"/images/iconblack.svg"}
              width={40} 
              height={40} 
              className="w-full h-full"
              alt="Black Icon"
            />
          </div>
        </div>
      </div> */}

      {/* <MissionSection /> */}
      <TestimonialSection />

      <div className="flex flex-col content-center items-center mt-10 xl:mt-20  xl:mb-40 mb-10">
        {" "}
        {/* Adjusted bottom margin */}
        <div>
          <span className="font-filson text-[#000000] text-3xl md:text-5xl">
            Wondering how to{" "}
          </span>
          <span className="font-filson text-[#9E3CE1] text-3xl md:text-5xl">
            use
          </span>
          <span className="font-filson text-[#000000] text-3xl md:text-5xl">
            {" "}
            it?
          </span>
        </div>
        <span className="font-generalRegular mb-5 md:mb-10 text-lg md:text-2xl mt-2 md:mt-5">
          Don't worry, it's easy ;)
        </span>
        <Image
          src={"/images/howtouse.png"}
          height={800}
          width={800}
          className="hidden lg:block  lg:w-[1100px]"
          loading="lazy"
          sizes="(max-width: 640px) 450px, (max-width: 1024px) 900px, 1100px"
        />
        <Image
          src={"/images/howtouse2.png"}
          height={800}
          width={800}
          className=" lg:hidden my-10 w-80  md:w-[28rem]  "
          loading="lazy"
          sizes="(max-width: 640px) 450px, (max-width: 1024px) 900px, 1100px"
        />
      </div>

     <GetEstimate />
  


      <div className="mt-10 md:mt-20 mb-10">
        <Faq />
      </div>

      <Footer />
    </div>
  );
}
