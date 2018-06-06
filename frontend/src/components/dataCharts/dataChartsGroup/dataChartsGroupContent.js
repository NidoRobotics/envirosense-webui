import React from 'react';
import shouldUpdate from 'recompose/shouldUpdate';

import DataChart from '../dataChart/dataChartContainer';

const DataChartsGroupContent = ({
  activeChildren,
  sensorKeys,
  handleChangeChildren,
}) =>
  sensorKeys
    .map(sensorKey => (
      <DataChart
        activeChildren={activeChildren}
        key={sensorKey}
        sensorKey={sensorKey}
        sensorKeys={sensorKeys}
        handleChangeChildren={handleChangeChildren}
      />
    ))
    .filter(dataChart => !!dataChart);

const checkPropsChange = (props, newProps) =>
  props.activeChildren !== newProps.activeChildren;

export default shouldUpdate(checkPropsChange)(DataChartsGroupContent);
