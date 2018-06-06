import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import { Popup } from 'react-mapbox-gl';

import sizes from '../../../constants/styles/sizes';

import getSensorsGroups from '../../../utils/sensors/getGroups';

const getPopupInfo = activeMarker => {
  const sensorsGroups = getSensorsGroups(activeMarker);
  const content = sensorsGroups.map(group => (
    <StyledCell key={group.key}>
      <h4>{group.name}</h4>
      {group.children
        .filter(child => child.value && !!child.value)
        .map(child => (
          <p key={child.name}>
            <strong>{child.name}</strong>: {child.value}
          </p>
        ))}
    </StyledCell>
  ));
  return <StyledTable>{content}</StyledTable>;
};

const StyledPopup = styled.div`
  background: white;
  color: #333;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
  strong {
    font-weight: 700;
  }
`;

const StyledTable = styled.div`
  display: flex;
`;

const StyledCell = styled.div`
  padding: 0 ${sizes.md};
`;

const NidoMapPopup = ({ activeMarker, handleClose }) => (
  <Popup
    key={activeMarker.ID}
    coordinates={activeMarker.COORDINATES}
    onClick={handleClose}
  >
    <StyledPopup>{getPopupInfo(activeMarker)}</StyledPopup>
  </Popup>
);

NidoMapPopup.propTypes = {
  activeMarker: PT.shape({
    ID: PT.number,
    COORDINATES: PT.array,
  }).isRequired,
  handleClose: PT.func.isRequired,
};

export default NidoMapPopup;
