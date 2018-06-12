export default (apiActionKey = 'fetched') => ({
  start: state => ({
    ...state,
    [apiActionKey]: false,
  }),
  success: (state, { payload = {} }) => ({
    ...state,
    ...payload,
    [apiActionKey]: true,
    errors: [],
  }),
  error: (state, { payload = [] }) => ({
    ...state,
    [apiActionKey]: true,
    errors: [...state.errors, payload],
  }),
});
