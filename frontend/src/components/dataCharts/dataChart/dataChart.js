import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import styledMap from 'styled-map';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import shouldUpdate from 'recompose/shouldUpdate';

import SENSORS from '../../../constants/sensors';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

import DataChartLine from './dataChartLine';
import DataChartRadar from './dataChartRadar';

const StyledButton = styled.button`
  appearance: none;
  background: ${styledMap({
    active: colors.grayT5,
    default: colors.grayT8,
  })};
  border: 0;
  border-bottom: 1px solid ${colors.grayT4};
  box-shadow: 0 1px 0 #fff;
  color: ${colors.grayS5};
  cursor: pointer;
  display: block;
  margin: 0;
  outline: 0;
  padding: ${sizes.md};
  width: 100%;
  &:hover {
    background: ${colors.grayT6};
  }
`;

const StyledHeader = onlyUpdateForKeys(['children'])(styled.h4`
  font-size: ${font.sizes.sm};
  margin: 0 auto;
  text-align: left;
  text-transform: uppercase;
`);

const StyledWrapper = styled.div`
  max-width: 100%;
  overflow: auto;
  overflow-y: hidden;
  display: block;
  margin: 0 auto;
`;

const getChart = props => {
  if (props.data.length < 2) {
    return <div />;
  }
  if (
    props.key === 'MAGNETICCOMPASS' ||
    props.key === 'GPSCOMPASS' ||
    props.key === 'LAT' ||
    props.key === 'LONG' ||
    props.key === 'IS_VALID'
  ) {
    return <DataChartRadar {...props} />;
  }
  return <DataChartLine {...props} />;
};

const DataChart = ({
  activeChildren,
  sensorKey,
  data,
  handleChangeChildren,
}) => {
  if (!data) {
    return null;
  }
  return (
    <div
      key={sensorKey}
      style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}
    >
      <StyledButton
        active={activeChildren === sensorKey}
        onClick={handleChangeChildren(sensorKey)}
      >
        <StyledHeader>{SENSORS[sensorKey]}</StyledHeader>
      </StyledButton>
      {activeChildren === sensorKey && (
        <StyledWrapper>
          {getChart({
            key: sensorKey,
            data,
            dataKey: sensorKey,
          })}
        </StyledWrapper>
      )}
    </div>
  );
};

DataChart.defaultProps = {
  data: [],
};

DataChart.propTypes = {
  activeChildren: PT.string.isRequired,
  sensorKey: PT.string.isRequired,
  data: PT.arrayOf(PT.object),
  handleChangeChildren: PT.func.isRequired,
};

const checkPropsChange = (props, nextProps) =>
  props.activeChildren !== nextProps.activeChildren ||
  props.data.length !== nextProps.data.length ||
  props.data[0][props.sensorKey] !== nextProps.data[0][nextProps.sensorKey];

export default shouldUpdate(checkPropsChange)(DataChart);
