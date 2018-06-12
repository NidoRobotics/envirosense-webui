import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import styledMap from 'styled-map';

import colors from '../../constants/styles/colors';
import font from '../../constants/styles/font';
import sizes from '../../constants/styles/sizes';

import TopHeading from './topHeading/topHeading';

const StyledWrapper = styled.div`
  background: ${colors.primaryS8};
  border-bottom: 2px solid ${colors.primaryS4};
  color: ${colors.white};
  display: flex;
  justify-content: ${styledMap({
    center: 'center',
    default: 'space-between',
  })};
  padding: ${sizes.sm} ${sizes.md};
  width: 100%;
`;

const StyledGroup = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  > Button {
    margin-left: ${sizes.md};
  }
`;

const StyledLabel = styled.p`
  font-size: ${font.sizes.sm};
  font-weight: 500;
  margin: 0 ${sizes.xl} 0 ${sizes.sm};
`;

const TopBar = props => (
  <StyledWrapper>
    <StyledGroup>
      <TopHeading>{props.title}</TopHeading>
      {props.subtitle && <StyledLabel>{props.subtitle}</StyledLabel>}
      {props.innerLeftContent && props.innerLeftContent}
    </StyledGroup>
    {props.rightContent && <StyledGroup>{props.rightContent}</StyledGroup>}
  </StyledWrapper>
);

TopBar.defaultProps = {
  innerLeftContent: null,
  rightContent: null,
  subtitle: null,
};

TopBar.propTypes = {
  innerLeftContent: PT.node,
  rightContent: PT.node,
  subtitle: PT.string,
  title: PT.string.isRequired,
};

export default TopBar;
