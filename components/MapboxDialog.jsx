"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import Map, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function MapboxDialog({ isOpen, onClose, onSelectLocation, defaultLocation }) {
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [address, setAddress] = useState('');
  const mapRef = useRef(null);
  const geocoderContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen && mapRef.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        mapboxgl: mapRef.current.getMap(),
        marker: false,
      });

      geocoder.on('result', (e) => {
        const { center, place_name } = e.result;
        setSelectedLocation({ latitude: center[1], longitude: center[0] });
        setAddress(place_name);
      });

      if (geocoderContainerRef.current) {
        geocoderContainerRef.current.innerHTML = '';
        geocoderContainerRef.current.appendChild(geocoder.onAdd(mapRef.current.getMap()));
      }
    }
  }, [isOpen]);

  const handleMapClick = (event) => {
    const { lngLat } = event;
    setSelectedLocation({ latitude: lngLat.lat, longitude: lngLat.lng });
    fetchAddress(lngLat.lng, lngLat.lat);
  };

  const fetchAddress = async (longitude, latitude) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    if (data.features.length > 0) {
      setAddress(data.features[0].place_name);
    }
  };

  const handleConfirm = () => {
    onSelectLocation({
      address: address,
      location: selectedLocation,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
        </DialogHeader>
        <div className="mapbox-dialog">
          <div ref={geocoderContainerRef} className="geocoder-container" style={{ marginBottom: '10px' }} />
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: defaultLocation?.longitude || 77.2090,
              latitude: defaultLocation?.latitude || 28.6139,
              zoom: 12,
            }}
            style={{ width: '100%', height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            onClick={handleMapClick}
          >
            <NavigationControl position="top-left" />
            <GeolocateControl position="top-left" />
            {selectedLocation && (
              <Marker longitude={selectedLocation.longitude} latitude={selectedLocation.latitude} draggable />
            )}
          </Map>
        </div>
        <div>
          <p>Selected Address: {address}</p>
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm}>Confirm Location</Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MapboxDialog;
