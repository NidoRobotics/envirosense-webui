import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import AC from './actions';
import { AJAX_CONFIG } from '../../constants/api';
import api from '../../services/api';

export default action$ =>
  action$.ofType('HISTORY/FETCH/START')
    .mergeMap(() =>
      api.listSessions()
        .map((response) => {
          if (!response.status) {
            return AC.history.fetch.error();
          }
          return AC.history.fetch.success(response.sessions);
        })
        .catch(error => Observable.concat(
          Observable.of(AC.history.fetch.error(error)),
          Observable.of(AC.history.fetch.start()).delay(AJAX_CONFIG.DELAY_RETRY_TIME),
        )));
