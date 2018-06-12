import styled from 'styled-components';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import font from '../../../constants/styles/font';

const StyledHeading = styled.h1`
  font-size: ${font.sizes.md};
  margin: -2px 0 0;
`;

export default onlyUpdateForKeys(['children'])(StyledHeading);
