export default (time, roundFactor = 2000) =>
  parseInt(time / roundFactor, 10) * roundFactor;
