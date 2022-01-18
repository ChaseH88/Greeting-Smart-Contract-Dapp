import React, { FC } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";

const App: FC = () => (
  <Provider store={store}>
    <h1>React Starter with {` `}
      <a
        href="https://www.typescriptlang.org/"
        target="_blank"
      >TypeScript</a>
    </h1>
  </Provider>
);

const root = document.querySelector("#app");
ReactDOM.render(<App />, root);