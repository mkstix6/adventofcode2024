// deno get input contents from file and parse it
const input = Deno.readTextFileSync("input.txt");

export function day02part1(input: string): number {
  return 0;
}

export function day02part2(input: string): number {
  return 0;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Answer for day 02 part 1", day02part1(input));
  console.log("Answer for day 02 part 2", day02part2(input));
}