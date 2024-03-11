import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/dataset2.json";
import generateFloorplan from "../../utils/generateFloorplan";

const gridSlice = createSlice({
  name: "grid",
  initialState: {
    floorplan: generateFloorplan(products),
    source: null,
    target: null,
    grabbing: false,
  },
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setTarget: (state, action) => {
      state.target = action.payload;
    },
    swapProducts: (state) => {
      const { source, target } = state;
      if (source === null || target === null) {
        return;
      }
      const sourceGrid = Math.floor(source / 20) + 1;
      const sourceIndex = source % 20;
      const sourceProduct = state.floorplan[sourceGrid][sourceIndex];
      const targetGrid = Math.floor(target / 20) + 1;
      const targetIndex = target % 20;
      const targetProduct = state.floorplan[targetGrid][targetIndex];
      state.floorplan[sourceGrid][sourceIndex] = targetProduct;
      state.floorplan[targetGrid][targetIndex] = sourceProduct;
      state.source = null;
      state.target = null;
    },
  },
});

export const selectGridById = (state, gridId) => state.grid.floorplan[gridId];
export const { setSource, setTarget, setGrabbing, swapProducts } =
  gridSlice.actions;
export default gridSlice.reducer;
