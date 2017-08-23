import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isMobile } from '../utils';
import '../styles/dropdown.styl';

const DropdownItem = ({ value, search, onClick }) => {
	const { title } = value;

	return (
		<div className="dropdown__list-item" onMouseDown={() => onClick(value)}>
			<span className="dropdown__list-item_search">{search}</span>
			<span>{title.slice(search.length, title.length)}</span>
		</div>
	);
};

DropdownItem.propTypes = {
	search: PropTypes.string,
	onClick: PropTypes.func,
};
DropdownItem.defaultProps = {
	search: '',
	onClick: () => console.warn('Not implemented'),
};

class Dropdown extends Component {
	state = {
		search: '',
		isOpened: false,
		isFocused: false,
		isDown: true,
	};

	onDropdownItemClick (value) {
		this.setState({
			search: value.title,
			isOpened: false,
		});

		this.props.onChange(value.id);
	}

	onChange (id) {
		this.props.onChange(id);
	}

	onFocus () {
		const rect = this.dropdown.getBoundingClientRect();
		const top = rect.height / 2 + rect.top;
		const bottom = window.innerHeight - top;

		this.setState({
			isOpened: true,
			isFocused: true,
			isDown: top < bottom
		});
	}

	onBlur () {
		this.setState({
			isOpened: false,
			isFocused: false,
			isDown: true,
		});
	}

	render () {
		const { options } = this.props;
		const { search, isOpened, isFocused, isDown } = this.state;

		const filteredOptions = options
		.filter(option => option.title.toLowerCase().startsWith(search.toLowerCase()))
		.slice(0, 5);

		let dropdownList = filteredOptions.map(option =>
			<DropdownItem
				key={option.id}
				value={option}
				search={search}
				onClick={::this.onDropdownItemClick}
			/>
		);

		let dropdownClasses = ['dropdown'];
		if (isOpened) dropdownClasses.push('dropdown_opened');
		if (!isDown) dropdownClasses.push('dropdown_up');

		let dropdownListClasses = ['dropdown__list'];
		if (filteredOptions.length === 0) {
			dropdownList = <span>Ничего не найдено</span>;
			dropdownListClasses.push('dropdown__list_empty');
		}

		let dropdownPlaceholderClasses = ['dropdown__placeholder'];
		if (!isFocused && !search)
			dropdownPlaceholderClasses.push('dropdown__placeholder_empty');

		if (isMobile) {
			const selectList = options.map(option =>
				<option key={option.id} value={option.id}>{option.title}</option>
			);
			selectList.unshift(<option key={-1} value={-1}>Выберите страну</option>);

			return (
				<div className={dropdownClasses.join(' ')} ref={dropdown => this.dropdown = dropdown}>
					<select
						defaultValue={-1}
						className="dropdown__select"
						onChange={event => this.onChange(+event.target.value)}>
						{selectList}
					</select>
				</div>
			);
		}

		return (
			<div className={dropdownClasses.join(' ')} ref={dropdown => this.dropdown = dropdown}>
				<input
					type="text"
					id="dropdown"
					className="dropdown__input"
					value={this.state.search}
					onChange={event => this.setState({ search: event.target.value })}
					onFocus={::this.onFocus}
					onBlur={::this.onBlur}
				/>
				<div className={dropdownPlaceholderClasses.join(' ')}>
					<label htmlFor="dropdown">Выберите страну</label>
				</div>
				<div className={dropdownListClasses.join(' ')}>{dropdownList}</div>
			</div>
		);
	}
}

Dropdown.propTypes = {
	options: PropTypes.array,
};
Dropdown.defaultProps = {
	options: [],
};

export default Dropdown;