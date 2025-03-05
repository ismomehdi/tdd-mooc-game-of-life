if (parseInt(process.argv.length) != 3) {
  console.log("Error: No argument provided or too many arguments.");
} else {
  run(process.argv[2]);
}

export function run(filePath) {
  console.log(filePath);
}
