import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import Landing from '../landing/landing';
import SessionBar from './sessionBar/sessionBarContainer';
import SessionBody from './sessionBody/sessionBodyContainer';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const SessionPage = ({ errors, fetchedId, sessionId }) => {
  if (errors.length) {
    return 'Hay errores';
  }
  if (fetchedId !== sessionId || !fetchedId || !sessionId) {
    return <Landing />;
  }
  return (
    <StyledWrapper>
      <SessionBar />
      <SessionBody />
    </StyledWrapper>
  );
};

SessionPage.defaultProps = {
  sessionId: null,
  fetchedId: null,
};

SessionPage.propTypes = {
  errors: PT.arrayOf(PT.array).isRequired,
  fetchedId: PT.number,
  sessionId: PT.number,
};

export default SessionPage;
