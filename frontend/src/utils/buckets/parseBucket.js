import identity from 'lodash.identity';
import mapKeys from 'lodash.mapkeys';
import pickBy from 'lodash.pickby';

import parseCoords from './parseCoords';

export default obj =>
  mapKeys(pickBy(parseCoords(obj), identity), (value, key) =>
    key.toUpperCase()
  );
