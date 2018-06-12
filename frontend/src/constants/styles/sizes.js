import { modularScale, stripUnit } from 'polished';

const defaultSize = 1.5;
const scaleSize = steps =>
  `${stripUnit(modularScale(steps, defaultSize, 'perfectFourth'))}rem`;

const sizes = {
  xxxxs: scaleSize(-5),
  xxxs: scaleSize(-4),
  xxs: scaleSize(-3),
  xs: scaleSize(-2),
  sm: scaleSize(-1),
  md: scaleSize(0),
  lg: scaleSize(1),
  xl: scaleSize(2),
  xxl: scaleSize(3),
  xxxl: scaleSize(4),
};

export default sizes;
