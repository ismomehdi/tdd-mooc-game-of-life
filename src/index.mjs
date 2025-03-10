import readFile from "./lib/readFile.mjs";

if (parseInt(process.argv.length) != 3) {
  console.log("Error: No argument provided or too many arguments.");
} else {
  run(process.argv[2]);
}

export async function run(filePath) {
  try {
    const data = await readFile(filePath);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
