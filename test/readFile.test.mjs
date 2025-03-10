import { describe, expect, test } from "vitest";
import { readFile } from "../src/lib/readFile.mjs";

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
});
