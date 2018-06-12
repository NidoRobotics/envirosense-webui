import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import styledMap from 'styled-map';
import { onlyUpdateForKeys } from 'recompose';

import colors from '../../../../constants/styles/colors';
import font from '../../../../constants/styles/font';
import sizes from '../../../../constants/styles/sizes';

const StyledTabs = styled.div`
  padding: 0 ${sizes.sm};
`;

const StyledTab = onlyUpdateForKeys(['active'])(styled.button`
  background: ${styledMap({
    active: 'transparent',
    default: colors.primaryT1,
  })};
  border: 0;
  margin-right: 2px;
  color: ${colors.white};
  cursor: ${styledMap({
    active: 'default',
    default: 'pointer',
  })};
  display: inline-block;
  font-size: ${font.sizes.xs};
  font-weight: 700;
  outline: 0;
  padding: ${sizes.xs} ${sizes.md};
  text-transform: uppercase;
`);

const buildTabsContent = data =>
  data.map(dataItem => (
    <StyledTab
      active={dataItem.active}
      key={dataItem.text}
      onClick={dataItem.handleClick}
    >
      {dataItem.text}
    </StyledTab>
  ));

const SessionTabsLinks = ({ data }) => (
  <StyledTabs>{buildTabsContent(data)}</StyledTabs>
);

SessionTabsLinks.propTypes = {
  data: PT.arrayOf(
    PT.shape({
      active: PT.bool,
      handleClick: PT.func,
      text: PT.string,
    })
  ).isRequired,
};

export default SessionTabsLinks;
