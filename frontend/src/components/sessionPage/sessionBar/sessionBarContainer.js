import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';

import { bucketsCountSelector } from '../../../store/session/buckets/selectors';
import { sessionDetailNameSelector } from '../../../store/session/detail/selectors';

import SessionBar from './sessionBar';

const mapStateToProps = state => ({
  bucketsCount: bucketsCountSelector(state),
  name: sessionDetailNameSelector(state),
});

const mapDispatchToProps = {};

const checkPropsChange = (props, newProps) =>
  props.bucketsCount !== newProps.bucketsCount || props.name !== newProps.name;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  shouldUpdate(checkPropsChange)
)(SessionBar);
