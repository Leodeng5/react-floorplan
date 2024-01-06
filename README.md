# Intel Full Stack Assessment: Floorplan

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

### RU Table:

- 80 RUs (0-indexed) divided into 4 grids.
- Grid (5 columns): 20 RUs per grid.
  1. Grid
  2. Diode - onClick, toggle blue fill (clicked cell only)
  3. Unmask - onClick, toggle yellow fill (all cells of the same product)
  4. RU#
  5. Seat UUID (product name)
- MIDHALF row: divides the table into two halves.
- Other: I/Os, Tape-in DB View, MISC Block

## Component Outline:

- App
  - Floorplan - RU Table Skeleton
    1. Tape-in DB View
    2. Labels Row: Grid, Diode, Unmask, RU#, Seat UUID, etc.
    3. Grids 1 and 2 (includes I/Os Block)
    4. MIDHALF row
    5. Grids 3 and 4
    6. MISC block
