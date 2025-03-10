import { execSync } from "child_process";
import { describe, expect, test } from "vitest";

// strip excess whitespace and trim the string
const normalize = (str) => str.replace(/\s+/g, " ").trim();

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

    test("prints an error if the file does not contain a header", () => {
      const output = execSync("node ./src/index.mjs ./test/data/no-header.rle").toString();
      expect(output).toBe("Error: No header found in the file.\n");
    });
  });
});
