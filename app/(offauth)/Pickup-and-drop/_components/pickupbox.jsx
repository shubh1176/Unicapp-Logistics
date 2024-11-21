"use client";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { 
  pickupLocationState, 
  dropLocationState, 
  pickupCoordsState, 
  dropCoordsState, 
  orderTypeState 
} from "@/recoil/store";
import MapboxDialog from "@/components/MapboxDialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Clock3, Store } from "lucide-react";

const DeliveryComponent = () => {
  const [pickupLocation, setPickupLocation] = useRecoilState(pickupLocationState);
  const [dropLocation, setDropLocation] = useRecoilState(dropLocationState);
  const [pickupCoords, setPickupCoords] = useRecoilState(pickupCoordsState);
  const [dropCoords, setDropCoords] = useRecoilState(dropCoordsState);
  const [orderType, setOrderType] = useRecoilState(orderTypeState);

  const [showPickupDialog, setShowPickupDialog] = useState(false);
  const [showDropDialog, setShowDropDialog] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setOrderType('Pickup & Drop'); 
  }, [setOrderType]);

  const handlePickupSelect = (location) => {
    setPickupLocation(location.address);
    setPickupCoords(location.location);
    setShowPickupDialog(false);
  };

  const handleDropSelect = (location) => {
    setDropLocation(location.address);
    setDropCoords(location.location);
    setShowDropDialog(false);
  };

  const handleUnicappIt = (e) => {
    e.preventDefault()
    if (pickupLocation && dropLocation) {
      console.log("Navigating to the next page...");
      router.push("/dashboard/booking/detail-address");
    } else {
      alert("Please select both pickup and drop-off locations.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center mx-20 pb-5 h-full pt-32 rounded-2xl mb-20 bg-gradient-to-b from-[#9E3CE1] to-[#56217B]">
      <h1 className="text-5xl font-filson text-white -translate-y-2">
        Get your items <span className="text-yellow-300">delivered</span> from anywhere
      </h1>
      <p className="text-xl text-white mt-3 font-generalRegular -translate-y-2">
        We'll pick up anything you need, even from the store, and deliver it to you.
      </p>
      <div className="flex items-center flex-col translate-y-0">
        <form className=" flex items-center flex-col  space-y-2 mb-14 mt-6">
          <div className="flex justify-center gap-6 ">
            <div >
              {/* <label className="block mb-2 font-generalLight text-white translate-x-6">Pickup address</label> */}
              <div className="relative w-64">
                <Image
                  src={"/images/Arrowupwhite.svg"}
                  width={15}
                  height={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ml-6 text-xl"
                  onClick={() => setShowPickupDialog(true)}
                  style={{ '::placeholder': { color: 'rgba(255, 255, 255, 1)', opacity: 1 } }}
                />
                <input
                  type="text"
                  placeholder="Pickup Address"
                  className="pl-10 w-full border border-white border-opacity h-12 rounded-xl   bg-opacity-50 bg-white text-opacity-95 ml-5   bg-[#FFFFFF80] placeholder:text-[#FFFFFF]  text-[#FFFFFF] text-md outline-none"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  style={{ '::placeholder': { color: 'rgba(255, 255, 255, 1)', opacity: 1 } }}
                />
              </div>
            </div>
            <div >
              {/* <label className="block mb-2 font-generalLight text-white">Drop-off address</label> */}
              <div className="relative w-64">
                <Image
                  src={"/images/Arrowdownwhite.svg"}
                  width={15}
                  height={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer ml-6 -translate-x-7 z-10"
                  onClick={() => setShowDropDialog(true)}
                  alt="Drop-off"
                />
                <input
                  type="text"
                  placeholder="Drop off Address"
                  className="pl-10 w-full border border-white border-opacity h-12 rounded-xl   bg-opacity-50 bg-white text-opacity-95   bg-[#FFFFFF80] placeholder:text-[#FFFFFF]  text-[#FFFFFF] text-md outline-none   "

                  // className="pl-10 w-full border-2 border-white h-12 rounded-xl focus:border-0 focus:ring-0 bg-opacity-50 bg-white text-white text-opacity-95  placeholder:text-white focus:outline-none"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <div className=" flex justify-center"> */}
          <Button
            className="bg-[#F3E545] ml-5 text-black  h-12 px-56  rounded-xl  hover:bg-[#F3E545] mt-0 mb-4"
            onClick={handleUnicappIt}
          >
            Unicapp it!
          </Button>

          {/* </div> */}
        
        </form>
      </div>
      {showPickupDialog && (
        <MapboxDialog
          isOpen={showPickupDialog}
          onClose={() => setShowPickupDialog(false)}
          onSelectLocation={handlePickupSelect}
          defaultLocation={pickupCoords}
        />
      )}
      {showDropDialog && (
        <MapboxDialog
          isOpen={showDropDialog}
          onClose={() => setShowDropDialog(false)}
          onSelectLocation={handleDropSelect}
          defaultLocation={dropCoords}
        />
      )}
      <div className="text-white font-generalRegular mt-4 mb-2 flex justify-between gap-20 px-20">
        <div className="flex items-center gap-2">
          <Clock3 size={15}/>
          <p>Pickup within 20 mins</p>
        </div>
        <div className="flex items-center gap-2">
          <Store size={15}/>
          <p>Store pickups available</p>
        </div>
        {/* <Image src={"/images/bottomtextstore.svg"} height={30} width={500} alt="Bottom Text" /> */}
      </div>
      {/* Decorative Images */}
      <Image src="/images/flower.svg" width={120} height={120} className="absolute top-16 left-[-15px]" alt="Flower" />
      <Image src="/images/book.svg" width={80} height={80} className="absolute bottom-32 left-24" alt="Book" />
      <Image src="/images/lunchbox.svg" width={80} height={80} className="absolute top-0 right-96" alt="Tiffin" />
      <Image src="/images/dress.svg" width={100} height={100} className="absolute top-2 right-4" alt="Shirt" />
      <Image src="/images/key.svg" width={90} height={90} className="absolute bottom-12 right-56" alt="Key" />
      <Image src="/images/Medicines1.svg" width={70} height={70} className="absolute bottom-10 left-64" alt="Medicine" />
      <Image src="/images/envelop.svg" width={60} height={60} className="absolute bottom-8 right-12" alt="Medicine" />
      <Image src="/images/charger2.svg" width={100} height={100} className="absolute -top-0.5 left-96" alt="Medicine" />
      <Image src="/images/grocery.svg" width={100} height={100} className="absolute bottom-44 right-28 -rotate-12" alt="Medicine" />
    </div>
  );
};

export default DeliveryComponent;
