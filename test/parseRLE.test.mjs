import { describe, expect, test } from "vitest";
import { getDimensions, parseRLE, patternToGrid, stripCommentsAndHeader } from "../src/lib/parseRLE.mjs";

describe("file parsing", () => {
  test("parses dimensions", () => {
    const RLE =
      `#N Block\n` +
      `#C An extremely common 4-cell still life.\n` +
      `#C www.conwaylife.com/wiki/index.php?title=Block\n` +
      `x = 2, y = 2, rule = B3/S23\n` +
      `2o$2o!`;

    expect(getDimensions(RLE)).toEqual([2, 2]);
  });

  test("strips comments and header", () => {
    const RLE =
      `#N Block\n` +
      `#C An extremely common 4-cell still life.\n` +
      `#C www.conwaylife.com/wiki/index.php?title=Block\n` +
      `x = 2, y = 2, rule = B3/S23\n` +
      `2o$2o!`;
    const expected = "2o$2o!";
    expect(stripCommentsAndHeader(RLE)).toEqual(expected);
  });

  test("converts a decoded block pattern to grid", () => {
    const pattern = "oo$oo!"; // the character counts are decoded
    const grid = patternToGrid(pattern);
    const expected = [
      [1, 1],
      [1, 1],
    ];
    expect(grid).toEqual(expected);
  });

  // todo
  test.skip("converts a block", () => {
    const RLE =
      `#N Block\n` +
      `#C An extremely common 4-cell still life.\n` +
      `#C www.conwaylife.com/wiki/index.php?title=Block\n` +
      `x = 2, y = 2, rule = B3/S23\n` +
      `2o$2o!`;
    const expected = [
      [1, 1],
      [1, 1],
    ];

    expect(parseRLE(RLE)).toEqual(expected);
  });
});
