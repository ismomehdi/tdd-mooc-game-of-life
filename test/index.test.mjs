import { describe, test } from "vitest";
import { expect } from "chai";
import { sum } from "../src/index.mjs";

import { execSync } from "child_process";

describe("Example test fixture", () => {
  test("Example test", () => {
    expect(sum(1, 2)).to.equal(3);
  });
});

describe("CLI", () => {
  test('prints "hello world"', () => {
    const output = execSync("node ./src/index.mjs").toString();
    expect(output).to.equal("hello world\n");
  });
});
