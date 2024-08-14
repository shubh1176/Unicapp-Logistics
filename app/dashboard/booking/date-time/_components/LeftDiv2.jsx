"use client";
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import {
  pickupLocationState,
  dropLocationState,
  stopsState,
  pickupCoordsState,
  dropCoordsState,
  dateState,
  timeState,
  weightState,
  itemDescriptionState,
  amountState,
} from '@/recoil/store';
import Image from 'next/image';
import { ArrowDown, ArrowUp, Box, Calendar, IndianRupee } from 'lucide-react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const LeftDiv2 = () => {
  const pickupLocation = useRecoilValue(pickupLocationState);
  const dropLocation = useRecoilValue(dropLocationState);
  const stops = useRecoilValue(stopsState);
  const pickupCoords = useRecoilValue(pickupCoordsState);
  const dropCoords = useRecoilValue(dropCoordsState);
  const date = useRecoilValue(dateState);
  const time = useRecoilValue(timeState);
  const weight = useRecoilValue(weightState);
  const itemDescription = useRecoilValue(itemDescriptionState);
  const amount = useRecoilValue(amountState);

  const formatAddress = (address) => {
    const [firstPart, ...restParts] = address.split(',');
    return (
      <>
        <span className="font-generalSemiBold text-lg">{firstPart}</span>
        <br />
        <span className="font-generalRegular">{restParts.join(',')}</span>
      </>
    );
  };

  useEffect(() => {
    if (pickupCoords && dropCoords) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [pickupCoords.longitude, pickupCoords.latitude],
        zoom: 11,
      });

      const waypoints = [
        [pickupCoords.longitude, pickupCoords.latitude],
        ...stops.map((stop) => [stop.location.longitude, stop.location.latitude]),
        [dropCoords.longitude, dropCoords.latitude],
      ];

      const coordinates = waypoints.map(coord => coord.join(',')).join(';');
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      axios.get(directionsUrl)
        .then(response => {
          const route = response.data.routes[0].geometry.coordinates;

          // Add the route to the map
          map.on('load', () => {
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: route,
                },
              },
            });

            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#9E3CE1',
                'line-width': 3,
              },
            });

            // Add markers for each waypoint
            new mapboxgl.Marker({ color: 'green' })
              .setLngLat([pickupCoords.longitude, pickupCoords.latitude])
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>Pickup: ${pickupLocation}</h3>`))
              .addTo(map);

            stops.forEach((stop, index) => {
              if (stop.location) {
                new mapboxgl.Marker({ color: 'blue' })
                  .setLngLat([stop.location.longitude, stop.location.latitude])
                  .setPopup(new mapboxgl.Popup().setHTML(`<h3>Stop ${index + 1}: ${stop.address}</h3>`))
                  .addTo(map);
              }
            });

            new mapboxgl.Marker({ color: 'red' })
              .setLngLat([dropCoords.longitude, dropCoords.latitude])
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>Drop: ${dropLocation}</h3>`))
              .addTo(map);
          });
        })
        .catch(error => {
          console.error('Error fetching directions from Mapbox:', error);
        });

      return () => map.remove();
    }
  }, [pickupCoords, dropCoords, stops, pickupLocation, dropLocation]);

  return (
    <div className="flex flex-col items-center mt-10 -translate-y-32">
      <div className="ml-32 items-start">
        <div className="flex justify-between items-center -translate-x-5 translate-y-8 h-44 w-44">
          <img src='/images/blackonwhitelogo.svg' alt='unicapp' />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-5 -translate-x-32 -translate-y-4">Your Package</h2>
          <div id="map" className="w-96 h-36 border-2 rounded-xl translate-x-3 -translate-y-4"></div>
          <div className="p-10 text-left -translate-x-8 -translate-y-8">
            <div className="mt-5 flex flex-col items-start">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <ArrowUp size={20} />
                </div>
                <div className="ml-3 w-80">
                  <p className="text-sm font-generalRegular opacity-50">Pickup</p>
                  <p className="text-sm text-gray-500">{pickupLocation ? formatAddress(pickupLocation) : '--'}</p>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <ArrowDown size={20} />
                </div>
                <div className="ml-3 w-80">
                  <p className="text-sm font-generalRegular opacity-50">Drop Off Point</p>
                  <p className="text-sm text-gray-500">{dropLocation ? formatAddress(dropLocation) : '--'}</p>
                </div>
              </div>
              {stops.length > 0 && stops.map((stop, index) => (
                <div key={index} className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <ArrowDown size={20} />
                  </div>
                  <div className="ml-3 w-80">
                    <p className="text-sm font-generalRegular opacity-50">Delivery Point {index + 2}</p>
                    <p className="text-sm text-gray-500">{formatAddress(stop.address)}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Calendar size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-generalRegular opacity-50">Date & Time</p>
                  <p className="text-sm text-gray-500">{date ? date.toDateString() : '--'}</p>
                  <p className="text-sm text-gray-500">{time || '--'}</p>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Box size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-generalRegular opacity-50">What you're moving</p>
                  <p className="text-sm text-gray-500">{itemDescription || '--'}</p>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <IndianRupee size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-generalRegular opacity-50">Price</p>
                  <p className="text-sm text-gray-500">{amount ? `₹${amount}` : '--'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftDiv2;
