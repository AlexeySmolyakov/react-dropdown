// React hot loader imports
// from webpack config file
// https://github.com/webpack/webpack/issues/406
import "react-hot-loader/patch";
import { AppContainer } from 'react-hot-loader';

// React & root container
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore();

// Import styles
import './styles/index.styl';

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Component/>
			</Provider>
		</AppContainer>,
		document.getElementById('root')
	);
};

render(Root);

if (module.hot) module.hot.accept('./containers/Root', () => render(Root));
