import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./features/store";
import Floorplan from "./components/floorplan";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Floorplan />
      </PersistGate>
    </Provider>
  );
}

export default App;
