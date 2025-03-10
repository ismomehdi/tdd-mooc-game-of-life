import convertToRLE from "./lib/convertToRLE.mjs";
import generate from "./lib/generate.mjs";
import parseRLE from "./lib/parseRLE.mjs";
import readFile from "./lib/readFile.mjs";

if (parseInt(process.argv.length) != 3) {
  console.log("Error: No argument provided or too many arguments.");
} else {
  run(process.argv[2]);
}

export async function run(filePath) {
  try {
    const data = await readFile(filePath);
    const parsedData = parseRLE(data);
    const generated = generate(parsedData);
    const RLE = convertToRLE(generated);
    console.log(RLE);
  } catch (err) {
    console.log(err);
  }
}
