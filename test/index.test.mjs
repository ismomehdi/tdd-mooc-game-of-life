import { execSync } from "child_process";
import { describe, expect, test } from "vitest";
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
    test("prints grid for block", () => {
      const output = execSync("node ./src/index.mjs ./test/data/block.rle").toString();
      expect(normalize(output)).toBe(normalize(`[ [ 1, 1 ], [ 1, 1 ] ]`));
    });
  });
});
