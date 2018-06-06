import { combineReducers } from 'redux';

import charts from './charts/reducer';
import map from './map/reducer';
import tabs from './tabs/reducer';

export default combineReducers({
  charts,
  map,
  tabs,
});
