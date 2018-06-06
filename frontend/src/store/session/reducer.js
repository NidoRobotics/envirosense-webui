import { combineReducers } from 'redux';

import active from './active/reducer';
import buckets from './buckets/reducer';
import create from './create/reducer';
import detail from './detail/reducer';

export default combineReducers({
  active,
  buckets,
  create,
  detail,
});
