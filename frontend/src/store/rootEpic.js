import { combineEpics } from 'redux-observable';

import historyFetchEpic from './history/epics';
import sessionEpics from './session/epics';
import {
  socketReceiveDataEpic,
  socketEmitEpic,
  socketStartEpic,
  socketStopEpic,
} from './nidoSocket/epics';

export default combineEpics(
  historyFetchEpic,
  sessionEpics,
  socketReceiveDataEpic,
  socketEmitEpic,
  socketStartEpic,
  socketStopEpic
);
