import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import shouldUpdate from 'recompose/shouldUpdate';
import withHandlers from 'recompose/withHandlers';

import AC from '../../store/actions';
import {
  sessionCreateErrorsSelector,
  sessionCreateValueSelector,
  sessionCreateIsSubmittingSelector,
} from '../../store/session/create/selectors';

import NewSession from './newSession';

const mapStateToProps = state => ({
  errors: sessionCreateErrorsSelector(state),
  value: sessionCreateValueSelector(state),
  isSubmitting: sessionCreateIsSubmittingSelector(state),
});

const mapDispatchToProps = {
  handleSubmit: AC.session.create.send.start,
  cleanErrors: AC.session.create.cleanErrors,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  shouldUpdate(
    (props, nextProps) =>
      props.isSubmitting !== nextProps.isSubmitting ||
      props.errors.length !== nextProps.errors.length ||
      props.value !== nextProps.value
  ),
  lifecycle({
    componentWillMount() {
      this.props.cleanErrors();
    },
  }),
  withHandlers({
    handleSubmit: props => e => {
      e.preventDefault();
      props.handleSubmit(props.value);
    },
  })
)(NewSession);
