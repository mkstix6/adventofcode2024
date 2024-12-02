// deno get input contents from file and parse it
const input = Deno.readTextFileSync("input.txt");

export function dayXXpart1(input: string): number {
  return 0;
}

export function dayXXpart2(input: string): number {
  return 0;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Answer for day 02 part 1", dayXXpart1(input));
  console.log("Answer for day 02 part 2", dayXXpart2(input));
}
