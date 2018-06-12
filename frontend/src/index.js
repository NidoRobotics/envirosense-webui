import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { configureStore, history } from './store/config';
import Main from './scenes/main/main';
import Landing from './components/landing/landing';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = configureStore();

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');

//   whyDidYouUpdate(React, {
//     exclude: /^Text/,
//   });
// }

// console.log(' _|      _|  _|        _|            _|_|_|              _|                    _|      _|                      ')
// console.log(' _|_|    _|        _|_|_|    _|_|    _|    _|    _|_|    _|_|_|      _|_|    _|_|_|_|        _|_|_|    _|_|_|  ')
// console.log(' _|  _|  _|  _|  _|    _|  _|    _|  _|_|_|    _|    _|  _|    _|  _|    _|    _|      _|  _|        _|_|      ')
// console.log(' _|    _|_|  _|  _|    _|  _|    _|  _|    _|  _|    _|  _|    _|  _|    _|    _|      _|  _|            _|_|  ')
// console.log(' _|      _|  _|    _|_|_|    _|_|    _|    _|    _|_|    _|_|_|      _|_|        _|_|  _|    _|_|_|  _|_|_|    ')

render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Landing />}>
      <ConnectedRouter history={history}>
        <Main />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
