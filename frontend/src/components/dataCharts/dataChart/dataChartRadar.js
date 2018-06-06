import React from 'react';
import PT from 'prop-types';
import {
  VictoryTheme,
  VictoryContainer,
  VictoryChart,
  VictoryBar,
  VictoryPolarAxis,
  VictoryTooltip,
} from 'victory';
import styled from 'styled-components';

import colors from '../../../constants/styles/colors';
import sizes from '../../../constants/styles/sizes';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${sizes.xl};
`;

const DataChartLine = ({ data, dataKey }) => (
  <StyledWrapper>
    <VictoryChart
      animate
      polar
      theme={VictoryTheme.material}
      width={500}
      height={500}
      containerComponent={<VictoryContainer responsive={false} />}
    >
      <VictoryPolarAxis />
      <VictoryBar
        style={{ data: { fill: colors.danger } }}
        data={data}
        labels={d => `${d.x}
        ${d.y} veces`}
        labelComponent={<VictoryTooltip />}
        x="TIME"
        y={dataKey}
      />
    </VictoryChart>
  </StyledWrapper>
);

DataChartLine.propTypes = {
  data: PT.arrayOf(PT.object).isRequired,
  dataKey: PT.string.isRequired,
};

export default DataChartLine;
