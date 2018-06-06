import removeAccents from './removeAccents';

export default (source, target) =>
  removeAccents(source).toLowerCase().includes(removeAccents(target).toLowerCase());
