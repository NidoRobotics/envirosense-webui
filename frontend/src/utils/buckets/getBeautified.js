export default bucket => {
  const parsedData = {
    ...bucket,
    COORDINATES: [bucket.LONG, bucket.LAT],
    MAGNETICCOMPASS: `${
      bucket.MAGNETICCOMPASS ? `${bucket.MAGNETICCOMPASS} ` : ''
    }${bucket.LAT_H ? bucket.LAT_H : ''} ${bucket.LONG_H ? bucket.LONG_H : ''}`,
  };
  const { LAT_H, LONG_H, ...returnedData } = parsedData;
  return returnedData;
};
