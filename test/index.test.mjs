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
      expect(normalize(output)).toBe(normalize(`x = 2, y = 2\n2o$2o!`));
    });
    test("prints the first generation for blinker", () => {
      const output = execSync("node ./src/index.mjs ./test/data/blinker.rle 1").toString();
      expect(normalize(output)).toBe(normalize(`x = 1, y = 3\no$o$o!`));
    });
    test("prints the first generation for glider", () => {
      const output = execSync("node ./src/index.mjs ./test/data/glider.rle 1").toString();
      expect(normalize(output)).toBe(normalize(`x = 3, y = 3\nobo$b2o$bo!`));
    });
    test("prints the 0th gen gosper glider gun", () => {
      const output = execSync("node ./src/index.mjs ./test/data/gosper-glider-gun.rle 0").toString();
      expect(normalize(output)).toBe(
        normalize(
          `x = 36, y = 9\n24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o!`,
        ),
      );
    });
    test("prints the first generation for gosper glider gun", () => {
      const output = execSync("node ./src/index.mjs ./test/data/gosper-glider-gun.rle 1").toString();
      expect(normalize(output)).toBe(
        normalize(
          `x = 36, y = 9\n23bo$21bobo$12bo7bobo11b2o$11b2o6bo2bo11b2o$2o8b2o4b2o2bobo$2o7b3o4b2o3bobo$10b2o4b2o5bo$11b2o$12bo!`,
        ),
      );
    });
  });
});
