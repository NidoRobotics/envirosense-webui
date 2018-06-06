import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';

import { bucketsByTypeWithTimeSelector } from '../../../store/session/buckets/selectors';

import DataChart from './dataChart';

const mapStateToProps = (state, ownProps) => {
  const sensorsData = bucketsByTypeWithTimeSelector(state);
  return {
    data: sensorsData[ownProps.sensorKey] || [],
  };
};

const mapDispatchToProps = null;

const checkPropsChange = (props, newProps) =>
  (props.data.length !== newProps.data.length &&
    newProps.activeChildren === newProps.sensorKey) ||
  props.activeChildren !== newProps.activeChildren;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  shouldUpdate(checkPropsChange)
)(DataChart);
