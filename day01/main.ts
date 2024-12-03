// deno get input contents from file and parse it
const input = Deno.readTextFileSync("input.txt");

export function day01part1(input: string): number {
  // split the columns of input into separate arrays
  const column1: number[] = [];
  const column2: number[] = [];
  for (const line of input.split("\n")) {
    const [a, b] = line.split("   ").map(Number);
    column1.push(a);
    column2.push(b);
  }

  column1.sort();
  column2.sort();

  let result: number = 0;

  for (let i = 0; i < column1.length; i++) {
    result += Math.abs(column1[i] - column2[i]);
  }
  return result;
}

export function day01part2(input: string): number {
  // split the columns of input into separate arrays
  const column1: number[] = [];
  const column2: number[] = [];
  for (const line of input.split("\n")) {
    const [a, b] = line.split("   ").map(Number);
    column1.push(a);
    column2.push(b);
  }

  column1.sort();
  column2.sort();

  let result: number = 0;

  for (let i = 0; i < column1.length; i++) {
    const primaryValue = column1[i];
    const valueCount = column2.filter((value) => value === primaryValue).length;
    result += primaryValue * valueCount;
  }
  return result;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Answer for day01 part1", day01part1(input));
  console.log("Answer for day01 part2", day01part2(input));
}
