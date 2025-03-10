import { describe, expect, test } from "vitest";
import convertToRLE from "../src/lib/convertToRLE.mjs";

describe("convert grid to RLE", () => {
  test('converts a "block" grid to RLE', () => {
    const grid = [
      [1, 1],
      [1, 1],
    ];
    const expected = "2o$2o!";
    expect(convertToRLE(grid)).toEqual(expected);
  });

  test('converts a "blinker" grid to RLE', () => {
    const grid = [[1, 1, 1]];
    const expected = "3o!";
    expect(convertToRLE(grid)).toEqual(expected);
  });

  test('converts a "glider" grid to RLE', () => {
    const grid = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
    ];
    const expected = "bo$2bo$3o!";
    expect(convertToRLE(grid)).toEqual(expected);
  });
});
