import React from 'react';
import PT from 'prop-types';

import { Feature, Layer } from 'react-mapbox-gl';

const layoutLayer = { 'icon-image': 'harbor-15' };

const getMarkers = markers =>
  markers.map(marker => (
    <Feature
      coordinates={marker.COORDINATES}
      key={marker.id || Date.now()}
      onClick={marker.handleMarkerClick}
    />
  ));

const NidoMapMarkers = ({ markers }) => (
  <Layer type="symbol" id="marker" layout={layoutLayer}>
    {getMarkers(markers)}
  </Layer>
);

NidoMapMarkers.propTypes = {
  markers: PT.arrayOf(PT.shape).isRequired,
};

export default NidoMapMarkers;
