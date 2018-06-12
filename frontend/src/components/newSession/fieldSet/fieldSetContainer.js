import { connect } from 'react-redux';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';

import AC from '../../../store/actions';
import {
  sessionCreateValueSelector,
  sessionCreateIsSubmittingSelector,
} from '../../../store/session/create/selectors';

import FieldSet from './fieldSet';

const mapStateToProps = state => ({
  value: sessionCreateValueSelector(state),
  isSubmitting: sessionCreateIsSubmittingSelector(state),
});

const mapDispatchToProps = {
  setValue: AC.session.create.setValue,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
  withHandlers({
    setValue: props => e => {
      props.setValue(e.target.value);
    },
  }),
  pure
)(FieldSet);
