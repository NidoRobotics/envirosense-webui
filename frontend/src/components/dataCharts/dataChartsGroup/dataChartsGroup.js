import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import shouldUpdate from 'recompose/shouldUpdate';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

import DataChartsGroupContent from './dataChartsGroupContent';

const isAllowed = sensorKey => sensorKey !== 'TIME';

const StyledGroup = styled.div`
  border-bottom: 1px solid ${colors.grayS9};
  &:last-child {
    border-bottom: 0;
  }
`;

const StyledButton = onlyUpdateForKeys(['children'])(styled.button`
  appearance: none;
  background: ${colors.grayS7};
  border: 0;
  color: ${colors.grayT8};
  cursor: pointer;
  display: block;
  margin: 0;
  outline: 0;
  padding: ${sizes.md};
  width: 100%;
  &:hover {
    background: ${colors.primaryT1};
  }
`);

const StyledHeader = styled.h2`
  font-size: ${font.sizes.sm};
  margin: 0 auto;
  text-align: left;
  text-transform: uppercase;
`;

const DataChartsGroup = ({
  activeChildren,
  activeGroup,
  group,
  handleChangeGroup,
  handleChangeChildren,
}) => (
  <StyledGroup key={group.key}>
    <StyledButton onClick={handleChangeGroup(group.key)}>
      <StyledHeader>{group.name}</StyledHeader>
    </StyledButton>
    {activeGroup === group.key && (
      <DataChartsGroupContent
        activeChildren={activeChildren}
        handleChangeChildren={handleChangeChildren}
        sensorKeys={group.children.filter(isAllowed)}
      />
    )}
  </StyledGroup>
);

DataChartsGroup.propTypes = {
  activeChildren: PT.string.isRequired,
  activeGroup: PT.string.isRequired,
  group: PT.shape({
    key: PT.string,
    name: PT.string,
  }).isRequired,
  handleChangeChildren: PT.func.isRequired,
  handleChangeGroup: PT.func.isRequired,
};

const checkPropsChange = (props, nextProps) =>
  props.activeChildren !== nextProps.activeChildren ||
  props.activeGroup !== nextProps.activeGroup;

export default shouldUpdate(checkPropsChange)(DataChartsGroup);
