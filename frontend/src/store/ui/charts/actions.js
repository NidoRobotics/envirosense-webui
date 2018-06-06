import { createActions } from 'redux-actions';

export default createActions({
  CHARTS: {
    RESET: () => {},
    SET_ACTIVE_GROUP: group => group,
    SET_ACTIVE_CHILDREN: children => children,
  },
});
