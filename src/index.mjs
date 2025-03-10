import fs from "node:fs/promises";

if (parseInt(process.argv.length) != 3) {
  console.log("Error: No argument provided or too many arguments.");
} else {
  run(process.argv[2]);
}

async function readFile(path) {
  try {
    const data = await fs.readFile(path, "utf8");
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function run(filePath) {
  const data = await readFile(filePath);
  console.log(data);
}
