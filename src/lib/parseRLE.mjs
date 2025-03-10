// todo
export function parseRLE(RLE) {
  // Strip comments and header
  return stripCommentsAndHeader(RLE);
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
