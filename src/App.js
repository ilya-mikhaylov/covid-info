import React from 'react';
import Statistic from './components/Statistic.js'
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import mapReducer from "./redux/reducer/map";
import reduxThunk from "redux-thunk";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  mapReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Statistic />
      </div>
    </Provider>
  );
}
export default App;
