import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import AC from '../../actions';

import { AJAX_CONFIG } from '../../../constants/api';
import api from '../../../services/api';

/**
 * Fetch session data && buckets
 */

export default action$ =>
  action$
    .ofType(AC.session.detail.fetch.start.toString())
    .mergeMap(({ payload }) =>
      api
        .getSessionData(payload)
        .mergeMap(response =>
          Observable.concat(
            Observable.of(AC.session.detail.fetch.success(response)),
            Observable.of(AC.session.buckets.data.set(response.buckets))
          )
        )
        .catch(error =>
          Observable.concat(
            Observable.of(AC.session.detail.fetch.error(error)),
            Observable.of(AC.session.detail.fetch.start(payload)).delay(
              AJAX_CONFIG.DELAY_RETRY_TIME
            )
          )
        )
    );
