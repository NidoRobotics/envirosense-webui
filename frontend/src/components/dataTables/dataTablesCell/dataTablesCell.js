import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import styledMap from 'styled-map';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import font from '../../../constants/styles/font';

const StyledDataTablesCell = styled.span`
  display: block;
  font-size: ${font.sizes.sm};
  text-align: ${styledMap('align', {
    center: 'center',
    right: 'right',
    default: 'left',
  })};
`;

const DataTablesCell = ({ align, sensorKey, sensorValue }) => (
  <StyledDataTablesCell align={align}>{sensorValue}</StyledDataTablesCell>
);

DataTablesCell.defaultProps = {
  sensorValue: '',
};

DataTablesCell.propTypes = {
  align: PT.string.isRequired,
  sensorKey: PT.string.isRequired,
  sensorValue: PT.oneOfType([PT.string, PT.number, PT.node]),
};

export default onlyUpdateForKeys(['sensorValue'])(DataTablesCell);
