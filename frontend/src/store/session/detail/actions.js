import { createActions } from 'redux-actions';

export default createActions({
  DETAIL: {
    FETCH: {
      START: payload => payload,
      SUCCESS: ({ session }) => ({
        data: {
          id: session.id,
          name: session.title,
        },
      }),
      ERROR: error => error,
    },
    RESET: () => {},
  },
});
