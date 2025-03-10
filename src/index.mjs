import fs from "node:fs/promises";

if (parseInt(process.argv.length) != 3) {
  console.log("Error: No argument provided or too many arguments.");
} else {
  run(process.argv[2]);
}

export async function readFile(path) {
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

export async function run(filePath) {
  try {
    const data = await readFile(filePath);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
