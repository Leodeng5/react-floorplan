import { MaxHeap } from "@datastructures-js/heap";

const pHeap = () => new MaxHeap((p) => p.count);

/**
 * Floorplan Generation Algorithm
 * -----------------------------
 * @description
 * Given an array of 80 products (RUs), generate a floorplan that satisfies the following constraints:
 * 1. Core i4/i5 products must be placed in grids 1 and 2.
 * 2. No two products can be adjacent to each other.
 * 3. Maximized spacing between similar products.
 * @param {Array} products - The array of 80 products (RUs).
 * @returns {Object} - The generated floorplan (4 arrays of 20 product names each).
 */
const generateFloorplan = (products) => {
  const counts = {};
  products.forEach((product) => {
    counts[product.product] = product.repeat;
  });

  // Initialize empty grid
  const grid = Array.from({ length: 4 }, () => Array(20).fill(null));
  let g = [20, 20, 20, 20]; // Remaining spaces in each grid

  // Reserve space for Core i4/i5 products
  const p = counts["Core i4"] + counts["Core i5"];
  const pAlloc = [Math.ceil(p / 2), Math.floor(p / 2)];
  g[0] -= pAlloc[0];
  g[1] -= pAlloc[1];

  // Assign products into grids, prioritizing highest repeat count
  products.sort((a, b) => b.repeat - a.repeat);
  const assigned = [pHeap(), pHeap(), pHeap(), pHeap()];
  products.forEach((product) => {
    let { product: name, repeat } = product;
    // Calculate how many products to place in each grid
    const alloc = Array(4).fill(0);
    if (name === "Core i4" || name === "Core i5") {
      // Core i4/i5 products: distribute evenly into grids 1 and 2
      const maxIndex = pAlloc.indexOf(Math.max(...pAlloc));
      const otherIndex = maxIndex === 0 ? 1 : 0;
      alloc[maxIndex] = Math.ceil(repeat / 2);
      alloc[otherIndex] = Math.floor(repeat / 2);
      pAlloc[0] -= alloc[0];
      pAlloc[1] -= alloc[1];
    } else {
      // Other products: distribute evenly across all grids
      for (let i = 0; i < repeat; i++) {
        let gridIndex = g.indexOf(Math.max(...g));
        alloc[gridIndex]++;
        g[gridIndex]--;
      }
    }

    for (let i = 0; i < 4; i++) {
      assigned[i].push({ count: alloc[i], name });
    }
  });

  // Place products into grids
  assigned.forEach((products, gridIndex) => {
    // Round robin, prioritizing highest count
    let i = 0;
    let prev = null;
    while (i < 20) {
      const product = products.pop();
      grid[gridIndex][i] = product.name;
      product.count--;
      if (prev) {
        products.push(prev);
      }
      prev = product;
      i++;
    }
  });

  return {
    1: grid[0],
    2: grid[1],
    3: grid[2],
    4: grid[3],
  };
};

export default generateFloorplan;
