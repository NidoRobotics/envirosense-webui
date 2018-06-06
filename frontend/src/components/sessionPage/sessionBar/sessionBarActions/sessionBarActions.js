import React from 'react';
import PT from 'prop-types';
import pure from 'recompose/pure';

import Button from '../../../../components/button/button';

const SessionBarActions = ({ activeId, detailId, handleFinishSession }) => [
  <Button key="history" transparent="true" to="/historial">
    Ver histórico
  </Button>,
  activeId === detailId && (
    <Button key="finish" danger onClick={handleFinishSession}>
      Finalizar sesión activa
    </Button>
  ),
];

SessionBarActions.propTypes = {
  handleFinishSession: PT.func.isRequired,
};

export default pure(SessionBarActions);
