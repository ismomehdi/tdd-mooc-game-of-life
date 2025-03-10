function convertToRLE(grid) {
  let decoded = "";

  for (let y = 0; y < grid.length; y++) {
    let x = 0;
    const rowLength = grid[0].length;
    let count = 1;

    while (x < rowLength) {
      while (x < rowLength - 1 && grid[y][x] === grid[y][x + 1]) {
        count += 1;
        x++;
      }
      if (count > 1) {
        grid[y][x] === 0 ? (decoded += `${count}b`) : (decoded += `${count}o`);
      } else {
        grid[y][x] === 0 ? (decoded += `b`) : (decoded += `o`);
      }

      count = 1;
      x++;
    }

    y === grid.length - 1 ? (decoded += "!") : (decoded += "$");
  }
  return decoded;
}

export default convertToRLE;
