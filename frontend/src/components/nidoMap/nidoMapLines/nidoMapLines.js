import React from 'react';
import PT from 'prop-types';

import { Feature, Layer } from 'react-mapbox-gl';

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round',
};

const linePaint = {
  'line-color': '#ff0',
  'line-width': 2,
};

const NidoMapLines = ({ coordinates }) => (
  <Layer type="line" layout={lineLayout} paint={linePaint}>
    <Feature coordinates={coordinates} />
  </Layer>
);

NidoMapLines.propTypes = {
  coordinates: PT.arrayOf(PT.array).isRequired,
};

export default NidoMapLines;
