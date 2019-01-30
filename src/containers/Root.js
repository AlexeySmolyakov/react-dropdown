import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dropdown from '../components/Dropdown';
import { getCountries } from '../actions/CountryActions';

class Root extends Component {
  componentDidMount() {
    const { getCountries } = this.props;

    getCountries();
  }

  onChange(id) {
    console.warn('Dropdown changed', id);
  }

  render() {
    const { countries } = this.props;

    return (
      <div className="layout">
        <Dropdown options={countries} onChange={this.onChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  countries: state.countries.countries,
});

const mapDispatchToProps = {
  getCountries,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);