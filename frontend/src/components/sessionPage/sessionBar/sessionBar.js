import React from 'react';
import PT from 'prop-types';

import parseSessionName from '../../../utils/parseSessionName';
import truncateText from '../../../utils/truncateText';

import SessionBarActions from './sessionBarActions/sessionBarActionsContainer';
import SessionTabsLinks from './sessionTabLinks/sessionTabLinksContainer';
import TopBar from '../../topBar/topBar';

const SessionBar = ({ bucketsCount, name }) => (
  <TopBar
    title={truncateText(parseSessionName(name), 20)}
    subtitle={`${bucketsCount} ${
      bucketsCount === 1 ? 'medición' : 'mediciones'
    }`}
    innerLeftContent={<SessionTabsLinks />}
    rightContent={<SessionBarActions />}
  />
);

SessionBar.propTypes = {
  bucketsCount: PT.number.isRequired,
  name: PT.string.isRequired,
};

export default SessionBar;
