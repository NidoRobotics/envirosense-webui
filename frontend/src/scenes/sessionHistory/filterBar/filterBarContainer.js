import React, { PureComponent } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';

import AC from '../../../store/actions';
import FilterBar from './FilterBar';

class FilterBarContainer extends PureComponent {
  static propTypes = {
    filter: PT.func.isRequired,
    value: PT.string.isRequired,
  };
  handleFilterChange = e => {
    this.props.filter(e.target.value);
  };
  render() {
    return (
      <FilterBar
        handleFilterChange={this.handleFilterChange}
        value={this.props.value}
      />
    );
  }
}

const mapStateToProps = state => ({
  value: state.history.filter,
});

const mapDispatchToProps = {
  filter: AC.history.filter,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBarContainer);
