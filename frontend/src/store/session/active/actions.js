import { createActions } from 'redux-actions';

export default createActions({
  ACTIVE: {
    FETCH: {
      START: () => {},
      SUCCESS: ({ session, status }) => {
        if (!status) {
          return {
            data: null,
          };
        }
        return {
          data: {
            id: session.id,
            name: session.title,
          },
        };
      },
      ERROR: error => error,
    },
    FINISH: {
      START: id => ({ id }),
      SUCCESS: () => {},
      ERROR: error => error,
    },
    RESET: () => {},
  },
});
