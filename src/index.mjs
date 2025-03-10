import convertToRLE from "./lib/convertToRLE.mjs";
import generate from "./lib/generate.mjs";
import parseRLE from "./lib/parseRLE.mjs";
import readFile from "./lib/readFile.mjs";

if (parseInt(process.argv.length) != 4) {
  console.log("Error: No argument provided or too many arguments.");
} else if (isNaN(process.argv[3])) {
  console.log("Error: Invalid parameters, generation count should be a number.");
} else {
  run(process.argv[2], process.argv[3]);
}

export async function run(filePath, generationCount) {
  try {
    const data = await readFile(filePath);
    const parsedData = parseRLE(data);

    let generation = parsedData;

    for (let i = 0; i < generationCount; i++) {
      generation = generate(generation);
    }

    const RLE = convertToRLE(generation);
    console.log(RLE);
  } catch (err) {
    console.log(err);
  }
}
