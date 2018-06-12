import { createSelector } from 'reselect';

import { uiSelector } from '../selectors';

export const chartsSelector = createSelector(uiSelector, ui => ui.charts);

export const activeGroupSelector = createSelector(
  chartsSelector,
  charts => charts.activeGroup
);
export const activeChildrenSelector = createSelector(
  chartsSelector,
  charts => charts.activeChildren
);

export default {
  chartsSelector,
  activeGroupSelector,
  activeChildrenSelector,
};
