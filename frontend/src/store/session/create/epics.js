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
 * Create new session
 */
export default action$ =>
  action$
    .ofType(AC.session.create.send.start.toString())
    .mergeMap(({ payload }) =>
      api
        .createSession(payload)
        .mergeMap(response =>
          Observable.concat(
            Observable.of(AC.session.create.send.success(response)),
            Observable.of(AC.session.create.reset()),
            Observable.of(AC.session.active.fetch.start()),
            Observable.of(AC.nidoSocket.listen.start())
          )
        )
        .catch(error => {
          return Observable.concat(
            Observable.of(AC.session.create.send.error(error)),
            Observable.of(AC.session.create.send.start(payload)).delay(
              AJAX_CONFIG.DELAY_RETRY_TIME
            )
          );
        })
    );
