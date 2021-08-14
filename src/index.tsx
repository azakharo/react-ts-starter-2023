import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';

import store from './store';

const App = () => (
  <h1>My React and TypeScript App!! {new Date().toLocaleDateString()}</h1>
);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
