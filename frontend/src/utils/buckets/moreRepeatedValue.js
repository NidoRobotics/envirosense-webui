export default (values) => {
  const counter = values.reduce((prevObj, currentValue) => {
    if (!prevObj[currentValue]) {
      return {
        ...prevObj,
        [`${currentValue}`]: 1,
      };
    }
    return {
      ...prevObj,
      [`${currentValue}`]: prevObj[currentValue] + 1,
    };
  }, {});
  const counterKeys = Object.keys(counter);
  return counterKeys.reduce((prevSelected, currentKey) => {
    if (counter[currentKey] > counter[prevSelected]) {
      return currentKey;
    }
    return prevSelected;
  }, counterKeys[0]);
};
