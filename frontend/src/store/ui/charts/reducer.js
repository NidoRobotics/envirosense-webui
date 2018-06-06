import { handleActions } from 'redux-actions';

import GROUPS from '../../../constants/groups';
import AC from '../../actions';

const initialState = {
  activeGroup: GROUPS[0].key,
  activeChildren: GROUPS[0].children[0],
};

export default handleActions(
  {
    [AC.ui.charts.reset]: () => initialState,
    [AC.ui.charts.setActiveGroup]: (state, { payload }) => ({
      activeGroup: payload,
      activeChildren:
        GROUPS[GROUPS.findIndex(group => group.key === payload)].children[0],
    }),
    [AC.ui.charts.setActiveChildren]: (state, { payload }) => ({
      ...state,
      activeChildren: payload,
    }),
  },
  initialState
);
