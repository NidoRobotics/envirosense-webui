import React from 'react';
import styled from 'styled-components';
import styledMap from 'styled-map';
import { onlyUpdateForKeys } from 'recompose';

import logoSrc from './logo.png';

const StyledImg = styled.img`
  width: ${styledMap({
    sm: '65px',
    default: 'auto',
  })};
`;

const Logo = props => (
  <StyledImg src={logoSrc} alt="Nido Robotics" {...props} />
);

export default onlyUpdateForKeys(['size'])(Logo);
