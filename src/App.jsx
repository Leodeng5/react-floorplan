import React from "react";
import { Provider } from "react-redux";
import store from "./features/store";
import Floorplan from "./components/floorplan";

function App() {
  return (
    <Provider store={store}>
      <Floorplan />
    </Provider>
  );
}

export default App;
