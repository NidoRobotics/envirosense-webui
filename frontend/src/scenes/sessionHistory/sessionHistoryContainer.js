import React, { PureComponent } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';

import AC from '../../store/actions';
import { sessionActiveIdSelector } from '../../store/session/active/selectors';
import { filteredDataSelector } from '../../store/history/selectors';
import SessionHistory from './sessionHistory';

class SessionHistoryContainer extends PureComponent {
  static defaultProps = {
    currentSessionId: null,
  };
  static propTypes = {
    changeFilter: PT.func.isRequired,
    currentSessionId: PT.number,
    errors: PT.arrayOf(PT.array).isRequired,
    fetchHistory: PT.func.isRequired,
    filterValue: PT.string.isRequired,
    historyData: PT.arrayOf(PT.object).isRequired,
  };
  componentWillMount() {
    this.props.fetchHistory();
  }
  handleFilterChange = e => {
    this.props.changeFilter(e.target.value);
  };
  render() {
    const { historyData, currentSessionId, errors, filterValue } = this.props;
    return (
      <SessionHistory
        historyData={historyData}
        handleFilterChange={this.handleFilterChange}
        currentSessionId={currentSessionId}
        errors={errors}
        filterValue={filterValue}
        stateKey="history"
      />
    );
  }
}

const mapStateToProps = state => ({
  currentSessionId: sessionActiveIdSelector(state),
  errors: state.history.errors,
  historyData: filteredDataSelector(state),
  filterValue: state.history.filter,
});

const mapDispatchToProps = {
  changeFilter: AC.history.filter,
  fetchHistory: AC.history.fetch.start,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SessionHistoryContainer
);
