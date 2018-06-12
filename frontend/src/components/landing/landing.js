import React from 'react';
import PT from 'prop-types';

import FullScreenWithLogo from '../fullScreenWithLogo/fullScreenWithLogo';
import LandingLoading from './landingLoading/landingLoading';

const Landing = ({ isLoading }) =>
  isLoading && (
    <FullScreenWithLogo>
      <LandingLoading />
    </FullScreenWithLogo>
  );

Landing.defaultProps = {
  isLoading: true,
};

Landing.propTypes = {
  isLoading: PT.bool,
};

export default Landing;
