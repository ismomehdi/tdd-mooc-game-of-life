import { describe, expect, test } from "vitest";
import { extendGrid, shrinkGrid } from "../src/lib/generate.mjs";

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
    test("removes empty rows and columns at the borders of the grid", () => {
      const grid = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ];
      const expected = [[1], [1], [1]];
      expect(shrinkGrid(grid)).toEqual(expected);
    });
  });

  // todo
  describe("generate()", () => {
    test.skip("any live cell with fewer than two live neighbours dies", () => {
      const grid = [[1, 1, 1]];
      const expected = [[1], [1], [1]];
      throw new Error("Not implemented");
    });
  });
});
