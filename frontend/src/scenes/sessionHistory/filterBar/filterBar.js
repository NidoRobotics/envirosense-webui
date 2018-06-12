import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import colors from '../../../constants/styles/colors';
import font from '../../../constants/styles/font';
import sizes from '../../../constants/styles/sizes';

const StyledWrapper = styled.div`
  background: ${colors.primary};
  padding: ${sizes.md} ${sizes.lg};
`;

const StyledInput = styled.input`
  border: 0;
  display: block;
  font-size: ${font.sizes.md};
  max-width: 30rem;
  padding: ${sizes.xs} ${sizes.md};
  width: 100%;
`;

const FilterBar = props => (
  <StyledWrapper>
    <StyledInput
      onChange={props.handleFilterChange}
      placeholder="Filtrar resultados"
      value={props.value}
    />
  </StyledWrapper>
);

FilterBar.propTypes = {
  handleFilterChange: PT.func.isRequired,
  value: PT.string.isRequired,
};

export default FilterBar;
