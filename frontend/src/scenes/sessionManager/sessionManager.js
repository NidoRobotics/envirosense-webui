import React from 'react';
import PT from 'prop-types';

import Landing from '../../components/landing/landing';
import NewSession from '../../components/newSession/newSessionContainer';
import SessionPage from '../../components/sessionPage/sessionPageContainer';

const SessionManager = ({ isLoading, sessionId }) => {
  if (!sessionId && isLoading) {
    return <Landing />;
  }
  if (!sessionId) {
    return <NewSession />;
  }
  return <SessionPage sessionId={sessionId} />;
};

SessionManager.defaultProps = {
  sessionId: null,
};

SessionManager.propTypes = {
  isLoading: PT.bool.isRequired,
  sessionId: PT.number,
};

export default SessionManager;
