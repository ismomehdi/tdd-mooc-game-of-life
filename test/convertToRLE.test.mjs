import { describe, expect, test } from "vitest";
import convertToRLE, { createHeader, parsePattern } from "../src/lib/convertToRLE.mjs";

describe("convert grid to RLE", () => {
  describe("parsePattern()", () => {
    test('converts a "block" grid to RLE', () => {
      const grid = [
        [1, 1],
        [1, 1],
      ];
      const expected = "2o$2o!";
      expect(parsePattern(grid)).toEqual(expected);
    });

    test('converts a "blinker" grid to RLE', () => {
      const grid = [[1, 1, 1]];
      const expected = "3o!";
      expect(parsePattern(grid)).toEqual(expected);
    });

    test('converts a "glider" grid to RLE', () => {
      const grid = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
      ];
      const expected = "bo$2bo$3o!";
      expect(parsePattern(grid)).toEqual(expected);
    });
  });

  describe("createHeader()", () => {
    test("creates a header based on the grid", () => {
      const grid = [
        [0, 1, 0, 1],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
      ];
      const expected = "x = 4, y = 3";
      expect(createHeader(grid)).toEqual(expected);
    });
  });

  describe("convertToHeader()", () => {
    test("returns a string with the header & the pattern", () => {
      const grid = [[1]];
      const expected = "x = 1, y = 1\no!";
      expect(convertToRLE(grid)).toEqual(expected);
    });
  });
});
