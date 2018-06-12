import React from 'react';
import { injectGlobal } from 'styled-components';
import { normalize } from 'polished';
import { Route, Switch, Link } from 'react-router-dom';

import font from '../../constants/styles/font';

import withDynamic from '../../hoc/withDynamic/withDynamic';

const SessionDetail = withDynamic(
  import('../sessionDetail/sessionDetailContainer')
);
const SessionHistory = withDynamic(
  import('../sessionHistory/sessionHistoryContainer')
);
const SessionManager = withDynamic(
  import('../sessionManager/sessionManagerContainer')
);

/* eslint-disable no-unused-expressions */
injectGlobal`
  ${normalize()};
  html {
    font-size: ${font.rootSize};
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body,
  button,
  label,
  input,
  select,
  table,
  textarea {
    font-family: ${font.family};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-size: ${font.sizes.md};
  }
`;
/* eslint-enable no-unused-expressions */
/*<Route path="/historial" component={SessionHistory} />*/
const Main = props => (
  <main {...props}>
    <Switch>
      <Route path="/detalle/:id" component={SessionDetail} />
      <Route path="/historial" component={SessionHistory} />
      <Route path="/" component={SessionManager} />
    </Switch>
  </main>
);

export default Main;
