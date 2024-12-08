import { assertEquals } from "@std/assert";
import { day07part1, day07part2 } from "./main.ts";

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

Deno.test(function day07part1Test() {
  const testPart1Expected = 3749;
  assertEquals(day07part1(testInput), testPart1Expected);
});

Deno.test(function day07part2Test() {
  const testPart2Expected = 0;
  assertEquals(day07part2(testInput), testPart2Expected);
});
