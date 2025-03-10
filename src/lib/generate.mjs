export function extendGrid(grid) {
  const newGrid = grid.map((row) => [0, ...row, 0]);
  const emptyRow = new Array(newGrid[0].length).fill(0);
  return [emptyRow, ...newGrid, emptyRow];
}

export function shrinkGrid(grid) {
  // Remove empty rows
  if (grid[0].every((cell) => cell === 0)) grid.shift();
  if (grid[grid.length - 1].every((cell) => cell === 0)) grid.pop();

  // Remove empty columns
  if (grid.every((row) => row[0] === 0)) grid.forEach((row) => row.shift());
  if (grid.every((row) => row[row.length - 1] === 0)) grid.forEach((row) => row.pop());

  return grid;
}
