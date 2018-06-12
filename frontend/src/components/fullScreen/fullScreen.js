import styled from 'styled-components';
import styledMap from 'styled-map';

import colors from '../../constants/styles/colors';

const StyledFullScreen = styled.div`
  align-items: center;
  background: ${styledMap({
    clear: colors.grayT5,
    default: colors.primaryD3,
  })};
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: ${styledMap({
    start: 'flex-start',
    default: 'center',
  })};
  width: 100%;
`;

export default StyledFullScreen;
