import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Admin from "./Admin";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";


axios.defaults.baseURL =
  "https://asia-south1-la-crescendo-academy.cloudfunctions.net/api";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route strict path="/" component={Admin} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
