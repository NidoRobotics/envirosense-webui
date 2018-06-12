import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import colors from '../../constants/styles/colors';
import font from '../../constants/styles/font';
import sizes from '../../constants/styles/sizes';

const StyledTable = styled.table`
  background: ${colors.white};
  color: ${colors.blackT2};
  font-size: ${font.sizes.sm};
  table-layout: fixed;
  width: 100%;
`;

const StyledCaption = styled.caption`
  background: ${colors.grayS2};
  color: ${colors.white};
  padding: ${sizes.sm} ${sizes.md};
`;

const StyledHeading = styled.thead`
  background: ${colors.grayT8};
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const StyledHeadingCell = styled.th`
  color: ${colors.grayS3};
  font-weight: 700;
  padding: ${sizes.sm} ${sizes.md};
  text-align: left;
`;

const StyledBody = styled.tbody`
  display: block;
  max-height: 300px;
  overflow: auto;
  width: 100%;
  > tr {
    display: table;
    table-layout: fixed;
    width: 100%;
  }
`;

const StyledCell = styled.td`
  padding: ${sizes.xs} ${sizes.md};
`;

const getCaption = caption =>
  caption.length > 0 && <StyledCaption>{caption}</StyledCaption>;

const getHeader = headings => headings.length > 0 && (
  <StyledHeading>
    <tr>
      {headings.map(heading => <StyledHeadingCell key={`${heading}${Math.random()}`}>{heading}</StyledHeadingCell>)}
    </tr>
  </StyledHeading>
);

const getBody = rows => (
  <StyledBody>
    {rows.map(row => (
      <tr key={Math.random()}>
        {row.map(cell => <StyledCell key={`${cell}${Math.random()}`}>{cell}</StyledCell>)}
      </tr>
    ))}
  </StyledBody>
);

const Table = ({ caption, headings, rows }) => (
  <StyledTable>
    {getCaption(caption)}
    {getHeader(headings)}
    {getBody(rows)}
  </StyledTable>
);

Table.defaultProps = {
  caption: '',
  headings: [],
};

Table.propTypes = {
  caption: PT.string,
  headings: PT.arrayOf(PT.string),
  rows: PT.arrayOf(PT.array).isRequired,
};

export default Table;
