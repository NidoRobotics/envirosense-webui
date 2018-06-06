import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import { onlyUpdateForKeys, shouldUpdate } from 'recompose';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

const StyledChild = styled.div`
  border: 1px solid ${colors.blackT9};
  flex: 1;
  margin: ${sizes.xs};
  min-width: 12rem;
  text-align: center;
`;

const StyledChildTitle = onlyUpdateForKeys(['children'])(styled.h3`
  align-items: center;
  background: ${colors.primaryT8};
  color: ${colors.primaryD3};
  display: flex;
  font-size: 1.2rem;
  font-weight: 700;
  justify-content: center;
  margin: 0;
  min-height: 4rem;
  overflow: hidden;
  padding: ${sizes.xs} ${sizes.xxs};
  text-overflow: ellipsis;
`);

const StyledChildContent = onlyUpdateForKeys(['children'])(styled.p`
  color: ${colors.primaryD3};
  font-size: ${font.sizes.md};
  font-weight: bold;
  margin: 0;
  padding: ${sizes.xs} 0;
`);

const DataBoxesItem = ({ sensorItem }) => (
  <StyledChild key={sensorItem.key}>
    <StyledChildTitle>{sensorItem.name}</StyledChildTitle>
    <StyledChildContent>{sensorItem.value || '-'}</StyledChildContent>
  </StyledChild>
);

DataBoxesItem.propTypes = {
  sensorItem: PT.shape({
    key: PT.string.isRequired,
    name: PT.string.isRequired,
    value: PT.any,
  }).isRequired,
};

const checkPropsChange = (props, newProps) =>
  props.sensorItem.key !== newProps.sensorItem.key ||
  props.sensorItem.value !== newProps.sensorItem.value;

export default shouldUpdate(checkPropsChange)(DataBoxesItem);
