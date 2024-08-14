import axios from 'axios';

export const fetchTravelRouteAndDistance = async (pickupCoords, dropCoords, stops = []) => {
  if (!pickupCoords || !dropCoords || !pickupCoords.latitude || !pickupCoords.longitude || !dropCoords.latitude || !dropCoords.longitude) {
    return { route: [], distance: 0 };
  }

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  // Create an array of all the coordinates: Pickup -> Stops -> Drop
  const waypoints = [
    `${pickupCoords.longitude},${pickupCoords.latitude}`,
    ...stops.map((stop) => `${stop.location.longitude},${stop.location.latitude}`),
    `${dropCoords.longitude},${dropCoords.latitude}`,
  ];

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints.join(';')}?geometries=geojson&access_token=${accessToken}`;

  try {
    const response = await axios.get(url);
    if (response.data.routes && response.data.routes[0]) {
      const route = response.data.routes[0].geometry.coordinates;
      const distance = response.data.routes[0].distance / 1000; // Convert to kilometers
      return { route, distance };
    } else {
      return { route: [], distance: 0 };
    }
  } catch (error) {
    console.error('Error fetching directions from Mapbox:', error);
    return { route: [], distance: 0 };
  }
};
