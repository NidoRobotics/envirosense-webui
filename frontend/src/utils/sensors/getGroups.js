import GROUPS from '../../constants/groups';
import SENSORS from '../../constants/sensors';
import parseValues from './parseValues';

export default (sensors, cleanEmpty = true) => {
  const sensorKeys = Object.keys(sensors).map(sensor => sensor);
  return GROUPS.map(group => {
    const children = (!cleanEmpty
      ? group.children
      : group.children.filter(
          child => sensorKeys.includes(child) && !!sensors[child]
        )
    ).map(child => ({
      key: child,
      name: SENSORS[child] || child,
      value: parseValues(child, sensors[child]),
    }));
    return {
      ...group,
      children,
    };
  });
};
