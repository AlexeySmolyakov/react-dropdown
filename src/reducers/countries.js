import { FETCH_COUNTRIES, FETCH_COUNTRIES_STATE } from '../constants'

const initialState = {
	isFetching: false,
	countries: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_COUNTRIES_STATE:
			return {
				...state,
				isFetching: action.payload
			};

		case FETCH_COUNTRIES:
			return {
				...state,
				countries: action.payload
			};

		default:
			return state
	}
}