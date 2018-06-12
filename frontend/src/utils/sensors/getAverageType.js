export default key => {
  if (key === 'VALUES') {
    return 'PLAIN_VALUE';
  }
  if (key === 'LAT_H' || key === 'LONG_H' || key === 'IS_VALID') {
    return 'MORE_REPEATED_VALUE';
  }
  if (key === 'TIME') {
    return 'TIME_VALUE';
  }
  if (
    key === 'MAGNETICCOMPASS' ||
    key === 'GPSCOMPASS' ||
    key === 'WATERTMP1' ||
    key === 'WATERTMP2' ||
    key === 'WATERTMP3' ||
    key === 'DEPTHTOTAL' ||
    key === 'DEPTHTOSURFACE' ||
    key === 'DEPTHTOBOTTOM' ||
    key === 'ORP' ||
    key === 'PRESS'
  ) {
    return 'FIXED_VALUE_SMALL';
  }
  if (key === 'GPSSNR' || key === 'GPSSATS' || key === 'ID') {
    return 'ROUNDED_VALUE';
  }
  return 'FIXED_VALUE_BIG';
};
