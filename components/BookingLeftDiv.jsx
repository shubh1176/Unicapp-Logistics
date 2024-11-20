"use client";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import {
  pickupLocationState,
  dropLocationState,
  stopsState,
  pickupCoordsState,
  dropCoordsState,
  dateState,
  timeState,
  itemDescriptionState,
  amountState,
  orderTypeState,
} from "@/recoil/store";
import { ArrowDown, ArrowUp, Box, Calendar, IndianRupee } from "lucide-react";
import Header2 from "@/components/Header2";
import Image from "next/image";
import BookingMobileHeader from "@/components/BookingMobileHeader";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const BookingLeftDiv = () => {
  const pathname = usePathname();
  const pickupLocation = useRecoilValue(pickupLocationState);
  const dropLocation = useRecoilValue(dropLocationState);
  const stops = useRecoilValue(stopsState);
  const pickupCoords = useRecoilValue(pickupCoordsState);
  const dropCoords = useRecoilValue(dropCoordsState);
  const date = useRecoilValue(dateState);
  const time = useRecoilValue(timeState);
  const itemDescription = useRecoilValue(itemDescriptionState);
  const amount = useRecoilValue(amountState);
  const orderType = useRecoilValue(orderTypeState);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatAddress = (address) => {
    const [firstPart, ...restParts] = address.split(",");
    return (
      <>
        <span className="font-generalSemiBold text-base">{firstPart}</span>
        {!isSmallScreen && restParts.length > 0 && (
          <>
            <br />
            <span className="font-generalRegular">{restParts.join(",")}</span>
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!isSmallScreen && pickupCoords && dropCoords) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [pickupCoords.longitude, pickupCoords.latitude],
        zoom: 11,
        interactive: false,
      });

      const waypoints = [
        [pickupCoords.longitude, pickupCoords.latitude],
        ...stops.map((stop) => [
          stop.location.longitude,
          stop.location.latitude,
        ]),
        [dropCoords.longitude, dropCoords.latitude],
      ];

      const coordinates = waypoints.map((coord) => coord.join(",")).join(";");
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      axios
        .get(directionsUrl)
        .then((response) => {
          const route = response.data.routes[0].geometry.coordinates;

          map.on("load", () => {
            map.addSource("route", {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: route,
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

            new mapboxgl.Marker({ color: "green" })
              .setLngLat([pickupCoords.longitude, pickupCoords.latitude])
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  `<h3>Pickup: ${pickupLocation}</h3>`
                )
              )
              .addTo(map);

            stops.forEach((stop, index) => {
              if (stop.location) {
                new mapboxgl.Marker({ color: "blue" })
                  .setLngLat([stop.location.longitude, stop.location.latitude])
                  .setPopup(
                    new mapboxgl.Popup().setHTML(
                      `<h3>Stop ${index + 1}: ${stop.address}</h3>`
                    )
                  )
                  .addTo(map);
              }
            });

            new mapboxgl.Marker({ color: "red" })
              .setLngLat([dropCoords.longitude, dropCoords.latitude])
              .setPopup(
                new mapboxgl.Popup().setHTML(`<h3>Drop: ${dropLocation}</h3>`)
              )
              .addTo(map);
          });
        })
        .catch((error) => {
          console.error("Error fetching directions from Mapbox:", error);
        });

      return () => map.remove();
    }
  }, [
    pickupCoords,
    dropCoords,
    stops,
    pickupLocation,
    dropLocation,
    isSmallScreen,
  ]);

  return (
    <>
      <div className={`hidden lg:flex flex-col items-center  lg:w-full  p-8 `}>
        <div className="flex  flex-col items-start ml-0 lg:ml-32">
          <div onClick={()=>router.push("/")} className="flex  items-center -translate-x-6 lg:mb-4  h-16 w-56">
            <img src="/images/blackonwhitelogo.svg" alt="unicapp" />
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold mb-5 lg:mb-0 lg:translate-x-2  text-white lg:text-black">
              Your Package
            </h2>

          
              <div
                id="map"
                className={`  ${pathname === "/dashboard/booking/checkout" && orderType === "Pickup & Drop" ?"hidden":"block"} w-full lg:w-96 h-28 border-2 rounded-xl lg:translate-x-3  mb-4`}
              ></div>
          
            <div className={`grid gap-4 lg:flex lg:flex-col lg:items-start`}>
              <div className="flex   sm:justify-center sm:space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10 ">
                  <ArrowUp size={20} />
                </div>
                <div className="ml-1 w-full lg:w-80 text-center sm:text-left">
                  <p className="text-xs font-generalRegular opacity-50 text-white lg:text-black">
                    Pickup
                  </p>
                  <p className="text-sm text-gray-200 lg:text-gray-500">
                    {pickupLocation ? formatAddress(pickupLocation) : "--"}
                  </p>
                </div>
              </div>
              <div
                className={` 
                   bottom-6 
                }  border-b-2 border-[#D9D9D9]  relative rotate-90 right-10 w-28 h-0 `}
              />
              <div className="flex   sm:justify-center sm:space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center  justify-center z-10">
                  <ArrowDown size={20} />
                </div>
                <div className="ml-1 w-full lg:w-80 text-center sm:text-left">
                  <p className="text-xs font-generalRegular opacity-50 text-white lg:text-black">
                    Drop Off Point
                  </p>
                  <p className="text-sm text-gray-200 lg:text-gray-500">
                    {dropLocation ? formatAddress(dropLocation) : "--"}
                  </p>
                </div>
              </div>
              <>
                {/* Stops */}
                {stops.length > 0 &&
                  stops.map((stop, index) => (
                    <>
                      <div
                        className={` bottom-6 
                          border border-[#D9D9D9] rotate-90 relative right-12 w-32 `}
                      />

                      <div key={index} className="flex  ">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10">
                          <ArrowDown size={20} />
                        </div>
                        <div className="ml-3 w-full lg:w-80">
                          <p className="text-xs font-generalRegular opacity-50">
                            Delivery Point {index + 2}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatAddress(stop.address)}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
              </>
              {/* Date & Time */}
              <div className="flex  ">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Calendar size={16} />
                </div>
                <div className="ml-3 w-full lg:w-80">
                  <p className="text-xs font-generalRegular opacity-50">
                    Date & Time
                  </p>
                  <p className=" text-gray-500 inline font-generalSemiBold text-base">
                    {date ? date.toDateString() : "--"}
                  </p>
                  <p className="font-generalSemiBold text-base text-gray-500 inline">
                    {", " + time || "--"}
                  </p>
                </div>
              </div>
              <div className={`flex   `}>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center ">
                  <Box size={16} />
                </div>
                <div className="ml-3 w-full lg:w-80">
                  <p className="text-xs font-generalRegular opacity-50 text-white lg:text-black">
                    What you're moving
                  </p>
                  <p className="font-generalSemiBold text-base text-gray-200 lg:text-gray-500">
                    {itemDescription || "--"}
                  </p>
                </div>
              </div>
              <div className={`flex`}>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <IndianRupee size={16} />
                </div>
                <div className="ml-3 w-full lg:w-80">
                  <p className="text-xs font-generalRegular opacity-50 text-white lg:text-black">
                    Price
                  </p>
                  <p className="font-generalSemiBold text-base text-gray-200 lg:text-gray-500">
                    {amount ? `₹${amount}` : "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingMobileHeader />
    </>
  );
};

export default BookingLeftDiv;
