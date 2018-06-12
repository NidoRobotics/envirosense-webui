import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import Landing from '../../components/landing/landing';

let AsyncComponent = null;

export default loader =>
  compose(
    withState('isDynamicallyLoaded', 'updatedIsDynamicallyLoaded', false),
    lifecycle({
      componentDidMount() {
        const { updatedIsDynamicallyLoaded } = this.props;
        loader
          .then(LoadedModule => {
            AsyncComponent = LoadedModule.default;
            updatedIsDynamicallyLoaded(true);
          })
          .catch(e => {
            AsyncComponent = (
              <p>
                {`Error while trying to dynamically load a react component: ${e}`}
              </p>
            );
            updatedIsDynamicallyLoaded(true);
          });
      },
    })
  )(
    ({ isDynamicallyLoaded, updatedIsDynamicallyLoaded, ...rest }) =>
      AsyncComponent && isDynamicallyLoaded && updatedIsDynamicallyLoaded ? (
        <AsyncComponent {...rest} />
      ) : (
        <Landing />
      )
  );
