import { assertEquals } from "@std/assert";
import { day02part1, day02part2 } from "./main.ts";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

Deno.test(function day02part1Test() {
  const testPart1Expected = 2;
  assertEquals(day02part1(testInput), testPart1Expected);
});

Deno.test(function day02part2Test() {
  const testPart2Expected = 0;
  assertEquals(day02part2(testInput), testPart2Expected);
});
