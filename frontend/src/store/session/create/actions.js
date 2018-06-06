import { createActions } from 'redux-actions';

import toTimeString from '../../../utils/toTimeString';

export default createActions({
  CREATE: {
    SEND: {
      START: name => ({
        name: name || `Sin título ${toTimeString(Date.now())}`,
      }),
      SUCCESS: response => response,
      ERROR: error => error,
    },
    SET_VALUE: value => value,
    CLEAN_ERRORS: () => {},
    RESET: () => {},
  },
});
