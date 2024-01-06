# Floorplan: Rack Unit Table

ReactJS based application to render a floorplan (Rack Unit Table) based on a JSON dataset.

## Getting Started

`npm start` to run the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Overview:

### Data Transformation:

- Add `unmask` property to each product in redux state.
- Floorplan Allocation Algorithm:
  - Core i4/i5 products can only be placed in grids 1 and 2.
  - No two products can be adjacent to each other.
  - Space efficiency: maximize distance between products of the same type.

### RU Table:

- 80 RUs (0-indexed) divided into 4 grids.
- 4 Grids: 20 RUs per grid.
  1. Grid #
  2. Diode - onClick, toggle blue fill (clicked cell only)
  3. Unmask - onClick, toggle yellow fill (all cells of the same product)
  4. RU#
  5. Seat UUID (product name)
- MIDHALF row: divides table into two halves
- Other: Tape-in DB View, I/Os Block, MISC Block
