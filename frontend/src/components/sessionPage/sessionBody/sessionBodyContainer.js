import { connect } from 'react-redux';

import { tabsSelector } from '../../../store/ui/tabs/selectors';

import SessionBody from './sessionBody';

const mapStateToProps = state => ({
  activeTab: tabsSelector(state),
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(SessionBody);
