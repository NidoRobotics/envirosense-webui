import { handleActions } from 'redux-actions';
import AC from './actions';

const initialState = {
  data: [],
  errors: [],
  fetched: false,
  filter: '',
};

export default handleActions(
  {
    [AC.history.fetch.error]: (state, { payload }) => ({
      ...state,
      errors: [payload].concat(state.errors),
      fetched: true,
    }),
    [AC.history.fetch.success]: (state, { payload }) => ({
      ...state,
      data: payload.map(
        item =>
          item.title === 'NONAME' ? { ...item, title: 'Sin título' } : item
      ),
      errors: [],
      fetched: true,
    }),
    [AC.history.filter]: (state, { payload }) => ({
      ...state,
      filter: payload,
    }),
  },
  initialState
);
