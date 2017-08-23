import { FETCH_COUNTRIES, FETCH_COUNTRIES_STATE } from "../constants/index";
import { countries } from "../constants/countries";

export const getCountries = () => {
	return (dispatch) => {
		dispatch({
			type: FETCH_COUNTRIES_STATE,
			payload: true,
		});

		const sortedCountries = countries.sort((a, b) => {
			if (a.title < b.title) return -1;
			if (a.title > b.title) return 1;
			return 0;
		});

		dispatch({
			type: FETCH_COUNTRIES,
			payload: sortedCountries,
		});

		dispatch({
			type: FETCH_COUNTRIES_STATE,
			payload: false,
		});
	}
};