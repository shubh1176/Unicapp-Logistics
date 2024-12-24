"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  WalletMinimal,
} from "lucide-react";
import {
  pickupLocationState,
  dropLocationState,
  pickupCoordsState,
  dropCoordsState,
  isPickupDialogOpenState,
  isDropDialogOpenState,
} from "@/recoil/store";
import { useRouter } from "next/navigation";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import EstimateComponent from "@/components/Estimate";
import { UserButton, useUser } from "@clerk/clerk-react";
import Header2 from "@/components/Header2";
import { useRecoilValue } from "recoil";
import MissionSection from "@/components/MissionSection";
import MobileEstimateComponent from "@/components/MobileEstimateComponent";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const pickupAdressValue = useRecoilValue(pickupLocationState);
  const dropAdressValue = useRecoilValue(dropLocationState);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const [weight, setWeight] = useState(0);
  console.log(user);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const email = user.primaryEmailAddress.emailAddress;
          const fetchedUser = await db
            .select()
            .from(schema.UserData)
            .where(eq(schema.UserData.email, email))
            .then((result) => result[0]);

          if (fetchedUser) {
            setPhoneNumber(fetchedUser.phoneNumber);
            setVerified(fetchedUser.verified);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    setUserName(user?.fullName || "");

    fetchUserData();
  }, [user, setPhoneNumber, setVerified]);

  const items = [
    { src: "/images/envelop.svg", label: "Documents", height: 80, width: 80 },
    { src: "/images/charger.svg", label: "Charger", height: 80, width: 80 },
    {
      src: "/images/Medicines1.svg",
      label: "Medicines",
      height: 80,
      width: 80,
    },
    { src: "/images/flowerrr8.svg", label: "Flowers", height: 80, width: 80 },
    { src: "/images/20.svg", label: "Courier", height: 80, width: 80 },
    { src: "/images/key.svg", label: "Keys", height: 80, width: 80 },
    { src: "/images/dress.svg", label: "Clothes", height: 80, width: 80 },
    { src: "/images/lunchbox.svg", label: "Tiffin", height: 80, width: 80 },
    { src: "/images/book.svg", label: "Books", height: 80, width: 80 },
    {
      src: "/images/grocery.svg",
      label: "Store Pickups",
      height: 80,
      width: 80,
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  return (
    <>
      <div className="bg-[#F1EDEA]  hidden lg:block">
        <div className="bg-gradient-to-r flex justify-between items-center px-4 rounded-xl mt-0 m-5 -translate-y-4">
          <div>
            <Image
              src={"/images/blackonwhitelogo.svg"}
              width={200}
              height={50}
              alt="Logo"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-black hover:bg-[#E5D5E6] text-lg hover: rounded-xl"
              onClick={() => router.push("/")}
            >
              Home
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-black text-lg hover:cursor-pointer ">
                Services <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
                <DropdownMenuItem
                  className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => router.push("/Pickup-and-drop")}
                >
                  Pickup & Drop
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => router.replace("/courier")}
                >
                  Intercity Courier
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  API Integration
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  Last-mile Delivery
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              className="text-black hover:bg-[#E5D5E6] text-lg"
              onClick={() => router.push("/businesses")}
            >
              For business
            </Button>
            <Button
              variant="ghost"
              className="text-black hover:bg-[#E5D5E6] text-lg"
              onClick={() => router.push("/about")}
            >
              About us
            </Button>
            <Button
              variant="ghost"
              className="text-black hover:bg-[#E5D5E6] text-lg"
              onClick={() => router.push("/contact")}
            >
              Contact
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center space-x-4 border-2 rounded-lg py-0 px-3 ">
                <UserButton />
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-black text-lg p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-black focus:outline-none">
                    {user.fullName || "Guest"} <ChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
                    <DropdownMenuItem
                      className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2"
                      onClick={() => router.push("/dashboard")}
                    >
                      <CircleUserRound />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2"
                      onClick={() => router.push("/dashboard/wallet")}
                    >
                      <WalletMinimal />
                      Wallet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex flex-row gap-2 mr-6">
                <Button
                  variant="ghost"
                  className="text-black hover:bg-[#fefae060] hover:bg-opacity-20 hover:text-black text-md"
                  onClick={() => router.replace("/dashboard")}
                >
                  Log In
                </Button>
                <Button
                  className="text-white bg-[#9E3CE1] hover:border-2 hover:outline-2 hover:bg-[#fefae060] hover:border-[#9E3CE1] hover:text-black text-md"
                  onClick={() => router.replace("/dashboard")}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className=" mt-10 lg:mt-0 lg:-translate-y-6 ">
          <EstimateComponent />

          <div
            className="bg-white rounded-3xl mx-auto mt-20 p-8 relative overflow-hidden h-full py-20"
            style={{ maxWidth: "85%" }}
          >
          <div className="absolute inset-0 z-0 top-14 ">
          <Image src={'/images/another_ribbon.svg'} width={1600} height={1000}  layout="cover" objectFit="cover" alt="Ribbon Background" />
        </div>
            <div className="translate-y-4">
              <h2 className="font-generalSemiBold text-5xl mb-4 z-10 relative -translate-y-10 translate-x-4">
                We deliver, all your needs.
              </h2>
              <h2 className="z-10 relative font-generalRegular text-2xl -translate-y-8 translate-x-4">
                Anything you want to move from A to B.
              </h2>

              {/* Navigation buttons at top-right */}
              <div className="absolute top-1 right-1 flex gap-2 z-20">
                <button
                  className="bg-white hover:bg-[#9E3CE1]  hover:text-white rounded-full border-2 p-2 -translate-y-6 -translate-x-4"
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  className="bg-white  hover:bg-[#9E3CE1] rounded-full border-2 p-2 hover:text-white -translate-y-6 -translate-x-4"
                  onClick={handleNext}
                  disabled={currentSlide === items.length - 1}
                >
                  <ChevronRight size={26} />
                </button>
              </div>

              <div className="relative mt-6 z-10 ml-3">
                <Carousel
                  ref={carouselRef}
                  responsive={responsive}
                  infinite={true} // Enables infinite scrolling
                  autoPlay={false}
                  customTransition="transform 500ms ease-in-out"
                  transitionDuration={500} // Smoother transition duration
                  keyBoardControl={true}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                  afterChange={(previousSlide, { currentSlide }) =>
                    setCurrentSlide(currentSlide)
                  }
                >
                  {items.map((item, index) => (
                    <div key={index} className="flex-none w-full p-1">
                      <div className="p-1 bg-[#F6EFF9] rounded-3xl h-52 w-[12.7rem] transform transition-transform duration-300 hover:scale-105">
                        <div className="flex flex-col items-center p-3 gap-3">
                          <Image
                            src={item.src}
                            height={item.height}
                            width={item.width}
                            alt={item.label}
                            className="pt-5"
                          />
                          <span className="pt-8 text-xl font-generalRegular">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <WhyUs />
          </div>
          <div className="mt-20">
          <MissionSection/>

          </div>
          <div className="mt-20 lg:mt-0">
            <Faq />
          </div>
          <div className="mt-20  lg:mt-10">
            <Footer />
          </div>
          
        </div>
      </div>
      {/* <div className="bg-[#F1EDEA]  max-w-screen overflow-hidden py-0 my-0">
        <Header2 />
        <div className="h-[300px] gap-6 pb-6  rounded-t-none  rounded-b-3xl  flex flex-col  items-center  justify-evenly  bg-[linear-gradient(270deg,#9E3CE1_0%,#56217B_100%)] mb-10 ">
          <Image
            src={"/images/mapSmall.png"}
            width={380}
            height={120}
            alt="Logo"
            className=""
          />
          <div className="flex gap-2 w-full px-10">
            <div className="flex flex-col gap-4 w-[15%]">
              <div className="bg-white text-black text-sm rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                <ArrowUp size={30} />
              </div>
              <hr className="border-white border-2 border-dashed trasnform rotate-90 w-16 relative m-0 right-3 z-0" />
              <div className="bg-white text-black text-sm rounded-full w-10 h-10 flex items-center justify-center font-bold z-10">
                <ArrowDown size={30} />
              </div>
            </div>
            <div className="w-[80%] flex flex-col gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-100 text-opacity-50">Pickup</p>
                <p className="text-[#FFFFFF] font-medium">
                  {pickupAdressValue.substring(0, 30) + "..." || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-100 text-opacity-50">
                  Delivery
                </p>
                <p className="text-[#FFFFFF] font-medium">
                  {dropAdressValue.substring(0, 30) + "..." || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5">
          <div className="bg-white rounded-3xl mx-auto p-6">
            <input
              type="text"
              placeholder="Name*"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full h-14 px-4 py-2  text-sm  text-gray-500 rounded-xl border border-gary-300"
            />
            <input
              type="number"
              placeholder=" Phone Number*"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full h-14 px-4 py-2 mt-5 text-sm text-gray-500  rounded-xl border border-gary-300"
            />
            <div>
              <input
                type="number"
                placeholder="Enter weight of the item in kg*"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full h-14 px-4 py-2 mt-5 text-sm text-gray-500  rounded-xl border border-gary-300"
              />
            </div>

            <div className="mt-5">
              <hr className="mb-4" />
              <div>
                <h3 className="text-xl font-bold text-black  ">
                  {" "}
                  Our prices start from
                </h3>
                <div className="flex flex-row justify-between mt-2 ">
                  <p>Trip Fare (4.1kms)</p>
                  <p className="text-2xl font-bold">&#8377;61</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full h-12 px-4 py-2 mt-5 text-sm text-black bg-[#F3E545] rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white">
            Get Prices
          </button>
        </div>
      </div> */}

      {/* // here we optimized Estimate for mobile also */}
      <div className="">
        <MobileEstimateComponent />
      </div>
    </>
  );
}
