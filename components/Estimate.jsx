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

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function EstimateComponent() {
  const [serviceType, setServiceType] = useRecoilState(
    orderTypeState || "Courier"
  );
  const [pickupAddress, setPickupAddress] = useRecoilState(pickupLocationState);
  const [dropAddress, setDropAddress] = useRecoilState(dropLocationState);
  const stops = useRecoilValue(stopsState); // Get the stops value from Recoil
  const [pickupCoords, setPickupCoords] = useRecoilState(pickupCoordsState);
  const [dropCoords, setDropCoords] = useRecoilState(dropCoordsState);
  const [isPickupDialogOpen, setIsPickupDialogOpen] = useRecoilState(
    isPickupDialogOpenState
  );
  const [isDropDialogOpen, setIsDropDialogOpen] = useRecoilState(
    isDropDialogOpenState
  );
  const [distance, setDistance] = useRecoilState(distanceState);
  const [amount, setAmount] = useRecoilState(amountState);
  const setShowPriceDetails = useSetRecoilState(showPriceDetailsState);
  const showPriceDetails = useRecoilValue(showPriceDetailsState);
  const [length, setLength] = useRecoilState(lengthState);
  const [width, setWidth] = useRecoilState(widthState);
  const [height, setHeight] = useRecoilState(heightState);
  const [weight, setWeight] = useRecoilState(weightState);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const { user } = useUser();
  console.log(user);

  const [rateType, setRateType] = useState("surface"); // new state for rate type
  const [priceCalculated, setPriceCalculated] = useState(false); // new state to track if price is calculated

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Reference to store the Mapbox map instance
  const router = useRouter();

  const routeOptions = [
    { label: "By Surface", basePrice: 55, gstRate: 0.18 },
    { label: "By Air", basePrice: 120, gstRate: 0.18 },
  ];

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

  useEffect(() => {
    if (pickupCoords && dropCoords && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [pickupCoords.longitude, pickupCoords.latitude],
        zoom: 11,
      });

      mapRef.current = map; // Store the map instance

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

      map.on("load", () => {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [],
            },
          },
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#9E3CE1",
            "line-width": 3,
          },
        });
      });

      return () => map.remove();
    }
  }, [pickupCoords, dropCoords, pickupAddress, dropAddress, showPriceDetails]);
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
  return (
    <>
      <div className="hidden md:flex relative  flex-col items-start p-10 mx-14 bg-gradient-to-b from-[#9E3CE1] to-[#56217B] text-white rounded-2xl shadow-lg h-full">
        <div className="w-1/2 pr-4">
          <h1 className="text-6xl font-filson mb-4 translate-x-4">
            Get an <span className="text-[#F3E545] font-filson">Estimate</span>
          </h1>

          <div className="text-lg mb-4 ml-5 w-4/5 translate-y-3">
            <div className="flex flex-row gap-3">
              <Image
                src="/images/fort.svg"
                height={25}
                width={25}
                alt="Delhi"
              />
              <p className="mb-1 text-sm translate-y-1">Delhi</p>
            </div>
            <p className="font-generalSemiBold text-2xl mt-3 mb-2">
              Intra-city deliveries
            </p>
            <p className="mb-4 font-generalRegular text-sm">
              For intra-city deliveries, we utilise our dedicated team of
              delivery captains to ensure prompt and reliable service.
            </p>
            <div className="flex flex-row gap-3 mt-8 mb-2">
              <Image
                src="/images/india.svg"
                height={25}
                width={25}
                alt="India"
              />
              <p className="mb-2 text-sm translate-y-1">All-over India</p>
            </div>
            <p className="font-generalSemiBold text-2xl mb-2">
              Inter-city deliveries
            </p>
            <p className="font-generalRegular text-sm">
              For intercity courier services, we partner with the nation's most
              trusted and reliable logistics companies to ensure timely and
              secure deliveries.
            </p>
          </div>
        </div>

        <div className="absolute right-0 transform -translate-x-5 translate-y-6 bg-white bg-opacity-25 rounded-xl min-h-28 max-w-full">
          <div className="bg-black bg-opacity-25 w-full h-full rounded-xl py-6 px-4 border-black border-2 border-opacity-5">
            <div className="flex flex-row gap-3 mb-4 w-auto mr-5">
              <div
                className={`relative flex flex-col px-4 py-2 w-80 rounded-2xl h-24 bg-opacity-50 pt-3 pl-5 ${
                  serviceType === "Pickup & Drop"
                    ? "bg-[#202020] bg-opacity-75 text-white"
                    : "bg-[#202020] bg-opacity-25 text-white hover:bg-opacity-25"
                } border-white border-opacity-25 border-2`}
                onClick={() => {
                  setServiceType("Pickup & Drop");
                  setShowPriceDetails(false);
                  setPriceCalculated(false); // Reset the state when service type changes
                }}
              >
                <span className="text-xl font-generalMedium pt-1.5">
                  Pickup & Drop
                </span>
                <div className="mt-1 opacity-50">
                  <span className="mt-10 text-sm">
                    For on-demand intracity deliveries
                  </span>
                </div>
                <div className="absolute top-6 right-5 w-5 h-5 bg-transparent border-white border-opacity-50 border-2 rounded"></div>
                {serviceType === "Pickup & Drop" && (
                  <div className="absolute top-6 right-5 w-5 h-5 bg-purple-700 rounded">
                    <Check size={20} className="text-white" />
                  </div>
                )}
              </div>
              <div
                className={`relative flex-1 px-5 py-2 rounded-2xl w-auto h-24 bg-opacity-50 ${
                  serviceType === "Courier"
                    ? "bg-[#202020] bg-opacity-75 text-white"
                    : "bg-[#202020] bg-opacity-25 text-white hover:bg-opacity-25"
                } border-white border-opacity-25 border-2`}
                onClick={() => {
                  setServiceType("Courier");
                  setShowPriceDetails(false);
                  setPriceCalculated(false); // Reset the state when service type changes
                }}
              >
                <h2 className="text-xl font-generalMedium pt-2">Courier</h2>
                <div className="mt-1 opacity-50">
                  <h3 className="mt-2 text-sm">
                    For sending packages around the country
                  </h3>
                </div>
                <div className="absolute top-5 right-5 w-5 h-5 bg-transparent border-white border-opacity-50 border-2 rounded"></div>
                {serviceType === "Courier" && (
                  <div className="absolute top-5 right-5 w-5 h-5 bg-purple-700 rounded">
                    <Check size={20} className="text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Address Input Fields */}
            <div className="flex flex-col gap-3 justify-center">
              <div className="flex flex-row gap-3 justify-center">
                <div className="mb-4 mt-4">
                  <div className="relative">
                    <Image
                      src={"/images/Arrowupwhite.svg"}
                      width={15}
                      height={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 -translate-x-2"
                      onClick={() => setIsPickupDialogOpen(true)}
                      alt="Open Pickup Dialog"
                    />
                    <input
                      className="pl-10 w-80 h-12 rounded-xl focus:border-none focus:ring-0 bg-[#202020] bg-opacity-75 border-[#202020] text-white -translate-x-2"
                      placeholder="Pickup address"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4 mt-4">
                  <div className="relative">
                    <Image
                      src={"/images/Arrowdownwhite.svg"}
                      width={15}
                      height={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 -translate-x-2"
                      onClick={() => setIsDropDialogOpen(true)}
                      alt="Open Drop-off Dialog"
                    />
                    <input
                      className="pl-10 w-80 h-12 rounded-xl focus:border-[#202020] focus:border-opacity-30 focus:ring-[#202020] bg-[#202020] bg-opacity-75 border-[#202020] text-white -translate-x-2"
                      placeholder="Drop-off address"
                      value={dropAddress}
                      onChange={(e) => setDropAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {serviceType === "Courier" && (
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-1">
                    <input
                      className="pl-4 w-40 h-12 rounded-xl focus:border-none focus:ring-0 bg-[#202020] bg-opacity-75 border-[#202020] text-white"
                      placeholder="Length"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                    <input
                      className="pl-4 w-40 h-12 rounded-xl focus:border-none focus:ring-0 bg-[#202020] bg-opacity-75 border-[#202020] text-white"
                      placeholder="Width"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />

                    <input
                      className="pl-4 w-40 h-12 rounded-xl focus:border-none focus:ring-0 bg-[#202020] bg-opacity-75 border-[#202020] text-white"
                      placeholder="Height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <input
                      className="pl-4 w-40 h-12 rounded-xl focus:border-none focus:ring-0 bg-[#202020] bg-opacity-75 border-[#202020] text-white"
                      placeholder="Weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Price Details and Map */}
            {showPriceDetails && (
              <div className="mt-4 p-4 rounded-lg flex flex-row gap-3 justify-center">
                <div
                  id="map"
                  ref={mapContainerRef}
                  className="w-1/2 h-36 rounded-lg -translate-x-2"
                ></div>
                <div className="flex flex-col bg-[#202020] opacity-75 rounded-xl p-4 w-80">
                  {serviceType === "Pickup & Drop" ? (
                    <>
                      <p className="text-sm mb-2">
                        Trip Fare ({distance?.toFixed(1)} kms)
                      </p>
                      <div className="flex flex-row justify-between text-xs gap-4">
                        <span>Standard fee (upto 2.0 kms)</span>
                        <p>₹40</p>
                      </div>
                      {distance > 2 && (
                        <div className="flex flex-row justify-between text-xs">
                          <span>From 2.0 to 10.0 kms</span>
                          <p>₹{((distance - 2) * 10).toFixed(2)}</p>
                        </div>
                      )}
                      {distance > 10 && (
                        <div className="flex flex-row justify-between text-xs">
                          <span>Every additional km (rate/km)</span>
                          <p>₹{(distance - 10) * 16}</p>
                        </div>
                      )}
                      <div className="flex flex-row justify-between text-xs">
                        <span>Total</span>
                        <p>₹{amount?.toFixed(2)}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm mb-2">Courier charges</p>
                      <div className="flex flex-row justify-between text-xs gap-4">
                        <span>Courier charges</span>
                        <p>₹{(amount / 1.18).toFixed(2)}</p>{" "}
                        {/* Subtracting GST for display */}
                      </div>
                      <div className="flex flex-row justify-between text-xs">
                        <span>GST Charges:</span>
                        <p>₹{(amount - amount / 1.18).toFixed(2)}</p>{" "}
                        {/* Displaying only GST */}
                      </div>
                      <div className="flex flex-row justify-between text-xs">
                        <span>Total:</span>
                        <p>₹{amount}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Aligning the Button Below the Price Details and Map */}
            <Button
              className="bg-[#F3E545] text-black w-full h-12 rounded-xl hover:bg-[#F3E545] mt-4"
              onClick={
                priceCalculated
                  ? () => router.push("/dashboard/booking/detail-address")
                  : calculateFare
              }
            >
              {priceCalculated ? "Unicapp it!" : "See prices"}
            </Button>
          </div>
        </div>

        {/* Mapbox Dialog Components */}
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

      <div className="bg-[#F1EDEA]  max-w-screen overflow-hidden py-0 my-0 block md:hidden">
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
                  {pickupAddress.substring(0, 30) + "..." || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-100 text-opacity-50">
                  Delivery
                </p>
                <p className="text-[#FFFFFF] font-medium">
                  {dropAddress.substring(0, 30) + "..." || "N/A"}
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
          <button
            onClick={
              priceCalculated
                ? () => router.push("/dashboard/booking/detail-address")
                : calculateFare
            }
            className="w-full h-12 px-4 py-2 mt-5 text-sm text-black bg-[#F3E545] rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
          >
            {priceCalculated ? "Unicapp it!" : "See prices"}
          </button>
        </div>
      </div>
    </>
  );
}

export default EstimateComponent;
