import { connect } from 'react-redux';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import shallowEqual from 'recompose/shallowEqual';
import shouldUpdate from 'recompose/shouldUpdate';

import { bucketsMergedDataSelector } from '../../store/session/buckets/selectors';

import DataBoxes from './dataBoxes';

const mapStateToProps = state => ({
  data: bucketsMergedDataSelector(state),
});

const mapDispatchToProps = null;

const checkPropsChange = (props, newProps) =>
  !shallowEqual(props.data, newProps.data);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(props => {
    const { coordinates, ...rest } = props;
    return rest;
  }),
  shouldUpdate(checkPropsChange)
)(DataBoxes);
