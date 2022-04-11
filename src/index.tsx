import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { store } from "store/store";
// translation lib
import "./i18n";
// styles
import 'bootstrap/dist/css/bootstrap.min.css'; // boostrap
import "./styles/main.scss";


ReactDOM.render(
  <HelmetProvider>
    <Helmet>
      <title>Hustle N' Code</title>
      <meta name="description" content={"desc"} />
    </Helmet>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
