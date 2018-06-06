import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { socketServer } from '../config';

const startListening = () => {
  const socket = io.connect(socketServer, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
  });
  return Observable.of(socket);
};

const stopListening = socket =>
  Observable.of(socket && socket.removeListener('action'));

export default {
  startListening,
  stopListening,
};
