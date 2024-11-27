"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import MapboxDialog from "./MapboxDialog";
import { fetchTravelRouteAndDistance } from "@/utils/distance";
import Header2 from "@/components/Header2";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import BookingMobileHeader from "./BookingMobileHeader";
import {
  pickupLocationState,
  dropLocationState,
  stopsState, // Import the stopsState
  pickupCoordsState,
  dropCoordsState,
  isPickupDialogOpenState,
  isDropDialogOpenState,
  distanceState,
  amountState,
  orderTypeState,
  showPriceDetailsState,
  lengthState,
  widthState,
  heightState,
  weightState,
} from "@/recoil/store";
const MobileEstimateComponent = () => {
    const [serviceType, setServiceType] = useRecoilState(
        orderTypeState || "Courier"
      );
      const [pickupAddress, setPickupAddress] = useRecoilState(pickupLocationState);
      const [dropAddress, setDropAddress] = useRecoilState(dropLocationState);
      const stops = useRecoilValue(stopsState); // Get the stops value from Recoil
      const [pickupCoords, setPickupCoords] = useRecoilState(pickupCoordsState);
      const [dropCoords, setDropCoords] = useRecoilState(dropCoordsState);
     
      const [distance, setDistance] = useRecoilState(distanceState);
      const [amount, setAmount] = useRecoilState(amountState);
      const setShowPriceDetails = useSetRecoilState(showPriceDetailsState);
      const [weight, setWeight] = useRecoilState(weightState);
      const [userName, setUserName] = useState("");
      const [phoneNumber, setPhoneNumber] = useState("");
     
      const { user } = useUser();
      console.log(user);
    //   const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Reference to store the Mapbox map instance
  const router = useRouter();
    
      const [rateType, setRateType] = useState("surface"); // new state for rate type
      const [priceCalculated, setPriceCalculated] = useState(false); // new state to track if price is calculated
     // new state to track if price is calculated
  

  const fetchRoute = async (pickupCoords, dropCoords) => {
    if (!pickupCoords || !dropCoords) {
      console.error("Invalid coordinates provided for route calculation.");
      return null;
    }

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords.longitude},${pickupCoords.latitude};${dropCoords.longitude},${dropCoords.latitude}?geometries=geojson&access_token=${accessToken}`;

    try {
      const response = await axios.get(url);
      if (response.data.routes && response.data.routes[0]) {
        return response.data.routes[0].geometry.coordinates;
      } else {
        console.error("No route found in the response");
        return null;
      }
    } catch (error) {
      console.error("Error fetching route from Mapbox:", error);
      return null;
    }
  };
  const calculateFare = async () => {
    if (pickupAddress === "" || dropAddress === "") {
      console.error("Invalid coordinates provided for route calculation.");
      return null;
    }
    console.log(serviceType);
    if (serviceType === "Courier") {
      const volumetricWeight = (length * width * height) / 5000;
      const chargeableWeight = Math.max(weight, volumetricWeight);

      const ratePerKg = rateType === "surface" ? 55 : 120; // Surface or Air rate
      const baseAmount = chargeableWeight * ratePerKg;
      const gstAmount = baseAmount * 0.18;
      const totalAmount = baseAmount + gstAmount;

      setAmount(parseFloat(totalAmount.toFixed(2)) || 0.0); // Ensure amount is a valid float
    } else {
      const { distance } = await fetchTravelRouteAndDistance(
        pickupCoords,
        dropCoords,
        stops
      );
      setDistance(distance);

      let totalAmount = 40; // base price
      if (distance > 2 && distance <= 10) {
        totalAmount += (distance - 2) * 16;
      } else if (distance > 10) {
        totalAmount += 8 * 16 + (distance - 10) * 10;
      }

      setAmount(parseFloat(totalAmount.toFixed(2)) || 0.0); // Ensure amount is a valid float
    }

    setShowPriceDetails(true);
    setPriceCalculated(true); // Set price calculated to true

    // Fetch and display the route
    const route = await fetchRoute(pickupCoords, dropCoords);
    if (route && mapRef.current) {
      const routeSource = mapRef.current.getSource("route");
      if (routeSource) {
        routeSource.setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        });
      } else {
        console.error("Route source not found.");
      }
    }
  };
  return (
    <div className="bg-[#F1EDEA]  max-w-screen overflow-hidden py-0 my-0 block lg:hidden">
    <BookingMobileHeader />
    <div className="px-5">
      <div className="bg-white max-w-md rounded-3xl mx-auto p-6">
        <input
          type="text"
          placeholder="Name*"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="w-full h-14 px-4 py-2 text-sm text-gray-500 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0094B2]"
        />

        <input
          type="number"
          placeholder=" Phone Number*"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full h-14 px-4 py-2 mt-5 text-sm text-gray-500  rounded-xl border border-gary-300 focus:outline-none focus:border-[#0094B2]"
        />
        <div className="flex items-center rounded-xl border border-gray-300 h-14 px-4 py-2 mt-5 focus-within:border-[#0094B2]">
          <Image
            src="/images/weightkg.svg"
            width={25}
            height={25}
            alt="Weight"
            className="relative"
          />
          <input
            type="number"
            placeholder="Enter weight of the item in kg*"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            className="w-full px-2 py-2 text-sm text-gray-500 focus:outline-none"
          />
        </div>

        {priceCalculated && (
          <div className="mt-5">
            <hr className="mb-4" />
            <div>
              <h3 className="text-xl font-bold text-black  ">
                {" "}
                Our prices start from
              </h3>
              <div className="flex flex-row justify-between mt-2 ">
                <p>Trip Fare ({distance?.toFixed(1)} kms)</p>
                <p className="text-2xl font-bold">
                  &#8377;{amount?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={
            priceCalculated
              ? () => router.push("/dashboard/booking/detail-address")
              : calculateFare
          }
          className="w-full max-w-md mx-auto h-12 px-4 py-2 mt-5 text-sm text-black bg-[#F3E545] rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
        >
          {priceCalculated ? "Unicapp it!" : "See prices"}
        </button>
      </div>
    </div>
  </div>
  )
}

export default MobileEstimateComponent