export default (string, size) =>
  `${string.slice(0, size)}${string.length > size ? '...' : ''}`;
