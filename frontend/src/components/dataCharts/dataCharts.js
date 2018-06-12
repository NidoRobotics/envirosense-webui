import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import pure from 'recompose/pure';

import colors from '../../constants/styles/colors';

import DataChartsGroup from './dataChartsGroup/dataChartsGroup';

const StyledWrapper = styled.div`
  box-shadow: 0 0 5px ${colors.blackA4};
`;

const DataCharts = ({
  activeChildren,
  activeGroup,
  enabledGroups,
  handleChangeChildren,
  handleChangeGroup,
}) => (
  <StyledWrapper>
    {enabledGroups.map(group => (
      <DataChartsGroup
        activeChildren={activeChildren}
        activeGroup={activeGroup}
        key={group.key}
        group={group}
        handleChangeGroup={handleChangeGroup}
        handleChangeChildren={handleChangeChildren}
      />
    ))}
  </StyledWrapper>
);

DataCharts.propTypes = {
  activeChildren: PT.string.isRequired,
  activeGroup: PT.string.isRequired,
  enabledGroups: PT.arrayOf(PT.object).isRequired,
  handleChangeGroup: PT.func.isRequired,
  handleChangeChildren: PT.func.isRequired,
};

export default pure(DataCharts);
