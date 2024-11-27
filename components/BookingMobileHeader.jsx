import React,{useEffect, useState} from 'react'
import Header2 from './Header2'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import mapboxgl from "mapbox-gl";
import axios from "axios";
import {
  pickupLocationState,
  dropLocationState,
  stopsState,
  pickupCoordsState,
  dropCoordsState,
} from "@/recoil/store";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


const BookingMobileHeader = () => {
  const pickupLocation = useRecoilValue(pickupLocationState);
  const dropLocation = useRecoilValue(dropLocationState);
  const stops = useRecoilValue(stopsState);
  const pickupCoords = useRecoilValue(pickupCoordsState);
  const dropCoords = useRecoilValue(dropCoordsState);
 

  useEffect(() => {
    if ( pickupCoords && dropCoords) {
      const map = new mapboxgl.Map({
        container: "mobile-map",
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
   
  ]);
  return (
    <div className='block lg:hidden'>
  <Header2 />
        <div className="h-[330px] md:h-[500px] w-screen gap-4 pb-6  rounded-t-none  rounded-b-3xl  flex flex-col  items-center  justify-evenly  bg-[linear-gradient(270deg,#9E3CE1_0%,#56217B_100%)] mb-10  ">
          {/* <Image
            src={"/images/mapSmall.png"}
            width={380}
            height={120}
            alt="Logo"
            className=" w-[90%]"
          /> */}
          <div
                id="mobile-map"
                className={` lg:mx-0 block w-[90%] lg:w-96 h-36 border-2 rounded-xl lg:translate-x-3  mb-4`}
              ></div>
          <div className="flex gap-2 w-full px-10 ">
            <div className="flex flex-col gap-4 w-[15%] md:w-[8%]">
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
                <p className="text-[#FFFFFF] font-medium block md:hidden">
                  {pickupLocation.substring(0, 30) + "..." || "N/A"}
                </p>
                <p className="text-[#FFFFFF] font-medium hidden md:block">
                  {pickupLocation.substring(0, 60) + "..." || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-100 text-opacity-50">
                  Delivery
                </p>
                <p className="text-[#FFFFFF] font-medium block md:hidden">
                  {dropLocation.substring(0, 30) + "..." || "N/A"}
                </p>

                <p className="text-[#FFFFFF] font-medium hidden md:block">
                  {dropLocation.substring(0, 60) + "..." || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
  </div>
  )
}

export default BookingMobileHeader