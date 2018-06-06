import { handleActions } from 'redux-actions';

import { DEFAULT_API_STATE } from '../../../constants/api';
import AC from '../../actions';

import defaultApiReducers from '../../../utils/getDefaultApiReducers';

const initialState = {
  ...DEFAULT_API_STATE,
};

export default handleActions(
  {
    [AC.endSession.start]: defaultApiReducers.start,
    [AC.endSession.success]: defaultApiReducers.success,
    [AC.endSession.error]: defaultApiReducers.error,
    [AC.endSession.reset]: () => initialState,
  },
  initialState
);
