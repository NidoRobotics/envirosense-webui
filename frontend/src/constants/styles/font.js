import { modularScale, stripUnit } from 'polished';

const defaultSize = 1.6;
const scaleSize = steps =>
  `${stripUnit(modularScale(steps, defaultSize, 'minorThird'))}rem`;
const sizes = {
  xxs: scaleSize(-3),
  xs: scaleSize(-2),
  sm: scaleSize(-1),
  md: scaleSize(0),
  lg: scaleSize(1),
  xl: scaleSize(2),
  xxl: scaleSize(3),
};

const font = {
  rootSize: '62.5%',
  family:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  sizes,
};

export default font;
