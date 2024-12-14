// LocationSelectorMobile.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaArrowDownLong, FaArrowUp, FaArrowUpLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import {
  pickupLocationState,
  dropLocationState,
  pickupCoordsState,
  dropCoordsState,
  isPickupDialogOpenState,
  isDropDialogOpenState,
} from "@/recoil/store";
import MapboxDialog from "./MapboxDialog";
import Image from "next/image";

// Set the Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function LocationSelectorMobile() {
  const [pickupAddress, setPickupAddress] = useRecoilState(pickupLocationState);
  const [dropAddress, setDropAddress] = useRecoilState(dropLocationState);
  const [pickupCoords, setPickupCoords] = useRecoilState(pickupCoordsState);
  const [dropCoords, setDropCoords] = useRecoilState(dropCoordsState);
  const [isPickupDialogOpen, setIsPickupDialogOpen] = useRecoilState(
    isPickupDialogOpenState
  );
  const [isDropDialogOpen, setIsDropDialogOpen] = useRecoilState(
    isDropDialogOpenState
  );
  const router = useRouter()

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Function to handle location selection in the Mapbox dialog
  const handlePickupLocationSelect = (location) => {
    setPickupAddress(location.address);
    setPickupCoords(location.location);
    setIsPickupDialogOpen(false); // Close the dialog after selection
  };

  const handleDropLocationSelect = (location) => {
    setDropAddress(location.address);
    setDropCoords(location.location);
    setIsDropDialogOpen(false); // Close the dialog after selection
  };

  // Map rendering logic (optional for preview, can be omitted for the selection dialog)
  useEffect(() => {
    if (pickupCoords && dropCoords && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [pickupCoords.longitude, pickupCoords.latitude],
        zoom: 11,
      });

      mapRef.current = map;

      // Markers for pickup and drop locations
      new mapboxgl.Marker({ color: "green" })
        .setLngLat([pickupCoords.longitude, pickupCoords.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`<h3>Pickup: ${pickupAddress}</h3>`)
        )
        .addTo(map);

      new mapboxgl.Marker({ color: "red" })
        .setLngLat([dropCoords.longitude, dropCoords.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Drop: ${dropAddress}</h3>`))
        .addTo(map);

      return () => map.remove();
    }
  }, [pickupCoords, dropCoords, pickupAddress, dropAddress]);

  return (
    <div className="md:hidden w-full px-20 max-w-md md:max-w-lg lg:max-w-xl mt-8 flex flex-col md:flex-row justify-between gap-1 font-montserrat">
      <div className="flex flex-col gap-1">
        <div className="relative w-full">
          {/* FaArrowUp Icon positioned inside the input */}
          <FaArrowUpLong className="absolute left-3 top-2.5 text-white" />
          <input
            type="text"
            placeholder="Pickup Location"
            className="w-full p-3 pl-10 text-sm py-2 rounded-lg bg-[#FFFFFF80] placeholder:text-[#FFFFFF] placeholder:text-sm text-[#FFFFFF] text-md focus:outline-none focus:ring-2 focus:ring-[#F5E27B]"
            onClick={() => setIsPickupDialogOpen(true)}
            value={pickupAddress}
          />
        </div>
        <div className="relative w-full">
          {/* FaArrowUp Icon positioned inside the input */}
          <FaArrowDownLong className="absolute left-3 top-2.5 text-white" />
          <input
            type="text"
            placeholder="Dropoff Location"
            className="w-full text-sm p-3 pl-10 py-2 rounded-lg bg-[#FFFFFF80] placeholder:text-[#FFFFFF] placeholder:text-sm text-[#FFFFFF] text-md focus:outline-none focus:ring-2 focus:ring-[#F5E27B]"
            onClick={() => setIsDropDialogOpen(true)}
            value={dropAddress}
          />
        </div>
      </div>

      <button
        className="w-full md:w-auto bg-[#F5E27B] hover:bg-[#e8d06c] text-[#202020] text-sm md:text-auto font-semibold px-6 py-2 md:h-16 md:px-8 md:my-auto md:ml-2 rounded-lg transition-all duration-300"
        onClick={() => router.push("/estimate")}
      >
        Get an estimate
      </button>

      <MapboxDialog
        isOpen={isPickupDialogOpen}
        onClose={() => setIsPickupDialogOpen(false)}
        onSelectLocation={handlePickupLocationSelect}
        defaultLocation={pickupCoords}
      />
      <MapboxDialog
        isOpen={isDropDialogOpen}
        onClose={() => setIsDropDialogOpen(false)}
        onSelectLocation={handleDropLocationSelect}
        defaultLocation={dropCoords}
      />
    </div>
  );
}

export default LocationSelectorMobile;

{
  /* <div className="w-full flex flex-col items-center p-4">
      <div className="flex flex-col gap-4 w-full">
        <div className="relative">
          <Image
            src="/images/Arrowupwhite.svg"
            width={15}
            height={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 -translate-x-2"
            onClick={() => setIsPickupDialogOpen(true)}
            alt="Select Pickup Location"
          />
          <input
            className="pl-10 w-full h-12 rounded-xl focus:border-none focus:ring-0 bg-[#202020] bg-opacity-75 border-[#202020] text-white"
            placeholder="Pickup address"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
          />
        </div>

        <div className="relative">
          <Image
            src="/images/Arrowdownwhite.svg"
            width={15}
            height={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 -translate-x-2"
            onClick={() => setIsDropDialogOpen(true)}
            alt="Select Drop-off Location"
          />
          <input
            className="pl-10 w-full h-12 rounded-xl focus:border-none focus:ring-0 bg-[#202020] bg-opacity-75 border-[#202020] text-white"
            placeholder="Drop-off address"
            value={dropAddress}
            onChange={(e) => setDropAddress(e.target.value)}
          />
        </div>
      </div>

  
    </div> */
}
