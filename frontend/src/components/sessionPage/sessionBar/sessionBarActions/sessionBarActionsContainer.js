import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import AC from '../../../../store/actions';
import { sessionActiveIdSelector } from '../../../../store/session/active/selectors';
import { sessionDetailIdSelector } from '../../../../store/session/detail/selectors';

import SessionBarActions from './sessionBarActions';

const mapStateToProps = state => ({
  activeId: sessionActiveIdSelector(state),
  detailId: sessionDetailIdSelector(state),
});

const mapDispatchToProps = {
  handleFinishSession: AC.session.active.finish.start,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleFinishSession: props => () => {
      props.handleFinishSession(props.activeId);
    },
  })
)(SessionBarActions);
