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

    test("prints the 2nd gen blinker", () => {
      const output = execSync("node ./src/index.mjs ./test/data/blinker.rle 2").toString();
      expect(normalize(output)).toBe(normalize(`x = 3, y = 1\n3o!`));
    });

    test("prints the first generation for glider", () => {
      const output = execSync("node ./src/index.mjs ./test/data/glider.rle 1").toString();
      expect(normalize(output)).toBe(normalize(`x = 3, y = 3\nobo$b2o$bo!`));
    });

    test("prints the 2nd gen glider", () => {
      const output = execSync("node ./src/index.mjs ./test/data/glider.rle 2").toString();
      expect(normalize(output)).toBe(normalize(`x = 3, y = 3\n2bo$obo$b2o!`));
    });

    test("prints the 3rd gen glider", () => {
      const output = execSync("node ./src/index.mjs ./test/data/glider.rle 3").toString();
      expect(normalize(output)).toBe(normalize(`x = 3, y = 3\no$b2o$2o!`));
    });

    test("prints the 10th gen glider", () => {
      const output = execSync("node ./src/index.mjs ./test/data/glider.rle 10").toString();
      expect(normalize(output)).toBe(normalize(`x = 3, y = 3\n2bo$obo$b2o!`));
    });

    test("prints the first generation for crotchet", () => {
      const output = execSync("node ./src/index.mjs ./test/data/crotchet.rle 1").toString();
      expect(normalize(output)).toBe(normalize(`x = 3, y = 3\n2o$2bo$2o!`));
    });

    test("prints the 2nd generation for crotchet", () => {
      const output = execSync("node ./src/index.mjs ./test/data/crotchet.rle 2").toString();
      expect(normalize(output)).toBe(normalize(`x = 2, y = 3\no$bo$o!`));
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

    test("prints the 2nd gen gosper glider gun", () => {
      const output = execSync("node ./src/index.mjs ./test/data/gosper-glider-gun.rle 2").toString();
      expect(normalize(output)).toBe(
        normalize(
          `x = 36, y = 9\n22bo$21bobo$11b2o7bob2o10b2o$10bobo6b2ob2o10b2o$2o7bo6b3obob2o$2o7bo2bo2bo2bo2bobo$9bo6b2o4bo$10bobo$11b2o!`,
        ),
      );
    });

    test("prints the 10th gen gosper glider gun", () => {
      const output = execSync("node ./src/index.mjs ./test/data/gosper-glider-gun.rle 10").toString();
      expect(normalize(output)).toBe(
        normalize(
          `x = 36, y = 9\n23b2o$23b2o$10bo4bo10b2o6b2o$8bobo4bo10b3o5b2o$2o4b2o7bo10b2o$2o4b2o11b2o2b2o$6b2o8b2o2bo2b2o$8bobo5b4o$10bo7bo!`,
        ),
      );
    });
  });
});
