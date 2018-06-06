import { handleActions } from 'redux-actions';

import { DEFAULT_API_STATE } from '../../../constants/api';
import AC from '../../actions';

import defaultApiReducers from '../../../utils/getDefaultApiReducers';

const initialState = {
  ...DEFAULT_API_STATE,
  data: null,
};

const apiReducers = defaultApiReducers('fetched');

export default handleActions(
  {
    [AC.session.detail.fetch.start]: apiReducers.start,
    [AC.session.detail.fetch.success]: apiReducers.success,
    [AC.session.detail.fetch.error]: apiReducers.error,
    [AC.session.active.reset]: () => initialState,
  },
  initialState
);
