import { connect } from 'react-redux';

import { bucketsCleaned } from '../../store/session/buckets/selectors';

import DataTables from './dataTables';

const mapStateToProps = state => ({
  data: bucketsCleaned(state),
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(DataTables);
