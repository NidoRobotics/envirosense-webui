import { createSelector } from 'reselect';
import deepMerge from 'deepmerge';
import groupBy from 'lodash.groupby';
import identity from 'lodash.identity';
import intersectionBy from 'lodash.intersectionby';
import mapValues from 'lodash.mapvalues';
import pickBy from 'lodash.pickby';
import toArray from 'lodash.toarray';

import GROUPS from '../../../constants/groups';

import filterByDistance from '../../../utils/buckets/filterByDistance';
import getBeautified from '../../../utils/buckets/getBeautified';
import getReducedAverages from '../../../utils/buckets/getReducedAverages';

import { sessionSelector } from '../selectors';
import { sessionDetailIsActiveSelector } from '../detail/selectors';

const bucketsSelector = createSelector(
  sessionSelector,
  session => session && session.buckets.data
);

export const bucketsCleaned = createSelector(bucketsSelector, buckets => {
  if (!buckets) {
    return [];
  }
  return buckets.map(bucket => ({
    ...pickBy(bucket, identity),
    TIME: bucket.TIME * 1000,
  }));
});

const filteredBucketsSelector = createSelector(bucketsCleaned, buckets =>
  filterByDistance(buckets)
);

const bucketsBeautifiedSelector = createSelector(bucketsCleaned, buckets =>
  buckets.map(getBeautified)
);

export const bucketsFilteredBeautifiedSelector = createSelector(
  bucketsBeautifiedSelector,
  filteredBucketsSelector,
  (beautifiedBuckets, filteredBuckets) =>
    intersectionBy(beautifiedBuckets, filteredBuckets, 'TIME')
);

export const coordinatesSelector = createSelector(
  bucketsFilteredBeautifiedSelector,
  markers => markers.map(marker => marker.COORDINATES)
);

export const bucketsCountSelector = createSelector(
  bucketsCleaned,
  buckets => (buckets ? buckets.length : 0)
);

const noTimeFilteredBuckets = createSelector(bucketsCleaned, buckets =>
  buckets.filter(bucket => !!bucket.TIME)
);

const lastBucketsSelector = createSelector(noTimeFilteredBuckets, buckets =>
  buckets.slice(-200)
);

const prevBucketsSelector = createSelector(noTimeFilteredBuckets, buckets =>
  buckets.slice(0, buckets.length - 200)
);

const filteredByTimeSelector = createSelector(
  prevBucketsSelector,
  sessionDetailIsActiveSelector,
  (buckets, isActive) =>
    isActive ? buckets.filter(bucket => bucket.TIME % 4000 === 0) : buckets
);

const filteredByIdSelector = createSelector(
  filteredByTimeSelector,
  (buckets, isActive) =>
    isActive ? buckets.filter(bucket => bucket.ID % 4 === 0) : buckets
);

const controlledBucketsSelector = createSelector(
  lastBucketsSelector,
  filteredByIdSelector,
  (lastBuckets, prevBuckets) => [...prevBuckets, ...lastBuckets]
);

const groupedByTimeBuckets = createSelector(
  controlledBucketsSelector,
  buckets => groupBy(buckets, bucket => bucket.TIME)
);

const bucketsGroupedByTimeSelector = createSelector(
  groupedByTimeBuckets,
  buckets => toArray(mapValues(buckets, getReducedAverages))
);

const standardBucketsByTypeWithTimeSelectors = createSelector(
  bucketsGroupedByTimeSelector,
  buckets =>
    deepMerge.all(
      buckets.map(bucket =>
        mapValues(bucket, (value, key) => {
          if (key === 'MAGNETICCOMPASS') {
            return [
              {
                TIME: +bucket.TIME,
                [key]: `${value} ${bucket.LAT_H ? bucket.LAT_H : ''} ${
                  bucket.LONG_H ? bucket.LONG_H : ''
                }`,
              },
            ];
          }
          if (key === 'IS_VALID') {
            return [
              {
                TIME: +bucket.TIME,
                [key]: value === 'true' || value === true ? 1 : +value,
              },
            ];
          }
          return [{ TIME: +bucket.TIME, [key]: value }];
        })
      )
    )
);

export const bucketsByTypeWithTimeSelector = createSelector(
  standardBucketsByTypeWithTimeSelectors,
  buckets => {
    const newMagneticCompass = buckets.MAGNETICCOMPASS
      ? toArray(
          mapValues(
            groupBy(
              buckets.MAGNETICCOMPASS.map(bucket => bucket.MAGNETICCOMPASS),
              value => value
            ),
            (value, key) => ({ MAGNETICCOMPASS: value.length, TIME: key })
          )
        )
      : [];
    const newGPSCompass = !buckets.GPSCOMPASS
      ? buckets.GPSCOMPASS
      : toArray(
          mapValues(
            groupBy(
              buckets.GPSCOMPASS.map(bucket => bucket.GPSCOMPASS),
              value => value
            ),
            (value, key) => ({ GPSCOMPASS: value.length, TIME: key })
          )
        );
    const newLatCompass = buckets.LAT
      ? toArray(
          mapValues(
            groupBy(
              buckets.LAT.map(bucket => parseFloat(+bucket.LAT.toFixed(5))),
              value => value
            ),
            (value, key) => ({ LAT: value.length, TIME: key })
          )
        )
      : [];
    const newLongCompass = buckets.LONG
      ? toArray(
          mapValues(
            groupBy(
              buckets.LONG.map(bucket => parseFloat(+bucket.LONG.toFixed(5))),
              value => value
            ),
            (value, key) => ({ LONG: value.length, TIME: key })
          )
        )
      : [];
    const isValid = buckets.IS_VALID
      ? toArray(
          mapValues(
            groupBy(
              buckets.IS_VALID.map(bucket => bucket.IS_VALID),
              value => value
            ),
            (value, key) => ({ IS_VALID: value.length, TIME: +key })
          )
        )
      : [];
    return {
      ...buckets,
      MAGNETICCOMPASS: newMagneticCompass,
      GPSCOMPASS: newGPSCompass,
      LAT: newLatCompass,
      LONG: newLongCompass,
      IS_VALID:
        isValid.length === 1 ? [...isValid, { IS_VALID: 0, TIME: 0 }] : isValid,
    };
  }
);

export const enabledGroupsSelector = createSelector(
  standardBucketsByTypeWithTimeSelectors,
  buckets => {
    const enabledSensors = Object.keys(buckets);
    return GROUPS.map(group => ({
      ...group,
      children: group.children.filter(child => enabledSensors.includes(child)),
    })).filter(group => group.children.length);
  }
);

export const bucketsMergedDataSelector = createSelector(
  bucketsBeautifiedSelector,
  buckets => buckets && deepMerge.all(buckets)
);
