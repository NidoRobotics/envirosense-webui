import styled from 'styled-components';
import styledMap from 'styled-map';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

const DataTablesHeader = styled.span`
  background: ${colors.grayT5};
  border-right-color: ${colors.grayS3};
  color: ${colors.blackT2};
  display: block;
  font-size: ${font.sizes.xs};
  font-weight: 700;
  padding: ${sizes.xs};
  text-align: ${styledMap('align', {
    center: 'center',
    right: 'right',
    default: 'left',
  })};
  text-transform: uppercase;
`;

export default onlyUpdateForKeys(['children'])(DataTablesHeader);
