import { createActions } from 'redux-actions';
import AC from '../session/actions';

import parseBucket from '../../utils/buckets/parseBucket';

export default createActions({
  NIDO_SOCKET: {
    LISTEN: {
      START: () => {},
      SET: payload => payload,
      STOP: () => {},
    },
    RECEIVE_DATA: payload => ({
      ...payload,
      payload: parseBucket(payload.payload),
      type: AC.session.buckets.buffer.push.toString(),
    }),
    EMIT: () => {},
    TEST: () => {},
  },
});
