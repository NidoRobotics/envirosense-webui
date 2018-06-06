export default sensorKey => {
  if (
    sensorKey === 'LAT' ||
    sensorKey === 'LONG' ||
    sensorKey === 'MAGNETICCOMPASS' ||
    sensorKey === 'GPSCOMPASS' ||
    sensorKey === 'TIME' ||
    sensorKey === 'WATERTMP1' ||
    sensorKey === 'WATERTMP2' ||
    sensorKey === 'WATERTMP3' ||
    sensorKey === 'IS_VALID'
  ) {
    return 'center';
  }
  if (
    sensorKey === 'DEPTHTOTAL' ||
    sensorKey === 'DEPTHTOSURFACE' ||
    sensorKey === 'DEPTHTOBOTTOM' ||
    sensorKey === 'GPSSNR' ||
    sensorKey === 'SG' ||
    sensorKey === 'ORP' ||
    sensorKey === 'PRESS' ||
    sensorKey === 'GPSSATS'
  ) {
    return 'right';
  }
  return 'left';
};
