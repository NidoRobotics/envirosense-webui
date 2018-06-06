import chartsActions from './charts/actions';
import mapActions from './map/actions';
import tabsActions from './tabs/actions';

export default {
  ui: {
    ...chartsActions,
    ...mapActions,
    ...tabsActions,
  },
};
