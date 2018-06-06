import React from 'react';
import PT from 'prop-types';
import {
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTooltip,
} from 'victory';

import parseValues from '../../../utils/sensors/parseValues';
import toTimeString from '../../../utils/toTimeString';

import colors from '../../../constants/styles/colors';

const DataChartLine = ({ data, dataKey, scale }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    width={data.length > 5 ? data.length * 50 : 600}
    height={400}
    scale={{ x: scale }}
    containerComponent={
      <VictoryVoronoiContainer
        voronoiDimension="x"
        responsive={false}
        labels={d => `${toTimeString(d.x)}
        ${parseValues(dataKey, d.y)}`}
        labelComponent={
          <VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: 'white' }} />
        }
      />
    }
  >
    <VictoryAxis label="Hora" invertAxis tickFormat={toTimeString} />
    <VictoryAxis dependentAxis />
    <VictoryLine
      animate
      style={{ data: { stroke: colors.danger } }}
      data={data}
      x="TIME"
      y={dataKey}
      sortKey="TIME"
    />
  </VictoryChart>
);

DataChartLine.defaultProps = {
  scale: 'time',
};

DataChartLine.propTypes = {
  data: PT.arrayOf(PT.object).isRequired,
  dataKey: PT.string.isRequired,
  scale: PT.string,
};

export default DataChartLine;
