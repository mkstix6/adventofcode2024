// deno get input contents from file and parse it
const input = Deno.readTextFileSync("input.txt");
const formatReports = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

/**
 * A report is "safe" if the following conditions are met:
 * - The levels are either all increasing or all decreasing.
 * - Any two adjacent levels differ by at least one and at most three.
 * How many reports are safe?
 */
export function day02part1(input: string): number {
  const directionCheck: (report: number[]) => boolean = (report) => {
    const direction = Math.sign(report[1] - report[0]);
    const skipTwo = 2;
    for (let index = skipTwo; index < report.length; index++) {
      if (Math.sign(report[index] - report[index - 1]) !== direction) {
        return false;
      }
    }
    return true;
  };

  const differenceCheck: (report: number[]) => boolean = (report: number[]) => {
    for (let index = 1; index < report.length; index++) {
      if (Math.abs(report[index] - report[index - 1]) > 3) {
        return false;
      }
    }
    return true;
  };

  const reports: number[][] = formatReports(input);
  const safeReports: number[][] = reports
    .filter(directionCheck)
    .filter(differenceCheck);

  return safeReports.length;
}

export function day02part2(input: string): number {
  return 0;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Answer for day 02 part 1", day02part1(input));
  console.log("Answer for day 02 part 2", day02part2(input));
}
