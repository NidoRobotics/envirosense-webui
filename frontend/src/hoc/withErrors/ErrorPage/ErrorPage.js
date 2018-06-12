import React from 'react';
import styled from 'styled-components';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

import FullScreenWithLogo from '../../../components/FullScreenWithLogo/FullScreenWithLogo';
import Table from '../../../components/Table/Table';

const StyledErrorBox = styled.div`
  max-width: 80rem;
  max-height: 80vh;
  overflow: auto;
`;

const StyledTitle = styled.h2`
  background: ${colors.dangerS2};
  font-size: ${font.sizes.md};
  margin-bottom: 0;
  padding: ${sizes.md};
`;

const ErrorPage = props =>
  props.errors && (
    <FullScreenWithLogo>
      <StyledErrorBox>
        <StyledTitle>{props.title}</StyledTitle>
        <Table
          caption={props.caption}
          headings={['Fecha y hora', 'Mensaje']}
          rows={props.errors}
        />
      </StyledErrorBox>
    </FullScreenWithLogo>
  );

export default ErrorPage;
