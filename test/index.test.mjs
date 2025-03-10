import { execSync } from "child_process";
import { describe, expect, test } from "vitest";

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
    test.skip("prints the content of the provided file", () => {
      const output = execSync("node ./src/index.mjs ./test/data/block.rle").toString();
      expect(output).toBe("Hello World!");
    });
  });
});
