import { describe, expect, test } from "vitest";
import readFile from "../src/lib/readFile.mjs";
import { normalize } from "./lib/utils.mjs";

describe("readFile", () => {
  test("throws an error if the file does not contain a header", async () => {
    await expect(() => readFile("./test/data/no-header.rle")).rejects.toThrowError(
      "Error: No header found in the file.",
    );
  });

  test("throws an error if the header format is invalid", async () => {
    await expect(() => readFile("./test/data/invalid-header.rle")).rejects.toThrowError(
      "Error: Invalid header format.",
    );
  });

  test("prints the content of the provided file", async () => {
    const output = await readFile("./test/data/block.rle");
    expect(normalize(output.toString())).toBe(
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
