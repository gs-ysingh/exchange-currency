
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import moneyApp from './reducers';

const store = createStore(moneyApp, applyMiddleware(thunk));

import App from './components/App';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
  document.getElementById("root")
);