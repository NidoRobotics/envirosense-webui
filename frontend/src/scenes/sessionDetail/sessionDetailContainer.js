import React from 'react';
import PT from 'prop-types';

import SessionPage from '../../components/sessionPage/sessionPageContainer';

const SessionDetailContainer = ({ match }) => (
  <SessionPage sessionId={+match.params.id} />
);

SessionDetailContainer.propTypes = {
  match: PT.shape({
    params: PT.shape({
      id: PT.string,
    }),
  }).isRequired,
};

export default SessionDetailContainer;
