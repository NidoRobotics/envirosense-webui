import { combineReducers } from 'redux';

import history from './history/reducer';
import nidoSocket from './nidoSocket/reducer';
import session from './session/reducer';
import ui from './ui/reducer';

export default combineReducers({
  history,
  nidoSocket,
  session,
  ui,
});
