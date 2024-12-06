// This file contains the solution for Advent of Code 2024, Day 05.
// It includes functions to parse input data, check update validity, and calculate results for both parts of the challenge.

const input = Deno.readTextFileSync("input.txt");

type Page = number;
type Rule = [Page, Page];
type RulesList = Rule[];
type Update = Page[];
type UpdatesCollection = Update[];

/**
 * Parses the input string into rules and updates collections.
 * @param input - The input string from the file.
 * @returns An object containing rules and updates collections.
 */
export function parseInput(input: string): {
  rules: RulesList;
  updates: UpdatesCollection;
} {
  const [rulesChunk, pagesChunk] = input.split("\n\n");

  // Parse rules
  const rules: RulesList = rulesChunk.split("\n").map((line) => {
    const [a, b] = line.split("|").map(Number);
    return [a, b];
  });

  // Parse updates
  const updates: UpdatesCollection = pagesChunk
    .split("\n")
    .map((line) => line.split(",").map(Number));

  return { rules, updates };
}

/**
 * Get the middle element of an array.
 * @param array - The array to get the middle element from.
 * @returns The middle element of the array.
 */
const pickMiddleElement = <T>(array: T[]): T => {
  return array[Math.floor(array.length / 2)];
};

/**
 * Creates a function to check if a list of pages follows the given rules.
 * @param rules - The list of rules.
 * @returns A function that checks if a page list is valid.
 */
export const getUpdateChecker = (rules: RulesList) => {
  const ruleSet = new Set(rules.map((rule) => rule.join(",")));

  return (pageList: Update): boolean => {
    for (let i = 0; i < pageList.length - 1; i++) {
      const rule = [pageList[i], pageList[i + 1]].join(",");
      if (!ruleSet.has(rule)) {
        return false;
      }
    }
    return true;
  };
};

/**
 * Solves part 1 of the challenge.
 * @param input - The input string from the file.
 * @returns The total of valid middle pages.
 */
export function day05part1(input: string): number {
  const { rules, updates } = parseInput(input);

  // Remove invalid updates
  const updateChecker = getUpdateChecker(rules);
  const validUpdates = updates.filter(updateChecker);

  // Extract middle pages and calculate total
  const middlePages = validUpdates.map(pickMiddleElement);
  return middlePages.reduce((acc, page) => acc + page, 0);
}

/**
 * Creates a function to fix invalid updates according to the rules.
 * @param rules - The list of rules.
 * @returns A function that fixes an invalid page list.
 */
const getUpdateFixer = (rules: RulesList) => {
  const ruleSet = new Set(rules.map((rule) => rule.join(",")));

  return (pageList: Update): Update => {
    return pageList.toSorted((a, b) => {
      const rule = [a, b].join(",");
      return ruleSet.has(rule) ? 1 : -1;
    });
  };
};

/**
 * Solves part 2 of the challenge.
 * @param input - The input string from the file.
 * @returns The total of fixed middle pages.
 */
export function day05part2(input: string): number {
  const { rules, updates } = parseInput(input);

  // Remove valid updates
  const updateChecker = getUpdateChecker(rules);
  const invalidUpdates = updates.filter((pageList) => !updateChecker(pageList));

  // Fix updates and calculate total
  const updateFixer = getUpdateFixer(rules);
  const fixedUpdates = invalidUpdates.map(updateFixer);
  const middlePages = fixedUpdates.map(pickMiddleElement);
  return middlePages.reduce((acc, page) => acc + page, 0);
}

if (import.meta.main) {
  try {
    console.log("Answer for day05 part1:", day05part1(input));
    console.log("Answer for day05 part2:", day05part2(input));
  } catch (error) {
    console.error("Error processing input:", error);
  }
}
