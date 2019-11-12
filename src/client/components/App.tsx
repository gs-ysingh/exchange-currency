import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Exchange from '../containers/Exchange';
import Home from '../containers/Home';

class App extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}
  render() {
    return (
			<Router>
				<Switch>
					<Route path="/exchange">
						<Exchange />
					</Route>
					<Route path="/"><Home /></Route>
				</Switch>
			</Router>
    );
  }
}

export default App;