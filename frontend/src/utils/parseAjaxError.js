export default err => ([
  (new Date()).toLocaleString(),
  err.message,
]);
