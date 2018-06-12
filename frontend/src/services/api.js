import { Observable } from 'rxjs/Observable';
import qs from 'qs';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/timeout';

import { AJAX_CONFIG, API_SERVER_URL, HTTP_METHODS } from '../constants/api';
import HTTP_CODES from '../constants/httpCodes';
import parseAjaxError from '../utils/parseAjaxError';

/**
 * Should we try again for that status???
 *
 * @param {any} status
 * @returns
 */
function needRetry(status) {
  return (
    status === HTTP_CODES.UNKNOWN ||
    status === HTTP_CODES.GATEWAY_TIMEOUT ||
    status === HTTP_CODES.REQUEST_TIMEOUT ||
    status >= HTTP_CODES.INTERNAL_SERVER_ERROR
  );
}

/**
 * Make a request with some standard options
 * @param {*} method
 * @param {*} opts
 * @returns {Observable}
 */
const makeRequest = (method, opts) =>
  Observable.ajax({
    crossDomain: true,
    method,
    timeout: AJAX_CONFIG.TIMEOUT,
    ...opts,
  })
    .debounceTime(500)
    .retryWhen(err$ =>
      err$
        .mergeMap(
          res =>
            needRetry(res.status)
              ? Observable.of(res).delay(AJAX_CONFIG.DELAY_RETRY_TIME)
              : Observable.throw(res)
        )
        .take(AJAX_CONFIG.RETRIES)
        .concat(
          Observable.throw({
            status: HTTP_CODES.UNKNOW,
            response: 'max-retries',
          }),
          Observable.of(() => makeRequest(method, opts)).delay(
            AJAX_CONFIG.DELAY_RETRY_TIME
          )
        )
    )
    .timeout(AJAX_CONFIG.TIMEOUT)
    .map(res => res.response)
    .catch(err => Observable.throw(parseAjaxError(err)))
    .take(1);

/**
 * Basic GET/POST methods
 */
const requester = {
  get: (url, opts = {}) => makeRequest(HTTP_METHODS.GET, { ...opts, url }),
  post: (url, data, opts = {}) =>
    makeRequest(HTTP_METHODS.POST, {
      ...opts,
      url,
      body: qs.stringify(data),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    }),
};

/**

   _|_|    _|_|_|    _|_|_|        _|_|_|    _|_|    _|        _|          _|_|_|
 _|    _|  _|    _|    _|        _|        _|    _|  _|        _|        _|
 _|_|_|_|  _|_|_|      _|        _|        _|_|_|_|  _|        _|          _|_|
 _|    _|  _|          _|        _|        _|    _|  _|        _|              _|
 _|    _|  _|        _|_|_|        _|_|_|  _|    _|  _|_|_|_|  _|_|_|_|  _|_|_|

 */

const getActiveSession = () =>
  requester.get(`${API_SERVER_URL}/session/active`);

const getSessionData = id =>
  requester.post(`${API_SERVER_URL}/session/data`, { id });

const createSession = data =>
  requester.post(`${API_SERVER_URL}/session/start`, data);

const finishSession = data =>
  requester.post(`${API_SERVER_URL}/session/end`, data);

const listSessions = () => requester.get(`${API_SERVER_URL}/sessions`);

export default {
  createSession,
  getActiveSession,
  getSessionData,
  finishSession,
  listSessions,
};
