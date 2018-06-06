const GROUPS = [
  {
    key: 'LOCATION',
    name: 'Localización',
    children: [
      'MAGNETICCOMPASS',
      // 'LAT_H',
      // 'LONG_H',
      'GPSCOMPASS',
      'LAT',
      'LONG',
    ],
  },
  {
    key: 'SENSORS',
    name: 'Sensores',
    children: [
      'SG',
      'DO',
      'TDS',
      'S',
      'EC',
      'PH',
      'ORP',
      'PRESS',
      'DEPTHTOTAL',
      'DEPTHTOSURFACE',
      'DEPTHTOBOTTOM',
      // 'WATERTMP1',
      'WATERTMP2',
      //'WATERTMP3',
    ],
  },
  {
    key: 'STATUS',
    name: 'Estado',
    children: ['TIME', 'IS_VALID', 'GPSSNR', 'GPSSATS'],
  },
];

export default GROUPS;
