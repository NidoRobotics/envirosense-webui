import React from 'react';
import styled from 'styled-components';

import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

import Loading from '../../loading/loading';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMessage = styled.p`
  font-weight: 700;
  font-size: ${font.sizes.xl};
  margin-top: ${sizes.md};
`;

const LandingLoading = () => (
  <StyledWrapper>
    <Loading />
    <StyledMessage>Cargando datos...</StyledMessage>
  </StyledWrapper>
);

export default LandingLoading;
