import { createSelector } from 'reselect';

import { sessionSelector } from '../selectors';

const sessionActiveSelector = createSelector(
  sessionSelector,
  session => session && session.active
);

export const sessionActiveErrorsSelector = createSelector(
  sessionActiveSelector,
  activeSession => activeSession.errors
);

const sessionActiveDataSelector = createSelector(
  sessionActiveSelector,
  activeSession => activeSession.data
);

export const sessionActiveIdSelector = createSelector(
  sessionActiveDataSelector,
  data => data && data.id
);

export const sessionActiveFetchedSelector = createSelector(
  sessionActiveSelector,
  activeSession => activeSession && activeSession.fetched
);

export const sessionActiveIsLoadingSelector = createSelector(
  sessionActiveIdSelector,
  sessionActiveFetchedSelector,
  (id, fetched) => !id && !fetched
);
