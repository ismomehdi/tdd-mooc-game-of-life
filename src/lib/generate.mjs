function generate(grid) {
  const newGrid = grid.map((row, y) =>
    row.map((_, x) => {
      const neighbourCount = countNeighbours(grid, y, x);
      if (grid[y][x] === 1) return neighbourCount < 2 ? 0 : neighbourCount > 3 ? 0 : 1;
      return neighbourCount === 3 ? 1 : 0;
    }),
  );
  return shrinkGrid(newGrid);
}

export function extendGrid(grid) {
  const newGrid = grid.map((row) => [0, ...row, 0]);
  const emptyRow = new Array(newGrid[0].length).fill(0);
  return [emptyRow, ...newGrid, emptyRow];
}

export function shrinkGrid(grid) {
  while (grid.length && grid[0].every((cell) => cell === 0)) grid.shift();
  while (grid.length && grid[grid.length - 1].every((cell) => cell === 0)) grid.pop();
  while (grid.length && grid.every((row) => row[0] === 0)) grid.forEach((row) => row.shift());
  while (grid.length && grid.every((row) => row[row.length - 1] === 0)) grid.forEach((row) => row.pop());
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

export default generate;
