import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import mapProps from 'recompose/mapProps';
import withHandlers from 'recompose/withHandlers';
import shouldUpdate from 'recompose/shouldUpdate';

import AC from '../../store/actions';
import {
  coordinatesSelector,
  bucketsFilteredBeautifiedSelector,
} from '../../store/session/buckets/selectors';

import NidoMap from './nidoMap';

const mapStateToProps = state => ({
  activeMarker: state.ui.map.activeMarker,
  coordinates: coordinatesSelector(state),
  markers: bucketsFilteredBeautifiedSelector(state),
});

const mapDispatchToProps = {
  reset: AC.ui.map.reset,
  setActiveMarker: AC.ui.map.setActiveMarker,
};

const checkPropsChange = (props, newProps) =>
  props.activeMarker !== newProps.activeMarker ||
  props.coordinates.length !== newProps.coordinates.length;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  shouldUpdate(checkPropsChange),
  lifecycle({
    componentWillMount() {
      this.props.reset();
    },
  }),
  withHandlers({
    handleMarkerClick: props => marker => () => {
      props.setActiveMarker(marker);
    },
  }),
  mapProps(props => ({
    ...props,
    markers: props.markers.map(marker => ({
      ...marker,
      handleMarkerClick: props.handleMarkerClick(marker),
    })),
  }))
)(NidoMap);
