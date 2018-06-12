import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import shouldUpdate from 'recompose/shouldUpdate';

import AC from '../../store/actions';
import {
  sessionActiveErrorsSelector,
  sessionActiveIsLoadingSelector,
  sessionActiveIdSelector,
} from '../../store/session/active/selectors';

import SessionManager from './sessionManager';

const mapStateToProps = state => ({
  errors: sessionActiveErrorsSelector(state),
  isLoading: sessionActiveIsLoadingSelector(state),
  sessionId: sessionActiveIdSelector(state),
});

const mapDispatchToProps = {
  activeFetch: AC.session.active.fetch.start,
};

const checkPropsChange = (props, newProps) => {
  return (
    props.errors.length !== newProps.errors.length ||
    props.isLoading !== newProps.isLoading ||
    props.sessionId !== newProps.sessionId
  );
};

export default compose(
  shouldUpdate(checkPropsChange),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.activeFetch();
    },
  })
)(SessionManager);
