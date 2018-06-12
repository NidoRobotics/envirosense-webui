import history from './history/actions';
import nidoSocket from './nidoSocket/actions';
import session from './session/actions';
import ui from './ui/actions';

export default {
  ...history,
  ...nidoSocket,
  ...session,
  ...ui,
};
