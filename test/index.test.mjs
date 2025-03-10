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
      const output = execSync("node ./src/index.mjs 1 2 3").toString();
      expect(output).toBe("Error: No argument provided or too many arguments.\n");
    });

    test("outputs an error when generation count is NaN", () => {
      const output = execSync("node ./src/index.mjs ./test/data/block.rle x").toString();
      expect(output).toBe("Error: Invalid parameters, generation count should be a number.\n");
    });
  });

  describe("app", () => {
    test("prints the first generation for block", () => {
      const output = execSync("node ./src/index.mjs ./test/data/block.rle 1").toString();
      expect(normalize(output)).toBe(normalize(`2o$2o!`));
    });
  });
});
