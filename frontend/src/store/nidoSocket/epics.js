import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime';

import AC from '../actions';
import socketService from '../../services/socket';

export const socketStartEpic = action$ =>
  action$
    .ofType('NIDO_SOCKET/LISTEN/START')
    .mergeMap(() => socketService.startListening())
    .flatMap(socket =>
      Observable.concat(
        Observable.of(AC.nidoSocket.listen.set(socket)),
        Observable.fromEvent(socket, 'action').map(action =>
          AC.nidoSocket.receiveData(action)
        )
      )
    );

export const socketReceiveDataEpic = action$ =>
  action$
    .ofType('NIDO_SOCKET/RECEIVE_DATA')
    .mergeMap(({ payload }) =>
      Observable.concat(
        Observable.of(payload),
        Observable.of(AC.nidoSocket.emit())
      )
    );

export const socketEmitEpic = action$ =>
  action$
    .ofType('NIDO_SOCKET/EMIT')
    .throttleTime(15000)
    .map(() => AC.session.buckets.buffer.persist());

export const socketStopEpic = (action$, store) =>
  action$
    .ofType('NIDO_SOCKET/LISTEN/STOP')
    .mergeMap(() =>
      socketService
        .stopListening(store.getState().nidoSocket.socket)
        .map(() => AC.nidoSocket.listen.set(null))
    );
