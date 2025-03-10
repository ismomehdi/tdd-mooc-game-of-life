import { describe, expect, test } from "vitest";
import {
  decodeCharacterCounts,
  getDimensions,
  parseRLE,
  patternToGrid,
  stripCommentsAndHeader,
} from "../src/lib/parseRLE.mjs";

describe("file parsing", () => {
  describe("getDimensions()", () => {
    test("parses dimensions", () => {
      const RLE =
        `#N Block\n` +
        `#C An extremely common 4-cell still life.\n` +
        `#C www.conwaylife.com/wiki/index.php?title=Block\n` +
        `x = 2, y = 2, rule = B3/S23\n` +
        `2o$2o!`;

      expect(getDimensions(RLE)).toEqual([2, 2]);
    });
  });

  describe("stripCommentsAndHeader()", () => {
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
  });

  describe("patternToGrid()", () => {
    test("converts a decoded block pattern to grid", () => {
      const pattern = "oo$oo!"; // the character counts are decoded
      const grid = patternToGrid(pattern);
      const expected = [
        [1, 1],
        [1, 1],
      ];
      expect(grid).toEqual(expected);
    });
  });

  describe("decodeCharacterCounts()", () => {
    test("decodes block character counts", () => {
      const RLE = "2o$2o!";
      const expected = "oo$oo!";
      expect(decodeCharacterCounts(RLE)).toBe(expected);
    });

    test("decodes blinker character counts", () => {
      const RLE = "3o!";
      const expected = "ooo!";
      expect(decodeCharacterCounts(RLE)).toBe(expected);
    });

    test("decodes glider character counts", () => {
      const RLE = "bob$2bo$3o!";
      const expected = "bob$bbo$ooo!";
      expect(decodeCharacterCounts(RLE)).toBe(expected);
    });
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
