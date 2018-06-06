import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import shouldUpdate from 'recompose/shouldUpdate';

import 'react-table/react-table.css';

import buildColumns from './buildColumns';

import colors from '../../constants/styles/colors';
import font from '../../constants/styles/font';
import sizes from '../../constants/styles/sizes';

const textProps = {
  previousText: 'Anterior',
  nextText: 'Siguiente',
  loadingText: 'Cargando...',
  noDataText: 'No se encontraron filas',
  pageText: 'Página',
  ofText: 'de',
  rowsText: 'filas',
};

const StyledReactTable = styled(ReactTable)`
  .-pagination {
    .-btn {
      background: ${colors.primary};
      border-radius: 0;
      color: ${colors.white};
      font-size: ${font.sizes.xs};
      font-weight: 700;
      text-transform: uppercase;
      &:not([disabled]):hover {
        background: ${colors.primaryS1};
      }
    }
    .-pageInfo {
      font-size: ${font.sizes.xs};
      font-weight: 700;
    }
    .-pageJump {
      input {
        border: 1px solid ${colors.grayT5};
        border-radius: 0;
        color: ${colors.blackT2};
        font-size: ${font.sizes.sm};
        margin: 0 ${sizes.xs};
        padding: ${sizes.xxs};
      }
    }
    .-pageSizeOptions {
      position: relative;
      &:after {
        background: ${colors.primaryD3}
          url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI1LjkzIDI1LjkzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNS45MyAyNS45MzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnIGlkPSJjMTE4X3RyaWFuZ2xlIj4KCQk8cGF0aCBkPSJNMjUuMzk3LDQuNTU0aC0yLjA0MmwtOS45NzQsMTIuNjQ0Yy0wLjEwMSwwLjEyNC0wLjI1NiwwLjE5Ny0wLjQxNiwwLjE5N2MtMC4xNjQsMC0wLjMxNS0wLjA3My0wLjQxOS0wLjE5N0wyLjU3NSw0LjU1NCAgICBIMC41MzJjLTAuMjA2LDAtMC4zOTIsMC4xMTUtMC40NzksMC4yOTljLTAuMDksMC4xODQtMC4wNjQsMC40MDMsMC4wNiwwLjU2MWwxMi40MzUsMTUuNzYyYzAuMTA0LDAuMTI1LDAuMjU1LDAuMiwwLjQxOSwwLjIgICAgYzAuMTYsMCwwLjMxNS0wLjA3NSwwLjQxNi0wLjJMMjUuODE2LDUuNDEzYzAuMTI4LTAuMTU3LDAuMTQ4LTAuMzc3LDAuMDU4LTAuNTYxQzI1Ljc4OSw0LjY2OSwyNS42MDEsNC41NTQsMjUuMzk3LDQuNTU0eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgoJPGcgaWQ9IkNhcGFfMV8xODRfIj4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)
          center center no-repeat;
        border: 1px solid ${colors.primaryS4};
        content: '';
        display: inline-block;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 26px;
      }
    }
    select {
      appearance: none;
      border: 1px solid ${colors.grayT5};
      border-radius: 0;
      color: ${colors.blackT2};
      font-size: ${font.sizes.xs};
      font-weight: 700;
      padding: ${sizes.sm};
      padding-right: ${sizes.lg};
    }
  }
`;

const DataTables = ({ data }) => {
  const columns = buildColumns(data);
  return (
    <StyledReactTable
      columns={columns}
      data={data}
      minRows={0}
      pageSizeOptions={[20, 50, 100, 250, 500, 1000]}
      {...textProps}
    />
  );
};

DataTables.propTypes = {
  data: PT.arrayOf(PT.object).isRequired,
};

const checkPropsChange = (props, nextProps) =>
  props.data.length !== nextProps.data.length;

export default shouldUpdate(checkPropsChange)(DataTables);
