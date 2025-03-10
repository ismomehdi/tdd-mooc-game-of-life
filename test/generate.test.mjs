import { describe, expect, test } from "vitest";
import { extendGrid } from "../src/lib/generate.mjs";

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
});
