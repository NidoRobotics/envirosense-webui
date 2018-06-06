import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import shouldUpdate from 'recompose/shouldUpdate';

import sizes from '../../constants/styles/sizes';

import FullScreen from '../fullScreen/fullScreen';
import Logo from '../logo/logo';

const StyledLogo = shouldUpdate(() => false)(styled(Logo)`
  display: block;
  margin-bottom: ${sizes.xl};
`);

const FullScreenWithLogo = props => (
  <FullScreen>
    <StyledLogo />
    {props.children}
  </FullScreen>
);

FullScreenWithLogo.propTypes = {
  children: PT.element.isRequired,
};

export default FullScreenWithLogo;
