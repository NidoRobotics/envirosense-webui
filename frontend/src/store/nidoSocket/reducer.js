import { handleActions } from 'redux-actions';
import AC from './actions';

const initialState = {
  socket: null,
};

export default handleActions(
  {
    [AC.nidoSocket.listen.set]: (state, { payload }) => ({
      ...state,
      socket: payload,
    }),
    [AC.nidoSocket.test]: state => {
      console.log('test');
      return state;
    },
  },
  initialState
);
