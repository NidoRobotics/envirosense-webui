import geodist from 'geodist';

import { map } from '../../config';

const checkDistance = (bucket1, bucket2) => {
  if (!bucket1.LAT || !bucket1.LONG) {
    return false;
  }
  if (+bucket1.LAT === 0 && +bucket1.LONG === 0) {
    return false;
  }
  if (!bucket2) {
    return true;
  }
  return (
    geodist(
      {
        lat: bucket1.LAT,
        lon: bucket1.LONG,
      },
      {
        lat: bucket2.LAT,
        lon: bucket2.LONG,
      },
      { exact: true, unit: map.distanceUnit }
    ) > map.minDistance
  );
};

export default buckets => {
  let lastBucketSaved = null;
  const filteredBuckets = buckets.filter(bucket => {
    if (checkDistance(bucket, lastBucketSaved)) {
      lastBucketSaved = bucket;
      return true;
    }
    return false;
  });
  return filteredBuckets;
};
