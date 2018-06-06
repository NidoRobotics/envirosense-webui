import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys, withProps } from 'recompose';

import AC from '../../../../store/actions';
import { tabsSelector } from '../../../../store/ui/tabs/selectors';

import SessionTabLinks from './sessionTabLinks';

const getTabsData = ({ active, handleClick, options }) =>
  options.map((option, index) => ({
    active: (!active && index === 0) || active === index,
    handleClick: handleClick(index),
    text: option,
  }));

const mapStateToProps = state => ({
  active: tabsSelector(state),
});

const mapDispatchToProps = {
  set: AC.ui.tabs.set,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys(['active']),
  withProps(ownProps => ({
    data: getTabsData({
      active: ownProps.active,
      handleClick: tabIndex => () => ownProps.set(tabIndex),
      options: ['Dashboard', 'Registros', 'Gráficas'],
    }),
  }))
)(SessionTabLinks);
