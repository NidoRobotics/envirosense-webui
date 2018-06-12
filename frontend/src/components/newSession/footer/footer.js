import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

const StyledFooter = styled.div`
  background: ${colors.whiteA5};
  font-size: ${font.sizes.md};
  font-weight: 500;
  padding: ${sizes.xs};
  text-align: center;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  border-bottom: 1px dashed ${colors.primary};
  color: ${colors.primary};
  display: inline-block;
  letter-spacing: -0.3px;
  margin: ${sizes.xxs} 0;
  padding: ${sizes.xxxs} ${sizes.xs};
  text-decoration: none;
`;

const Footer = () => (
  <StyledFooter>
    <StyledLink to="/historial">Historial de mediciones</StyledLink>
  </StyledFooter>
);

export default Footer;
