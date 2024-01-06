import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./product/productSlice";
import gridReducer from "./grid/gridSlice";

const rootReducer = combineReducers({
  product: productReducer,
  grid: gridReducer,
});

const store = configureStore({
  reducer: persistReducer(
    { key: "root", storage, blacklist: ["grid"] },
    rootReducer
  ),
});

const persistor = persistStore(store);

export { store, persistor };
