import React from 'react';
import PT from 'prop-types';

import GROUPS from '../../constants/groups';
import SENSORS from '../../constants/sensors';

import DataTablesCell from './dataTablesCell/dataTablesCell';
import DataTablesHeader from './dataTablesHeader/dataTablesHeader';
import DataTablesParentHeader from './dataTablesParentHeader/dataTablesParentHeader';

import getAlignBySensorKey from './getAlignBySensorKey';
import parseValues from '../../utils/sensors/parseValues';

const buildColumn = sensorKey => {
  const CellComponent = ({ value }) => (
    <DataTablesCell
      align={getAlignBySensorKey(sensorKey)}
      sensorKey={sensorKey}
      sensorValue={parseValues(sensorKey, value)}
    />
  );
  CellComponent.propTypes = {
    value: PT.oneOfType([PT.string, PT.number]).isRequired,
  };
  const defaultColumn = {
    accessor: sensorKey,
    Cell: CellComponent,
    Header: (
      <DataTablesHeader align={getAlignBySensorKey(sensorKey)}>
        {SENSORS[sensorKey]}
      </DataTablesHeader>
    ),
    headerStyle: { padding: 0 },
    // minWidth: 130,
  };
  return defaultColumn;
};

const hasSomeValue = (key, data) => {
  const onlyKeyData = data.map(item => item[key]).filter(item => !!item);
  return onlyKeyData.length > 0;
};

const buildGroupColumns = (children, data) =>
  children
    .filter(child => hasSomeValue(child, data))
    .map(child => buildColumn(child));

const buildColumns = data =>
  GROUPS.map(group => ({
    columns: buildGroupColumns(group.children, data),
    Header: <DataTablesParentHeader>{group.name}</DataTablesParentHeader>,
    headerStyle: { padding: 0 },
  }));

export default buildColumns;
