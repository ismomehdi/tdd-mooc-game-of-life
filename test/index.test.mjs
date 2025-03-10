import { execSync } from "child_process";
import { describe, expect, test } from "vitest";
import { getDimensions, parseRLE } from "../src/lib/parseRLE.mjs";
import { normalize } from "./lib/utils.mjs";

describe("CLI", () => {
  describe("input error handling", () => {
    test("outputs an error when no argument is provided", () => {
      const output = execSync("node ./src/index.mjs").toString();
      expect(output).toBe("Error: No argument provided or too many arguments.\n");
    });

    test("outputs an error when provided more than one argument", () => {
      const output = execSync("node ./src/index.mjs 1 2").toString();
      expect(output).toBe("Error: No argument provided or too many arguments.\n");
    });
  });

  describe("app", () => {
    test("prints the content of the provided file", () => {
      const output = execSync("node ./src/index.mjs ./test/data/block.rle").toString();
      expect(normalize(output)).toBe(
        normalize(`
          #N Block
          #C An extremely common 4-cell still life.
          #C www.conwaylife.com/wiki/index.php?title=Block
          x = 2, y = 2, rule = B3/S23
          2o$2o!
        `),
      );
    });
  });

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
      expect(parseRLE(RLE)).toEqual(expected);
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
});
