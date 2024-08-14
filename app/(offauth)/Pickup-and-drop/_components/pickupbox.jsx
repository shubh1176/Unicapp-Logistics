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
      <div className="flex flex-col translate-y-4">
        <form className="w-72 mt-7">
          <div className="flex justify-center gap-10">
            <div className="mb-7">
              <label className="block mb-2 font-generalLight text-white translate-x-6">Pickup address</label>
              <div className="relative w-80">
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
                  placeholder=""
                  className="pl-10 w-full border-2 border-white border-opacity h-12 rounded-xl focus:border-0 focus:ring-0 bg-opacity-50 bg-[#202020] text-white text-opacity-95 ml-5"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  style={{ '::placeholder': { color: 'rgba(255, 255, 255, 1)', opacity: 1 } }}
                />
              </div>
            </div>
            <div className="mb-7">
              <label className="block mb-2 font-generalLight text-white">Drop-off address</label>
              <div className="relative w-80">
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
                  placeholder=""
                  className="pl-10 w-full border-2 border-white h-12 rounded-xl focus:border-0 focus:ring-0 bg-opacity-50 bg-[#202020] text-white text-opacity-95 -translate-x-2"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Button
            className="bg-[#F3E545] text-black w-500px h-12 px-72 rounded-xl -translate-x-44 -translate-y-8 hover:bg-[#F3E545] mt-4 mb-4"
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
        <Image src={"/images/bottomtextstore.svg"} height={30} width={525} alt="Bottom Text" />
      </div>
      {/* Decorative Images */}
      <Image src="/images/flower.svg" width={150} height={150} className="absolute top-16 left-10" alt="Flower" />
      <Image src="/images/book.svg" width={80} height={80} className="absolute bottom-32 left-28" alt="Book" />
      <Image src="/images/lunchbox.svg" width={80} height={80} className="absolute top-4 right-96" alt="Tiffin" />
      <Image src="/images/dress.svg" width={100} height={100} className="absolute top-12 right-8" alt="Shirt" />
      <Image src="/images/key.svg" width={90} height={90} className="absolute bottom-12 right-56" alt="Key" />
      <Image src="/images/Medicines1.svg" width={70} height={70} className="absolute bottom-10 left-64" alt="Medicine" />
      <Image src="/images/envelop.svg" width={60} height={60} className="absolute bottom-20 right-20" alt="Medicine" />
      <Image src="/images/charger2.svg" width={100} height={100} className="absolute -top-0.5 left-96" alt="Medicine" />
      <Image src="/images/grocery.svg" width={100} height={100} className="absolute bottom-52 right-32 -rotate-12" alt="Medicine" />
    </div>
  );
};

export default DeliveryComponent;
