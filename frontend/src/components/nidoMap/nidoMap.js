import React from 'react';
import PT from 'prop-types';
import ReactMapboxGl, { ScaleControl, ZoomControl } from 'react-mapbox-gl';
import pure from 'recompose/pure';

import { map } from '../../config';
import getMapConfig from './getMapConfig';

import NidoMapLines from './nidoMapLines/nidoMapLines';
import NidoMapMarkers from './nidoMapMarkers/nidoMapMarkers';
import NidoMapPopup from './nidoMapPopup/nidoMapPopup';

const Map = ReactMapboxGl({
  accessToken: map.token,
  attributionControl: false,
});

const PuredScaleControl = pure(ScaleControl);
const PuredZoomControl = pure(ZoomControl);

const NidoMap = ({ activeMarker, coordinates, markers, reset }) => (
  <Map {...getMapConfig(coordinates, activeMarker)}>
    <PuredScaleControl />
    <PuredZoomControl />
    {coordinates.length &&
      map.showLines &&
      coordinates && <NidoMapLines coordinates={coordinates} />}
    {coordinates.length && <NidoMapMarkers markers={markers} />}
    {coordinates.length &&
      activeMarker && (
        <NidoMapPopup activeMarker={activeMarker} handleClose={reset} />
      )}
  </Map>
);

NidoMap.defaultProps = {
  activeMarker: null,
};

NidoMap.propTypes = {
  activeMarker: PT.shape({
    coordinates: PT.array,
    id: PT.number,
  }),
  coordinates: PT.arrayOf(PT.array).isRequired,
  markers: PT.arrayOf(PT.object).isRequired,
  reset: PT.func.isRequired,
};

export default pure(NidoMap);
