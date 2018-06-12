import React from 'react';
import PT from 'prop-types';

import withDynamic from '../../../hoc/withDynamic/withDynamic';

const SessionBody = ({ activeTab }) => {
  if (activeTab === 1) {
    const DataTables = withDynamic(
      import('../../dataTables/dataTablesContainer')
    );
    return <DataTables />;
  }
  if (activeTab === 2) {
    const DataCharts = withDynamic(
      import('../../dataCharts/dataChartsContainer')
    );
    return <DataCharts />;
  }
  const Dashboard = withDynamic(import('../../dashboard/dashboard'));
  return <Dashboard />;
};

SessionBody.defaultProps = {
  activeTab: 0,
};

SessionBody.propTypes = {
  activeTab: PT.number,
};

export default SessionBody;
