import { assertEquals } from "@std/assert";
import { day01part1, day01part2 } from "./main.ts";

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test(function day01part1Test() {
  const testPart1Expected = 11;
  assertEquals(day01part1(testInput), testPart1Expected);
});

Deno.test(function day01part2Test() {
  const testPart2Expected = 31;
  assertEquals(day01part2(testInput), testPart2Expected);
});
