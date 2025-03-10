import fs from "node:fs/promises";

if (parseInt(process.argv.length) != 3) {
  console.log("Error: No argument provided or too many arguments.");
} else {
  run(process.argv[2]);
}

export async function readFile(path) {
  const data = await fs.readFile(path, "utf8");
  const rows = data.split("\n");

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].startsWith("#")) continue;

    if (rows[i].startsWith("x")) {
      if (!isValidHeader(rows, i)) return "Error: Invalid header format.";
      break;
    } else {
      throw new Error("Error: No header found in the file.");
    }
  }

  return data;
}

function isValidHeader(rows, i) {
  const headerPattern = /x\s*=\s*(\d+),\s*y\s*=\s*(\d+),\s*rule\s*=\s*([A-Za-z0-9/]+)/;
  if (!headerPattern.test(rows[i])) return false;
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
