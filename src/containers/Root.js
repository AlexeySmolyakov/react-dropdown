import React, { Component } from 'react'
import { connect } from 'react-redux';

import Dropdown from '../components/Dropdown'
import { getCountries } from '../actions/CountryActions'

class Root extends Component {
	componentDidMount () {
		this.props.getCountries();
	}

	onChange (id) {
		console.warn('ROOT', id)
	}

	render () {
		const { countries } = this.props;

		return (
			<div className="layout">
				<Dropdown options={countries} onChange={::this.onChange}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	countries: state.countries.countries,
});

const mapDispatchToProps = (dispatch) => ({
	getCountries () {
		return dispatch(getCountries())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Root)