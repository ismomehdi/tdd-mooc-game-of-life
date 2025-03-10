import fs from "node:fs/promises";

async function readFile(path) {
  const data = await fs.readFile(path, "utf8");
  const rows = data.split("\n");
  validateFile(rows);
  return data;
}
function validateFile(rows) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.startsWith("#")) continue;
    if (row.startsWith("x")) {
      if (!isValidHeader(row)) throw new Error("Error: Invalid header format.");
      break;
    } else {
      throw new Error("Error: No header found in the file.");
    }
  }
}
function isValidHeader(row) {
  const headerPattern = /x\s*=\s*(\d+),\s*y\s*=\s*(\d+),\s*rule\s*=\s*([A-Za-z0-9/]+)/;
  if (!headerPattern.test(row)) return false;
  return true;
}

export default readFile;
