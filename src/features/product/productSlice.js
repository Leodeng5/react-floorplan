import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const productAdapter = createEntityAdapter({
  selectId: (product) => product.product,
});

const productSlice = createSlice({
  name: "product",
  initialState: productAdapter.getInitialState(),
  reducers: {
    initializeProducts: (state, action) => {
      productAdapter.addMany(state, action.payload);
    },
    toggleUnmask: (state, action) => {
      productAdapter.updateOne(state, {
        id: action.payload,
        changes: { unmask: !state.entities[action.payload].unmask },
      });
    },
  },
});

const { selectById: selectProductById } = productAdapter.getSelectors(
  (state) => state.product
);

export const createSelectProduct = (productId) => (state) =>
  selectProductById(state, productId);

export const { initializeProducts, toggleUnmask } = productSlice.actions;
export default productSlice.reducer;
