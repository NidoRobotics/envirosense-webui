export default sessionName =>
  (
    sessionName === 'NONAME' || !sessionName.length
      ? 'Sesión sin título'
      : sessionName
  );
