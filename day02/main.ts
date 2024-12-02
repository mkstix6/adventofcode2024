// deno get input contents from file and parse it
const input = Deno.readTextFileSync("input.txt");

const formatReports = (input: string): Report[] =>
  input
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));

type Report = number[];

const directionCheck = (report: Report): boolean => {
  const direction = Math.sign(report[1] - report[0]);
  const startIndex = 2;
  for (let index = startIndex; index < report.length; index++) {
    if (Math.sign(report[index] - report[index - 1]) !== direction) {
      return false;
    }
  }
  return true;
};

const differenceCheck = (report: Report): boolean => {
  const startIndex = 1;
  for (let index = startIndex; index < report.length; index++) {
    if (Math.abs(report[index] - report[index - 1]) > 3) {
      return false;
    }
  }
  return true;
};

const isSafeReport = (report: Report): boolean => {
  return directionCheck(report) && differenceCheck(report);
};

/**
 * A report is "safe" if the following conditions are met:
 * - The levels are either all increasing or all decreasing.
 * - Any two adjacent levels differ by at least one and at most three.
 * How many reports are safe?
 */
export function day02part1(input: string): number {
  const reports: Report[] = formatReports(input);
  const safeReports: Report[] = reports.filter(isSafeReport);
  return safeReports.length;
}

/**
 * Same as above, but a Report can have one level removed to make it safe.
 * How many reports are safe?
 */
export function day02part2(input: string): number {
  const reports: Report[] = formatReports(input);
  const safeReports: Report[] = reports.filter((report: Report) => {
    if (isSafeReport(report)) {
      return true;
    }
    for (let index = 0; index < report.length; index++) {
      const newReport = [...report];
      newReport.splice(index, 1);
      if (isSafeReport(newReport)) {
        return true;
      }
    }
    return false;
  });
  return safeReports.length;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Answer for day 02 part 1", day02part1(input));
  console.log("Answer for day 02 part 2", day02part2(input));
}
