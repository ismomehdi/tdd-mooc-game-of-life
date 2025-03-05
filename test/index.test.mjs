import { describe, test } from "vitest";
import { expect } from "chai";
import { execSync } from "child_process";

describe("CLI", () => {
  test("outputs an error when no argument is provided", () => {
    const output = execSync("node ./src/index.mjs").toString();
    expect(output).toBe("Error: No argument provided\n");
  });
});
