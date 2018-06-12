import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import colors from '../../constants/styles/colors';
import font from '../../constants/styles/font';
import sizes from '../../constants/styles/sizes';

import FieldSet from './fieldSet/fieldSetContainer';
import Footer from './footer/footer';
import FullScreenWithLogo from '../../components/fullScreenWithLogo/fullScreenWithLogo';
import Loading from '../../components/loading/loading';

const StyledForm = styled.form`
  background: ${colors.primaryT5};
  border: 1px solid ${colors.whiteA5};
  box-shadow: 0 3px 25px ${colors.blackA8};
  color: ${colors.primaryD1};
  max-width: 60rem;
  width: 100%;
`;

const StyledTitle = styled.h2`
  font-size: ${font.sizes.md};
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
`;

const StyledLoadingWrapper = styled.div`
  top: ${sizes.xxl};
  right: ${sizes.xxl};
  position: absolute;
`;

const NewSession = ({ handleSubmit, isSubmitting }) => (
  <FullScreenWithLogo>
    <StyledForm onSubmit={handleSubmit}>
      <StyledTitle>Inicia la sesión para comenzar a recoger datos</StyledTitle>
      <FieldSet />
      <Footer />
      {isSubmitting && (
        <StyledLoadingWrapper>
          <Loading sm />
        </StyledLoadingWrapper>
      )}
    </StyledForm>
  </FullScreenWithLogo>
);

NewSession.propTypes = {
  handleSubmit: PT.func.isRequired,
  isSubmitting: PT.bool.isRequired,
};

export default NewSession;
