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
  return 0;
}

if (import.meta.main) {
  console.log("Answer for day04 part1", day04part1(input));
  console.log("Answer for day04 part2", day04part2(input));
}
