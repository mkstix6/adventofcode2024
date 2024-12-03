const input = Deno.readTextFileSync("input.txt");

export function day03part1(input: string): number {
  const matcher = /mul\((\d+),(\d+)\)/g;
  return [...input.matchAll(matcher)]
    .map((match) => parseInt(match[1]) * parseInt(match[2]))
    .reduce((acc, val) => acc + val, 0);
}

export function day03part2(input: string): number {
  const validInstructions = input
    .split("do()")
    .map((line) => line.split("don't()")[0])
    .join();
  return day03part1(validInstructions);
}

if (import.meta.main) {
  console.log("Answer for day 03 part 1", day03part1(input));
  console.log("Answer for day 03 part 2", day03part2(input));
}
