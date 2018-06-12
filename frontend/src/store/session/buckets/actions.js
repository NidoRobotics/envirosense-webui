import { createActions } from 'redux-actions';

import parseBucket from '../../../utils/buckets/parseBucket';

export default createActions({
  BUCKETS: {
    RESET: () => {},
    DATA: {
      PUSH: buckets => buckets.map(parseBucket),
      RESET: () => {},
      SET: buckets => buckets.map(parseBucket),
    },
    BUFFER: {
      PUSH: bucket => bucket,
      PERSIST: () => {},
      RESET: () => {},
    },
  },
});
