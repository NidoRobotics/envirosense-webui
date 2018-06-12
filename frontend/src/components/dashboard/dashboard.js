import React from 'react';
import styled from 'styled-components';

import colors from '../../constants/styles/colors';
import sizes from '../../constants/styles/sizes';

import DataBoxes from '../dataBoxes/dataBoxesContainer';
import NidoMap from '../nidoMap/nidoMapContainer';

const dashboardFlex = 50;

const StyledWrapper = styled.div`
  display: flex;
  flex: 100;
`;

const StyledDataBoxes = styled.div`
  background: ${colors.grayT9};
  box-shadow: inset -1px 1px 1px ${colors.grayA2};
  display: flex;
  flex: ${dashboardFlex};
  flex-direction: column;
  justify-content: center;
  padding: ${sizes.md};
`;

const StyledMap = styled.div`
  flex: ${100 - dashboardFlex};
  position: relative;
`;

const DashBoard = () => (
  <StyledWrapper>
    <StyledDataBoxes>
      <DataBoxes />
    </StyledDataBoxes>
    <StyledMap>
      <NidoMap />
    </StyledMap>
  </StyledWrapper>
);

export default DashBoard;
