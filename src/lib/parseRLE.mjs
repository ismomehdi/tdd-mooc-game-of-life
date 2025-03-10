// todo
export function parseRLE(RLE) {
  const rows = RLE.split("\n");

  // Strip comments and header
  return stripCommentsAndHeader(rows);
}

function stripCommentsAndHeader(rows) {
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
