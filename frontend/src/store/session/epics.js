import { combineEpics } from 'redux-observable';

import activeEpics from './active/epics';
import createEpics from './create/epics';
import detailEpics from './detail/epics';

export default combineEpics(activeEpics, createEpics, detailEpics);
