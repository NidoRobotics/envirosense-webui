import { createSelector } from 'reselect';

import searchIn from '../../utils/searchIn';

export const dataSelector = state => state.history.data;
export const filterSelector = state => state.history.filter;

export const filteredDataSelector = createSelector(
  dataSelector,
  filterSelector,
  (data, filter) => (
    filter.length
      ? data.filter(item => searchIn(item.title, filter))
      : data
  ),
);
