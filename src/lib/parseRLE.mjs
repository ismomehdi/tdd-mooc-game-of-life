function parseRLE(RLE) {
  const [x, y] = getDimensions(RLE);
  const strippedRLE = stripCommentsAndHeader(RLE);
  const decodedRLE = decodeCharacterCounts(strippedRLE);
  const grid = patternToGrid(decodedRLE, x, y);
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

export function patternToGrid(pattern, x, y) {
  const rows = pattern.replace("!", "").split("$");
  const grid = Array.from({ length: y }, () => Array(x).fill(0));

  rows.forEach((row, y) => row.split("").forEach((char, x) => (char === "o" ? (grid[y][x] = 1) : (grid[y][x] = 0))));

  return grid;
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
