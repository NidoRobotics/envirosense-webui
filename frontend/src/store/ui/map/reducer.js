import { handleActions } from 'redux-actions';

import AC from '../../actions';

const initialState = {
  activeMarker: null,
};

export default handleActions(
  {
    [AC.ui.map.reset]: () => initialState,
    [AC.ui.map.setActiveMarker]: (state, { payload }) => ({
      ...state,
      activeMarker: payload,
    }),
  },
  initialState
);
