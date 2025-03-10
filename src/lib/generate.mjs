export function extendGrid(grid) {
  const newGrid = grid.map((row) => [0, ...row, 0]);
  const emptyRow = new Array(newGrid[0].length).fill(0);
  return [emptyRow, ...newGrid, emptyRow];
}
