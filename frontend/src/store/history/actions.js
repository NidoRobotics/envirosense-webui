import { createActions } from 'redux-actions';

export default createActions({
  HISTORY: {
    FETCH: {
      START: () => {},
      SUCCESS: response => response,
      ERROR: error => error,
    },
    FILTER: payload => payload,
  },
});
