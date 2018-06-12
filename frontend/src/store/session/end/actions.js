import { createActions } from 'redux-actions';

export default createActions({
  END_SESSION: {
    START: () => {},
    SUCCESS: response => response,
    ERROR: error => error,
    RESET: () => {},
  },
});
