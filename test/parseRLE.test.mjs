import { describe, expect, test } from "vitest";
import {
  decodeCharacterCounts,
  getDimensions,
  parseRLE,
  patternToGrid,
  stripCommentsAndHeader,
} from "../src/lib/parseRLE.mjs";

const BlockRLE =
  `#N Block\n` +
  `#C An extremely common 4-cell still life.\n` +
  `#C www.conwaylife.com/wiki/index.php?title=Block\n` +
  `x = 2, y = 2, rule = B3/S23\n` +
  `2o$2o!`;

const blinkerRLE =
  `#N Blinker\n` +
  `#O John Conway\n` +
  `#C A period 2 oscillator that is the smallest and most common oscillator.\n` +
  `#C www.conwaylife.com/wiki/index.php?title=Blinker\n` +
  `x = 3, y = 1, rule = B3/S23\n` +
  `3o!`;

const gliderRLE =
  `#N Glider\n` +
  `#O Richard K. Guy\n` +
  `#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.\n` +
  `#C www.conwaylife.com/wiki/index.php?title=Glider\n` +
  `x = 3, y = 3, rule = B3/S23\n` +
  `bob$2bo$3o!`;

describe("file parsing", () => {
  describe("parseRLE()", () => {
    test("converts a block", () => {
      const expected = [
        [1, 1],
        [1, 1],
      ];

      expect(parseRLE(BlockRLE)).toEqual(expected);
    });

    test("converts a glider", () => {
      const expected = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
      ];

      expect(parseRLE(gliderRLE)).toEqual(expected);
    });

    test("converts a blinker", () => {
      const expected = [[1, 1, 1]];

      expect(parseRLE(blinkerRLE)).toEqual(expected);
    });
  });

  describe("getDimensions()", () => {
    test("parses dimensions", () => {
      expect(getDimensions(BlockRLE)).toEqual([2, 2]);
    });
  });

  describe("stripCommentsAndHeader()", () => {
    test("strips comments and header", () => {
      const expected = "2o$2o!";
      expect(stripCommentsAndHeader(BlockRLE)).toEqual(expected);
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
});
