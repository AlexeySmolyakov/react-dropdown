import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const logger = createLogger({ collapsed: true });

export default function configureStore (initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, logger)
	);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}