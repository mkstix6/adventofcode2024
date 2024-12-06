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

export const getUpdateChecker = (rules: RulesList) => {
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
  // Remove problem Updates from collection
  const updateChecker = getUpdateChecker(rules);
  const validUpdates = updates.filter((pageList) => updateChecker(pageList));
  // Extract final answer
  const validMiddlePageList = validUpdates.map(
    (pageList) => pageList[Math.floor(pageList.length / 2)]
  );
  const total = validMiddlePageList.reduce((acc, page) => acc + page, 0);
  return total;
}

const getUpdateFixer = (rules: RulesList) => {
  const ruleSet = new Set(rules.map((rule) => rule.join(",")));
  return (pageList: Update) => {
    return pageList.toSorted((a, b) => {
      const rule = [a, b].join(",");
      if (!ruleSet.has(rule)) {
        return -1;
      }
      return 1;
    });
  };
};

export function day05part2(input: string): number {
  const { rules, updates } = parseInput(input);
  // Remove valid Updates from collection - keep broken Updates
  const updateChecker = getUpdateChecker(rules);
  const invalidUpdates = updates.filter((pageList) => !updateChecker(pageList));
  // Fix updates
  const updateFixer = getUpdateFixer(rules);
  const fixedUpdates = invalidUpdates.map((update) => updateFixer(update));
  // Extract final answer
  const fixedMiddlePageList = fixedUpdates.map(
    (pageList) => pageList[Math.floor(pageList.length / 2)]
  );
  const total = fixedMiddlePageList.reduce((acc, page) => acc + page, 0);
  return total;
}

if (import.meta.main) {
  console.log("Answer for day05 part1", day05part1(input));
  console.log("Answer for day05 part2", day05part2(input));
}
