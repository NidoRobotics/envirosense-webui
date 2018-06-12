import styled from 'styled-components';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

const DataTablesParentHeader = styled.span`
  background: ${colors.primaryS5};
  border-right-color: ${colors.primaryS3};
  color: ${colors.white};
  display: block;
  font-size: ${font.sizes.xs};
  font-weight: 700;
  padding: ${sizes.xs} ${sizes.sm};
  text-transform: uppercase;
`;

export default onlyUpdateForKeys(['children'])(DataTablesParentHeader);
