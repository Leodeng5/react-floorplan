import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import gridReducer from "./grid/gridSlice";

const rootReducer = {
  product: productReducer,
  grid: gridReducer,
};

export default configureStore({
  reducer: rootReducer,
});
