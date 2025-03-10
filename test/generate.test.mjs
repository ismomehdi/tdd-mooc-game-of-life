import { describe, expect, test } from "vitest";
import { countNeighbours, extendGrid, generate, shrinkGrid } from "../src/lib/generate.mjs";

describe("run a generation", () => {
  describe("extendGrid()", () => {
    test("extends grid to all directions by 1", () => {
      const grid = [
        [1, 1],
        [1, 1],
      ];

      const expected = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ];

      expect(extendGrid(grid)).toEqual(expected);
    });
  });

  describe("shrinkGrid()", () => {
    test("removes all empty rows and columns at the borders of the grid", () => {
      const grid = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ];
      const expected = [[1], [1], [1]];
      expect(shrinkGrid(grid)).toEqual(expected);
    });
  });

  describe("countNeighbours()", () => {
    test("counts neighbours of a cell", () => {
      const grid = [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ];

      expect(countNeighbours(grid, 0, 0)).toBe(0);
      expect(countNeighbours(grid, 0, 1)).toBe(0);
      expect(countNeighbours(grid, 0, 2)).toBe(1);
      expect(countNeighbours(grid, 0, 3)).toBe(0);

      expect(countNeighbours(grid, 1, 0)).toBe(0);
      expect(countNeighbours(grid, 1, 1)).toBe(1);
      expect(countNeighbours(grid, 1, 2)).toBe(1);
      expect(countNeighbours(grid, 1, 3)).toBe(1);

      expect(countNeighbours(grid, 2, 0)).toBe(0);
      expect(countNeighbours(grid, 2, 1)).toBe(2);
      expect(countNeighbours(grid, 2, 2)).toBe(1);
      expect(countNeighbours(grid, 2, 3)).toBe(1);

      expect(countNeighbours(grid, 3, 0)).toBe(1);
      expect(countNeighbours(grid, 3, 1)).toBe(0);
      expect(countNeighbours(grid, 3, 2)).toBe(2);
      expect(countNeighbours(grid, 3, 3)).toBe(0);

      expect(countNeighbours(grid, 4, 0)).toBe(0);
      expect(countNeighbours(grid, 4, 1)).toBe(1);
      expect(countNeighbours(grid, 4, 2)).toBe(0);
      expect(countNeighbours(grid, 4, 3)).toBe(0);
    });
  });

  describe("generate()", () => {
    test("any live cell with fewer than two live neighbours dies", () => {
      const grid = [[1, 1]];
      const expected = [];
      expect(generate(grid)).toEqual(expected);
    });

    test("any dead cell with exactly three live neighbours becomes a live cell", () => {
      const grid = [
        [1, 1],
        [0, 1],
        [1, 1],
      ];

      const expected = [
        [0, 1],
        [1, 1],
        [0, 1],
      ];

      expect(generate(grid)).toEqual(expected);
    });

    test("any live cell with more than three live neighbours dies", () => {
      const grid = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];

      const expected = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ];

      expect(generate(grid)).toEqual(expected);
    });
  });
});
