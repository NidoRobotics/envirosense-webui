export default value => {
  if (!value) {
    return '';
  }
  const parsedTime = new Date(value);
  return parsedTime.toLocaleTimeString();
};
