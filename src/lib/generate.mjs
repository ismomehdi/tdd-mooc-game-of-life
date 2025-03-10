export function generate(grid) {}

export function extendGrid(grid) {
  const newGrid = grid.map((row) => [0, ...row, 0]);
  const emptyRow = new Array(newGrid[0].length).fill(0);
  return [emptyRow, ...newGrid, emptyRow];
}

export function shrinkGrid(grid) {
  while (grid[0].every((cell) => cell === 0)) grid.shift();
  while (grid[grid.length - 1].every((cell) => cell === 0)) grid.pop();
  while (grid.every((row) => row[0] === 0)) grid.forEach((row) => row.shift());
  while (grid.every((row) => row[row.length - 1] === 0)) grid.forEach((row) => row.pop());
  return grid;
}

export function countNeighbours(grid, y, x) {
  let count = 0;
  if (y !== 0 && grid[y - 1][x] === 1) count++;
  if (y !== grid.length - 1 && grid[y + 1][x] === 1) count++;
  if (x !== 0 && grid[y][x - 1] === 1) count++;
  if (x !== grid[0].length - 1 && grid[y][x + 1] === 1) count++;
  return count;
}
