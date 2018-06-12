import { connect } from 'react-redux';
import { compose, shouldUpdate, withHandlers } from 'recompose';

import AC from '../../store/actions';
import {
  activeGroupSelector,
  activeChildrenSelector,
} from '../../store/ui/charts/selectors';

import DataCharts from './dataCharts';
import { enabledGroupsSelector } from '../../store/session/buckets/selectors';

const mapStateToProps = state => ({
  activeGroup: activeGroupSelector(state),
  activeChildren: activeChildrenSelector(state),
  enabledGroups: enabledGroupsSelector(state),
});

const mapDispatchToProps = {
  reset: AC.ui.charts.reset,
  setActiveGroup: AC.ui.charts.setActiveGroup,
  setActiveChildren: AC.ui.charts.setActiveChildren,
};

const checkPropsChange = (props, newProps) =>
  props.activeGroup !== newProps.activeGroup ||
  props.activeChildren !== newProps.activeChildren ||
  props.enabledGroups.length !== newProps.enabledGroups.length;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  shouldUpdate(checkPropsChange),
  withHandlers({
    handleChangeGroup: props => value => () => {
      props.setActiveGroup(value);
    },
    handleChangeChildren: props => value => () => {
      props.setActiveChildren(value);
    },
  })
)(DataCharts);
