import React from 'react';
import PT from 'prop-types';
import {
  VictoryTheme,
  VictoryContainer,
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTooltip,
} from 'victory';

import parseValues from '../../../utils/sensors/parseValues';
import toTimeString from '../../../utils/toTimeString';

import colors from '../../../constants/styles/colors';

const DataChartBar = ({ data, dataKey }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    width={data.length > 5 ? data.length * 50 : 600}
    height={400}
    domainPadding={{ x: 50, y: [0, 10] }}
    scale={{ x: 'time' }}
    containerComponent={<VictoryContainer responsive={false} />}
  >
    <VictoryAxis tickFormat={toTimeString} />
    <VictoryAxis dependentAxis />
    <VictoryBar
      animate
      data={data}
      x="TIME"
      y={dataKey}
      labels={d => `${toTimeString(d.x)}
      ${parseValues(dataKey, d.y)}`}
      labelComponent={<VictoryTooltip />}
      style={{ data: { fill: colors.primary } }}
      sortKey="TIME"
    />
  </VictoryChart>
);

DataChartBar.propTypes = {
  data: PT.arrayOf(PT.object).isRequired,
  dataKey: PT.string.isRequired,
};

export default DataChartBar;
