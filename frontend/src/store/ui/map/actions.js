import { createActions } from 'redux-actions';

export default createActions({
  MAP: {
    RESET: () => {},
    SET_ACTIVE_MARKER: marker => marker,
  },
});
