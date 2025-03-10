function parseRLE(RLE) {
  const strippedRLE = stripCommentsAndHeader(RLE);
  const decodedRLE = decodeCharacterCounts(strippedRLE);
  const grid = patternToGrid(decodedRLE);
  return grid;
}

export function decodeCharacterCounts(RLE) {
  let decoded = "";

  let i = 0;
  while (i < RLE.length) {
    let count = "";

    while (i < RLE.length && !isNaN(RLE[i])) {
      count += RLE[i];
      i++;
    }

    count = count ? parseInt(count) : 1;
    decoded += RLE[i].repeat(count);
    i++;
  }

  return decoded;
}

export function patternToGrid(pattern) {
  const rows = pattern.replace("!", "").split("$");
  return rows.map((row) => row.split("").map((char) => (char === "o" ? 1 : 0)));
}

export function stripCommentsAndHeader(RLE) {
  const rows = RLE.split("\n");
  let strippedRLE = "";

  for (let i = 0; i < rows.length; i++) {
    if (!(rows[i].startsWith("#") || rows[i].startsWith("x"))) {
      strippedRLE += rows[i];
    }
  }
  return strippedRLE;
}

export function getDimensions(RLE) {
  const dimensions = RLE.match(/x = (\d+), y = (\d+)/);
  return [parseInt(dimensions[1]), parseInt(dimensions[2])];
}

export default parseRLE;
