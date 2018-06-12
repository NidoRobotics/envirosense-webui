import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import styledMap from 'styled-map';
import { size } from 'polished';

import colors from '../../constants/styles/colors';

import loadingImg from './loading.gif';

const StyledBox = styled.div`
  background: ${colors.white};
  border-radius: 50%;
  display: inline-block;
  padding: ${styledMap({
    sm: '0.6rem',
    md: '1rem',
    default: '1.4rem',
  })};
`;

const StyledImg = styled.img`
  border-radius: 50%;
  display: block;
  ${styledMap({
    sm: size('4rem', '4rem'),
    md: size('6rem', '6rem'),
    default: size('auto', 'auto'),
  })};
  overflow: hidden;
`;

const Loading = props => (
  <StyledBox {...props}>
    <StyledImg src={loadingImg} alt="Loading" {...props} />
  </StyledBox>
);

Loading.defaultProps = {
  size: 'md',
};

Loading.propTypes = {
  size: PT.string,
};

export default Loading;
