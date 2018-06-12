export const env = process.env.NODE_ENV;
export const socketServer = 'http://192.168.1.51:8000';
export const apiServer = 'http://192.168.1.51';
export const map = {
  minDistance: 100,
  distanceUnit: 'meters',
  showLines: true,
  token:
    'pk.eyJ1Ijoiam1sd2ViIiwiYSI6ImNqYXE2NWpyajVoYnYzM2w5b2NtM2Z6djcifQ._aF3kw4eZCmmN-J94C1xag',
};

export default {
  env,
  socketServer,
  apiServer,
  map,
};
