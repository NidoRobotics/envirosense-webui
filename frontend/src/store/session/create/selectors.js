import { createSelector } from 'reselect';

import { sessionSelector } from '../selectors';

const sessionCreateSelector = createSelector(
  sessionSelector,
  session => session.create
);

export const sessionCreateErrorsSelector = createSelector(
  sessionCreateSelector,
  create => create.errors
);

export const sessionCreateValueSelector = createSelector(
  sessionCreateSelector,
  create => create.value
);

export const sessionCreateIsSubmittingSelector = createSelector(
  sessionCreateSelector,
  create => create.isSubmitting
);
