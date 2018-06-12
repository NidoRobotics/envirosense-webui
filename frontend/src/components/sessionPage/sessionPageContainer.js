import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import shouldUpdate from 'recompose/shouldUpdate';

import AC from '../../store/actions';
import {
  sessionDetailIdSelector,
  sessionDetailErrorsSelector,
} from '../../store/session/detail/selectors';
import { sessionActiveIdSelector } from '../../store/session/active/selectors';

import SessionPage from './sessionPage';

const mapStateToProps = state => ({
  errors: sessionDetailErrorsSelector(state),
  activeId: sessionActiveIdSelector(state),
  fetchedId: sessionDetailIdSelector(state),
});

const mapDispatchToProps = {
  detailFetch: AC.session.detail.fetch.start,
  startSocket: AC.nidoSocket.listen.start,
  stopSocket: AC.nidoSocket.listen.stop,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  shouldUpdate(
    (props, nextProps) =>
      props.sessionId !== nextProps.sessionId ||
      props.errors.length !== nextProps.errors.length ||
      props.fetchedId !== nextProps.fetchedId
  ),
  lifecycle({
    componentDidMount() {
      this.props.detailFetch(this.props.sessionId);
      if (this.props.sessionId === this.props.activeId) {
        this.props.startSocket();
      }
    },
    componentWillUnmount() {
      if (this.props.sessionId === this.props.activeId) {
        this.props.stopSocket();
      }
    },
  })
)(SessionPage);
