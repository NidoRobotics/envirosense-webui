import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';

import ErrorPage from './ErrorPage/ErrorPage';

const withErrors = (WrappedComponent, stateKey) => {
  class ErrorsContainer extends Component {
    static defaultProps = {
      errors: [],
      sessionId: undefined,
    };
    static propTypes = {
      errors: PT.arrayOf(PT.array),
      sessionId: PT.number,
    };
    shouldComponentUpdate(newProps) {
      return (
        newProps.errors.length !== this.props.errors.length ||
        newProps.sessionId !== this.props.sessionId
      );
    }
    render() {
      if (this.props.errors.length > 0) {
        return (
          <ErrorPage
            title="Se ha producido un error. Verifique que todos los dispositivos funcionan correctamente."
            caption="Se intentará una nueva conexión en breve"
            errors={this.props.errors}
          />
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    errors: state[stateKey].errors,
  });

  const mapDispatchToProps = {};

  return connect(mapStateToProps, mapDispatchToProps)(ErrorsContainer);
};

export default withErrors;
