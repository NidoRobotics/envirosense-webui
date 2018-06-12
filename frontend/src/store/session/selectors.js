import { createSelector } from 'reselect';

// @todo BORRAR
import parseSessionName from '../../utils/parseSessionName';
import truncateText from '../../utils/truncateText';
// @eotodo

export const sessionSelector = state => state && state.session;

// @todo BORRAR
export const sessionErrorsSelector = state => state.errors;

const sessionDataSelector = state => state.data;

const sessionFetchedSelector = state => state.fetched;

export const sessionIdSelector = createSelector(
  sessionDataSelector,
  data => data && data.id
);

const sessionNameSelector = createSelector(
  sessionDataSelector,
  data => (data ? data.name : '')
);

export const sessionNameTruncatedSelector = createSelector(
  sessionNameSelector,
  name => truncateText(parseSessionName(name), 20)
);

export const isLoadingSelector = createSelector(
  sessionDataSelector,
  sessionFetchedSelector,
  (data, fetched) => !data && !fetched
);
// @eotodo

export default {
  sessionSelector,
};
