import { handleActions } from 'redux-actions';

import { DEFAULT_API_STATE } from '../../../constants/api';
import AC from '../../actions';

import defaultApiReducers from '../../../utils/getDefaultApiReducers';

const initialState = {
  ...DEFAULT_API_STATE,
  isSubmitting: false,
  value: '',
};

export default handleActions(
  {
    [AC.session.create.send.start]: defaultApiReducers.start,
    [AC.session.create.send.success]: defaultApiReducers.success,
    [AC.session.create.send.error]: defaultApiReducers.error,
    [AC.session.create.cleanErrors]: state => ({ ...state, errors: [] }),
    [AC.session.create.setValue]: (state, { payload }) => ({
      ...state,
      value: payload,
    }),
    [AC.session.create.reset]: () => initialState,
  },
  initialState
);
