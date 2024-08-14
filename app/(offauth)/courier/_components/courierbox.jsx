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

const CourierComponent = () => {
  const [pickupLocation, setPickupLocation] = useRecoilState(pickupLocationState);
  const [dropLocation, setDropLocation] = useRecoilState(dropLocationState);
  const [pickupCoords, setPickupCoords] = useRecoilState(pickupCoordsState);
  const [dropCoords, setDropCoords] = useRecoilState(dropCoordsState);
  const [orderType, setOrderType] = useRecoilState(orderTypeState);

  const [showPickupDialog, setShowPickupDialog] = useState(false);
  const [showDropDialog, setShowDropDialog] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setOrderType('Courier'); 
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
    e.preventDefault();
    if (pickupLocation && dropLocation) {
      router.push("/dashboard/booking/detail-address");
    } else {
      alert("Please select both pickup and drop-off locations.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center mx-20 pb-5 h-full pt-32 rounded-2xl mb-20 bg-gradient-to-b from-[#9E3CE1] to-[#56217B]">
      <h1 className="text-6xl font-filson text-white -translate-y-4">
        Send <span className="text-[#F3E545]">courier</span> all over India
      </h1>
      <p className="text-xl text-white mt-2 mb-6 font-generalRegular -translate-y-4">
        Send courier any where in India with Unicapp, your all in one delivery solution!
      </p>
      <div className="flex flex-col -translate-y-4">
        <form className="w-72 mt-7">
          <div className="flex justify-center gap-10">
            <div className="mb-7">
              <label className="block mb-2 font-generalLight text-white translate-x-6">Pickup Pincode</label>
              <div className="relative w-80">
                <div 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer ml-6"
                  onClick={() => setShowPickupDialog(true)}
                >
                  <Image
                    src={"/images/Arrowupwhite.svg"}
                    width={15}
                    height={18}
                    alt="Pickup Arrow"
                  />
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="pl-10 w-full border-2 border-white border-opacity h-12 rounded-xl focus:border-0 focus:ring-0 bg-opacity-50 bg-[#202020] text-white text-opacity-95 ml-5"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  style={{ '::placeholder': { color: 'rgba(255, 255, 255, 1)', opacity: 1 } }}
                />
              </div>
            </div>
            <div className="mb-7">
              <label className="block mb-2 font-generalLight text-white">Delivery Pincode</label>
              <div className="relative w-80">
                <div 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer -translate-x-3 z-10"
                  onClick={() => setShowDropDialog(true)}
                >
                  <Image
                    src={"/images/Arrowdownwhite.svg"}
                    width={15}
                    height={18}
                    alt="Drop Arrow"
                  />
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="pl-10 w-80 border-2 border-white h-12 rounded-xl focus:border-white focus:ring-0 bg-[#202020] bg-opacity-55 text-white -translate-x-3 z-10"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Button
            className="bg-[#F3E545] text-black w-500px h-12 px-72 rounded-xl -translate-x-44 -translate-y-8 hover:bg-[#F3E545] mt-4"
            onClick={handleUnicappIt}
          >
            Unicapp it!
          </Button>
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
      <div className="text-white mt-4 mb-2 flex justify-between gap-20 px-10">
        <Image src={'/images/bottomtext.svg'} height={30} width={525} alt="Bottom Text" />
      </div>
      <Image src="/images/7.svg" width={150} height={150} className="absolute top-16 left-10" alt="Flower" />
      <Image src="/images/6.svg" width={180} height={180} className="absolute bottom-20 left-32" alt="Book" />
      <Image src="/images/5.svg" width={150} height={150} className="absolute top-12 right-8" alt="Shirt" />
      <Image src="/images/25.svg" width={150} height={150} className="absolute bottom-20 right-20" alt="Medicine" />
      <Image src="/images/4.svg" width={120} height={120} className="absolute -top-0.5 left-96 ml-80" alt="Medicine" />
    </div>
  );
};

export default CourierComponent;
