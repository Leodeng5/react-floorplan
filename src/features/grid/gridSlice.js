import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/dataset2.json";
import generateFloorplan from "../../utils/generateFloorplan";

const gridSlice = createSlice({
  name: "grid",
  initialState: generateFloorplan(products),
  reducers: {},
});

export const selectGridById = (state, gridId) => state.grid[gridId];

export default gridSlice.reducer;
