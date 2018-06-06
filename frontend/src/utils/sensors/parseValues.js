import toTimeString from '../toTimeString';

export default (key, value) => {
  if (!value) {
    return '-';
  }
  if (key === 'TIME') {
    if (typeof value === 'string') {
      return value;
    }
    return toTimeString(value);
  }
  if (key === 'WATERTMP1' || key === 'WATERTMP2' || key === 'WATERTMP3') {
    return `${value.toFixed(2)} ºC`;
  }
  if (key === 'MAGNETICCOMPASS' || key === 'GPSCOMPASS') {
    if (typeof value === 'string') {
      return value;
    }
    return `${value.toFixed(2)} º`;
  }
  if (key === 'ORP') {
    if (typeof value === 'string') {
      return value;
    }
    return value.toFixed(2);
  }
  if (key === 'LAT' || key === 'LONG') {
    return parseFloat(value).toFixed(7);
  }
  if (
    key === 'DEPTHTOTAL' ||
    key === 'DEPTHTOSURFACE' ||
    key === 'DEPTHTOBOTTOM'
  ) {
    return `${value.toFixed(3)} m`;
  }
  if (key === 'SG') {
    return `${value} kg/m³`;
  }
  if (key === 'ORP') {
    return `${value} ppm`;
  }
  if (key === 'PRESS') {
    return `${value} Pa`;
  }
  if (key === 'IS_VALID') {
    return value === 'true' || value === 1 ? 'Sí' : 'No';
  }
  return value;
};
