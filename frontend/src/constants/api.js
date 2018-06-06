import { apiServer } from '../config';

const apiServerPrefix = '/api';

export const API_SERVER_URL = `${apiServer}${apiServerPrefix}`;

export const HTTP_METHODS = {
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  CONNECT: 'CONNECT',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
  PATCH: 'PATCH',
};

export const AJAX_CONFIG = {
  RETRIES: 10,
  TIMEOUT: 5000,
  CANCEL_TIME: 5000,
  DELAY_RETRY_TIME: 15000,
};

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
};

export const DEFAULT_API_STATE = {
  fetched: false,
  errors: [],
};
