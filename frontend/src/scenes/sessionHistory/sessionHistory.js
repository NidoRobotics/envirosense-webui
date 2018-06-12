import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { timingFunctions } from 'polished';

import colors from '../../constants/styles/colors';
import font from '../../constants/styles/font';
import sizes from '../../constants/styles/sizes';

import Button from '../../components/button/button';
import FilterBar from './filterBar/filterBar';
import FullScreen from '../../components/fullScreen/fullScreen';
import Table from '../../components/table/table';
import TopBar from '../../components/topBar/topBar';

const StyledWrapper = styled.div`
  margin: ${sizes.xl} auto;
  max-width: 800px;
  width: 80%;
`;

const StyledLinks = styled.div`
  border: 1px solid ${colors.blackT7};
  display: block;
`;

const StyledRow = styled.div`
  background: ${colors.white};
  border-bottom: 1px solid ${colors.blackT8};
  display: flex;
  align-items: center;
  font-size: ${font.sizes.md};
  font-weight: 500;
  min-width: 200px;
  padding: ${sizes.sm} ${sizes.lg};
  transition: all 0.2s ${timingFunctions('easeOutQuad')};
  &:hover {
    background: ${colors.whiteA7};
  }
`;

const StyledLink = styled(Link)`
  color: ${colors.blackT2};
  text-decoration: none;
  flex: 1;
  &:hover {
    color: ${colors.primaryS2};
  }
`;

const getLink = (rowId, currentSessionId) =>
  rowId === currentSessionId ? '/' : `/detalle/${rowId}`;

const SessionHistory = ({
  currentSessionId,
  errors,
  filterValue,
  handleFilterChange,
  historyData,
}) => (
  <FullScreen start="true" clear>
    <TopBar
      title="Historial de sesiones"
      rightContent={
        <Button transparent="true" to="/">
          Volver
        </Button>
      }
    />
    <StyledWrapper>
      {!!errors.length && (
        <Table
          caption="Se han producido algunos errores."
          headings={['Fecha y hora', 'Mensaje']}
          rows={errors}
        />
      )}
      {errors.length === 0 && (
        <FilterBar
          handleFilterChange={handleFilterChange}
          value={filterValue}
        />
      )}
      {historyData.length > 0 && (
        <StyledLinks>
          {historyData.map(row => (
            <StyledRow>
              <StyledLink to={getLink(row.id, currentSessionId)} key={row.id}>
                {row.id} - {row.title}
              </StyledLink>
              <div>
                <Button href={`/api/session/download/${row.id}`}>CSV</Button>
                <Button href={`/api/session/geojson/${row.id}`}>geoJSON</Button>
                <Button danger href={`/api/session/delete/${row.id}`}>Eliminar</Button>
              </div>
            </StyledRow>
          ))}
        </StyledLinks>
      )}
    </StyledWrapper>
  </FullScreen>
);

SessionHistory.defaultProps = {
  currentSessionId: null,
};

SessionHistory.propTypes = {
  currentSessionId: PT.number,
  errors: PT.arrayOf(PT.array).isRequired,
  filterValue: PT.string.isRequired,
  handleFilterChange: PT.func.isRequired,
  historyData: PT.arrayOf(
    PT.shape({
      id: PT.number,
      title: PT.name,
    })
  ).isRequired,
};

export default SessionHistory;