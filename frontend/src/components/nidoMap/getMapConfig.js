const DEFAULT_COORDS = [-0.833333, 37.766667];

const containerStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
};

const getFitBounds = coordinates => {
  if (!coordinates.length) {
    return [DEFAULT_COORDS, DEFAULT_COORDS];
  }
  if (coordinates.length === 1) {
    return [coordinates[0], coordinates[0]];
  }
  return coordinates;
};

const getCenter = (coordinates, activeMarker) => {
  if (!coordinates.length) {
    return DEFAULT_COORDS;
  }
  if (activeMarker) {
    return activeMarker.COORDINATES;
  }
  return coordinates.slice(-1)[0];
};

const getZoomLevel = coordinatesLength => {
  if (coordinatesLength < 3) {
    return 10;
  }
  if (coordinatesLength < 5) {
    return 15;
  }
  return 20;
};

export default (coordinates, activeMarker) => {
  const center = getCenter(coordinates, activeMarker);
  const zoom = [getZoomLevel(coordinates.length)];
  const defaultObj = {
    style: 'mapbox://styles/mapbox/outdoors-v10',
    containerStyle,
    center,
    zoom,
  };
  if (!coordinates.length) {
    return defaultObj;
  }
  const fitBounds = getFitBounds(coordinates);
  return {
    ...defaultObj,
    fitBounds,
  };
};
