import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import { timingFunctions } from 'polished';

import Button from '../../../components/button/button';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

const StyledFieldset = styled.fieldset`
  background: ${colors.whiteA7};
  color: ${colors.black};
  border: 0;
  margin: 0;
  padding: ${sizes.xl};
`;

const StyledLabel = styled.label`
  color: ${colors.blackT2};
  display: block;
  font-size: ${font.sizes.md};
  font-weight: 500;
  letter-spacing: -0.3px;
  margin-bottom: ${sizes.xl};
`;

const StyledInput = styled.input`
  background: ${colors.white};
  border: 2px solid ${colors.grayT6};
  display: block;
  font-size: ${font.sizes.md};
  margin-top: ${sizes.xs};
  padding: ${sizes.md};
  transition: all 0.3s ${timingFunctions('easeOutBack')};
  width: 100%;
  &:active,
  &:focus {
    border-color: ${colors.grayT4};
    box-shadow: inset 0 1px 7px ${colors.blackA1};
    outline: 0;
  }
`;

const StyledButtonWrapper = styled.div`
  text-align: center;
`;

const FieldSet = ({ setValue, isSubmitting, value }) => (
  <StyledFieldset>
    <StyledLabel>
      Nombre de la sesión
      <StyledInput
        autoComplete="off"
        placeholder="(Opcional)"
        onChange={setValue}
        type="text"
        value={value}
      />
    </StyledLabel>
    <StyledButtonWrapper>
      <Button lg disabled={isSubmitting}>
        Iniciar sesión
      </Button>
    </StyledButtonWrapper>
  </StyledFieldset>
);

FieldSet.propTypes = {
  setValue: PT.func.isRequired,
  isSubmitting: PT.bool.isRequired,
  value: PT.string.isRequired,
};

export default FieldSet;
