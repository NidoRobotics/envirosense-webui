import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import styledMap from 'styled-map';
import { timingFunctions } from 'polished';
import { onlyUpdateForKeys, pure } from 'recompose';

import colors from '../../constants/styles/colors';
import font from '../../constants/styles/font';
import sizes from '../../constants/styles/sizes';

const getButtonHoverStyles = () => ({
  danger: `
      background: ${colors.dangerT1};
      box-shadow: 0 1px 6px ${colors.blackA7};
    `,
  disabled: `
      cursor: progress;
    `,
  success: `
      background: ${colors.successT1};
      box-shadow: 0 1px 6px ${colors.blackA7};
    `,
  transparent: `
      color: ${colors.primaryT7};
    `,
  default: `
      background: ${colors.primaryT1};
      box-shadow: 0 1px 6px ${colors.blackA7};
    `,
});

const StyledButton = styled.button`
  background: ${styledMap({
    danger: colors.danger,
    disabled: colors.grayT6,
    success: colors.success,
    transparent: 'transparent',
    default: colors.primary,
  })};
  border: 0;
  border-radius: 0;
  box-shadow: ${styledMap({
    transparent: 'none',
    default: `0 1px 3px ${colors.blackA3}`,
  })};
  color: ${colors.white};
  cursor: pointer;
  display: inline-block;
  font-size: ${styledMap({
    lg: font.sizes.md,
    default: font.sizes.xs,
  })};
  font-weight: 700;
  letter-spacing: -0.3px;
  line-height: 1;
  outline: 0;
  padding: ${styledMap({
    lg: sizes.md,
    default: `${sizes.xs} ${sizes.sm}`,
  })};
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ${timingFunctions('easeOutBack')};
  &:hover {
    ${styledMap(getButtonHoverStyles())};
  }
`;

const StyledLink = StyledButton.withComponent(Link);

const StyledLinkA = StyledButton.withComponent('a');

const getComponent = props => {
  if (props.href) {
    return StyledLinkA;
  }
  if (props.to) {
    return StyledLink;
  }
  return StyledButton;
};

const Button = onlyUpdateForKeys([
  'danger',
  'disabled',
  'success',
  'transparent',
  'lg',
])(props => {
  const Component = getComponent(props);
  return <Component {...props} />;
});

Button.defaultProps = {
  to: undefined,
  href: undefined,
};

Button.propTypes = {
  to: PT.string,
  href: PT.string,
};

export default pure(Button);
