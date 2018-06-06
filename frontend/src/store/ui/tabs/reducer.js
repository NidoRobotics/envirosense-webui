import { handleActions } from 'redux-actions';

import AC from '../../actions';

const initialState = null;

export default handleActions(
  {
    [AC.ui.tabs.set]: (state, { payload }) => payload,
    [AC.ui.tabs.reset]: () => initialState,
  },
  initialState
);
