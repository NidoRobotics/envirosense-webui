import { handleActions } from 'redux-actions';

import AC from '../../actions';

const initialState = {
  data: [],
  buffer: [],
};

export default handleActions(
  {
    [AC.session.buckets.reset]: () => initialState,
    [AC.session.buckets.data.push]: (state, { payload }) => ({
      data: [...state.data, ...payload],
      buffer: [],
    }),
    [AC.session.buckets.data.reset]: () => ({
      data: [],
    }),
    [AC.session.buckets.data.set]: (state, { payload }) => ({
      ...state,
      data: payload,
    }),
    [AC.session.buckets.buffer.push]: (state, { payload }) => ({
      ...state,
      buffer: [...state.buffer, payload],
    }),
    [AC.session.buckets.buffer.persist]: state => ({
      data: [...state.data, ...state.buffer],
      buffer: [],
    }),
    [AC.session.buckets.buffer.reset]: state => ({
      ...state,
      buffer: [],
    }),
  },
  initialState
);
