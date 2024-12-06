const input = Deno.readTextFileSync("input.txt");

type Page = number;
type Rule = [Page, Page];
type RulesList = Rule[];
type Update = Page[];
type UpdatesCollection = Update[];

export function parseInput(input: string): {
  rules: RulesList;
  updates: UpdatesCollection;
} {
  const [rulesChunk, pagesChunk] = input.split("\n\n");
  const rules: RulesList = rulesChunk.split("\n").map((line) => {
    const [a, b] = line.split("|").map(Number);
    return [a, b];
  });
  const updates: UpdatesCollection = pagesChunk
    .split("\n")
    .map((line) => line.split(",").map(Number));
  return {
    rules,
    updates,
  };
}

export const getPageListChecker = (rules: RulesList) => {
  const ruleSet = new Set(rules.map((rule) => rule.join(",")));
  return (pageList: Update) => {
    for (let i = 0; i < pageList.length - 1; i++) {
      const a = pageList[i];
      const b = pageList[i + 1];
      const rule = [a, b].join(",");
      if (!ruleSet.has(rule)) {
        return false;
      }
    }
    return true;
  };
};

export function day05part1(input: string): number {
  const { rules, updates } = parseInput(input);
  // Set up validator
  const pageListChecker = getPageListChecker(rules);
  //   Remove problem Updates from collection
  const validUpdates = updates.filter((pageList) => pageListChecker(pageList));
  // Get middle pages
  const validMiddlePageList = validUpdates.map(
    (pageList) => pageList[Math.floor(pageList.length / 2)]
  );
  // Sum middle pages
  const total = validMiddlePageList.reduce((acc, page) => acc + page, 0);
  return total;
}

export function day05part2(input: string): number {
  return 0;
}

if (import.meta.main) {
  console.log("Answer for day05 part1", day05part1(input));
  console.log("Answer for day05 part2", day05part2(input));
}
