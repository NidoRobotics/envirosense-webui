import { createSelector } from 'reselect';

import { uiSelector } from '../selectors';

export const tabsSelector = createSelector(uiSelector, ui => ui.tabs);

export default {
  tabsSelector,
};
