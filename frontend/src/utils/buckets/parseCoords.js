export default bucket =>
  bucket.LAT && bucket.LONG
    ? { ...bucket, LAT: +bucket.LAT, LONG: +bucket.LONG }
    : bucket;
