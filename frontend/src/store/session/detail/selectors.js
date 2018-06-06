import { createSelector } from 'reselect';

import { sessionSelector } from '../selectors';
import { sessionActiveIdSelector } from '../active/selectors';

const sessionDetailSelector = createSelector(
  sessionSelector,
  session => session.detail
);

export const sessionDetailErrorsSelector = createSelector(
  sessionDetailSelector,
  sessionDetail => sessionDetail.errors
);

export const sessionDetailFetchedSelector = createSelector(
  sessionDetailSelector,
  sessionDetail => sessionDetail.fetched
);

export const sessionDetailDataSelector = createSelector(
  sessionDetailSelector,
  sessionDetail => sessionDetail && sessionDetail.data
);

export const sessionDetailNameSelector = createSelector(
  sessionDetailDataSelector,
  sessionDetailData => (sessionDetailData ? sessionDetailData.name : '')
);

export const sessionDetailIdSelector = createSelector(
  sessionDetailDataSelector,
  sessionDetailData => sessionDetailData && sessionDetailData.id
);

export const sessionDetailIsActiveSelector = createSelector(
  sessionDetailIdSelector,
  sessionActiveIdSelector,
  (detailId, activeId) => detailId === activeId
);
