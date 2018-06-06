import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import { onlyUpdateForKeys, shouldUpdate } from 'recompose';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

import DataBoxesItem from '../dataBoxesItem/dataBoxesItem';

const StyledGroup = styled.div``;

const StyledHeader = onlyUpdateForKeys(['children'])(styled.h3`
  background: ${colors.primaryS5};
  color: ${colors.white};
  font-size: ${font.sizes.xs};
  margin: 0;
  padding: ${sizes.xs} ${sizes.md};
  text-align: center;
  text-transform: uppercase;
`);

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${sizes.sm};
`;

const DataBoxesGroup = ({ sensorGroup }) => (
  <StyledGroup key={sensorGroup.key}>
    <StyledHeader>{sensorGroup.name}</StyledHeader>
    <StyledRow>
      {sensorGroup.children.map(child => (
        <DataBoxesItem key={child.key} sensorItem={child} />
      ))}
    </StyledRow>
  </StyledGroup>
);

DataBoxesGroup.propTypes = {
  sensorGroup: PT.shape({
    key: PT.string.isRequired,
    name: PT.string.isRequired,
    children: PT.arrayOf(PT.object),
  }).isRequired,
};

const checkPropsChange = (props, newProps) =>
  props.sensorGroup.name !== newProps.sensorGroup.name ||
  props.sensorGroup.children !== newProps.sensorGroup.children;

export default shouldUpdate(checkPropsChange)(DataBoxesGroup);
