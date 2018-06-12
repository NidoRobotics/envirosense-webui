import deepMerge from 'deepmerge';
import mapValues from 'lodash.mapvalues';

import getAverageType from '../sensors/getAverageType';
import moreRepeatedValue from './moreRepeatedValue';

/**
 * Gets the averaged (or other algorithm parsed) value depending on sensor type
 * @param {*} key
 * @param {*} values
 */
const getParsedAverage = (key, values) => {
  if (!values.length) {
    return null;
  }
  const averageType = getAverageType(key);
  if (averageType === 'PLAIN_VALUE') {
    return values;
  }
  if (averageType === 'MORE_REPEATED_VALUE' || averageType === 'TIME_VALUE') {
    return moreRepeatedValue(values);
  }
  const average =
    values.reduce((prevValue, currentValue) => prevValue + +currentValue, 0) /
    values.length;
  if (averageType === 'FIXED_VALUE_SMALL') {
    return +average.toFixed(2);
  }
  if (averageType === 'ROUNDED_VALUE') {
    return Math.round(average);
  }
  return +average.toFixed(6);
};

/**
 * Returns an object with all property values in an array
 *
 * {
 *   sensorKey: [value1, value2, value3]
 * }
 *
 * @param {*} buckets
 */
const getTotals = buckets => {
  const bucketsWithArrValues = buckets.map(bucket =>
    mapValues(bucket, value => [value])
  );
  return deepMerge.all(bucketsWithArrValues);
};

export default buckets => {
  const totals = getTotals(buckets);
  const averages = mapValues(totals, (value, key) =>
    getParsedAverage(key, value)
  );
  return averages;
};
