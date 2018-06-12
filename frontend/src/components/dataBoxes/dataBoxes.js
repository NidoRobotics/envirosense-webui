import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import colors from '../../constants/styles/colors';
import getSensorsGroups from '../../utils/sensors/getGroups';

import DataBoxesGroup from './dataBoxesGroup/dataBoxesGroup';

const StyledWrapper = styled.div`
  background: ${colors.white};
  box-shadow: 1px 1px 1px ${colors.grayA2};
`;

const getContent = data => {
  const sensorsGroups = getSensorsGroups(data, false);
  return sensorsGroups.map(sensorGroup => (
    <DataBoxesGroup key={sensorGroup.key} sensorGroup={sensorGroup} />
  ));
};

const DataBoxes = ({ data }) => (
  <StyledWrapper>{getContent(data)}</StyledWrapper>
);

DataBoxes.propTypes = {
  data: PT.shape({}).isRequired,
};

export default DataBoxes;
