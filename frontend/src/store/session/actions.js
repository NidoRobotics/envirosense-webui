import activeActions from './active/actions';
import bucketsActions from './buckets/actions';
import createActions from './create/actions';
import detailActions from './detail/actions';

export default {
  session: {
    ...activeActions,
    ...bucketsActions,
    ...createActions,
    ...detailActions,
  },
};
