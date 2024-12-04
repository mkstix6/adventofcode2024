const input = Deno.readTextFileSync("input.txt");

type Coordinates = [number, number];
/**
 * Find `XMAS` in the word search.
 */
export function day04part1(input: string): number {
  const target: string = "XMAS";
  const targetChars = target.split("");
  const matrix = input.split("\n").map((line) => [...line]);
  const stepCoordinates: Coordinates[] = [
    [-1, -1], // top left
    [-1, 0], // top
    [-1, 1], // top right
    [0, -1], // left
    [0, 1], // right
    [1, -1], // bottom left
    [1, 0], // bottom
    [1, 1], // bottom right
  ];

  let count: number = 0;

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const startChar = matrix[i][j];
      if (startChar !== targetChars[0]) {
        continue;
      }
      // check in each of the 8 surrounding directions
      stepCoordinates.forEach(([x, y]: Coordinates, index: number): void => {
        for (let k = 0; k < targetChars.length; k++) {
          const nextChar = matrix[i + (k + 1) * x]?.[j + (k + 1) * y];
          if (!nextChar || nextChar !== targetChars[k + 1]) {
            break;
          }
          if (k === targetChars.length - 2) {
            count++;
          }
        }
      });
    }
  }
  return count;
}

export function day04part2(input: string): number {
  const target: string = "MAS";
  const targetChars = target.split("");
  const matrix = input.split("\n").map((line) => [...line]);
  const stepCoordinates: Coordinates[] = [
    [-1, -1], // top left
    [-1, 1], // top right
    [1, -1], // bottom left
    [1, 1], // bottom right
  ];

  const crossCounts = new Map();
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const startChar = matrix[i][j];
      if (startChar !== targetChars[0]) {
        continue;
      }
      // check in each of the 4 diagonal directions
      stepCoordinates.forEach(([x, y]: Coordinates, index: number): void => {
        for (let k = 0; k < targetChars.length; k++) {
          const nextChar = matrix[i + (k + 1) * x]?.[j + (k + 1) * y];
          if (!nextChar || nextChar !== targetChars[k + 1]) {
            break;
          }
          if (k === targetChars.length - 2) {
            // Save the center coordinate of the word and count how many matches with the same center coordinate there are
            const [Ax, Ay] = [i + x, j + y];
            const mapKey: string = `${Ax},${Ay}`;
            if (!crossCounts.has(mapKey)) {
              crossCounts.set(mapKey, 1);
            } else {
              crossCounts.set(mapKey, crossCounts.get(mapKey) + 1);
            }
          }
        }
      });
    }
  }
  // Eliminate solo-matches that are not crosses
  for (const [key, value] of crossCounts.entries()) {
    if (value === 1) {
      crossCounts.delete(key);
    }
  }
  return [...crossCounts].length;
}

if (import.meta.main) {
  console.log("Answer for day04 part1", day04part1(input));
  console.log("Answer for day04 part2", day04part2(input));
}
