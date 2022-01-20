// React
import React, { FC } from "react";
import ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./state";

// Components
import { App } from './app';

const Index: FC = (): JSX.Element => (
  <Provider store={store}>
    <App />
  </Provider>
)

const root = document.querySelector("#app");
ReactDOM.render(<Index />, root);
