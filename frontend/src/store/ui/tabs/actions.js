import { createActions } from 'redux-actions';

export default createActions({
  TABS: {
    SET: payload => payload,
    RESET: () => {},
  },
});
