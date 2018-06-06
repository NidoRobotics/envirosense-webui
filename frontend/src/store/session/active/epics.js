import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import AC from '../actions';

import { AJAX_CONFIG } from '../../../constants/api';
import api from '../../../services/api';

/**
 * Fetch Active Session
 */
export const activeSessionFetchEpic = action$ =>
  action$.ofType(AC.session.active.fetch.start.toString()).mergeMap(() =>
    api
      .getActiveSession()
      .map(response => AC.session.active.fetch.success(response))
      .catch(error =>
        Observable.concat(
          Observable.of(AC.session.active.fetch.error(error)),
          Observable.of(AC.session.active.fetch.start()).delay(
            AJAX_CONFIG.DELAY_RETRY_TIME
          )
        )
      )
  );

export const activeSessionFinishEpic = action$ =>
  action$
    .ofType(AC.session.active.finish.start.toString())
    .mergeMap(({ payload }) =>
      api
        .finishSession(payload)
        .map(response => {
          if (!response.status) {
            return AC.session.active.finish.error();
          }
          return AC.session.active.reset();
        })
        .catch(error =>
          Observable.concat(
            Observable.of(AC.session.active.finish.error(error)),
            Observable.of(AC.session.active.finish.start(payload)).delay(
              AJAX_CONFIG.DELAY_RETRY_TIME
            )
          )
        )
        .map(() => AC.session.active.fetch.start())
    );

export default combineEpics(activeSessionFetchEpic, activeSessionFinishEpic);
