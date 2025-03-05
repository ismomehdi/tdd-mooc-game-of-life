import { describe, test } from "vitest";
import { expect } from "chai";
import { execSync } from "child_process";

describe("CLI", () => {
  test('prints "hello world"', () => {
    const output = execSync("node ./src/index.mjs").toString();
    expect(output).to.equal("hello world\n");
  });
});
