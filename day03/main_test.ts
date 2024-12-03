import { assertEquals } from "@std/assert";
import { day03part1, day03part2 } from "./main.ts";

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

Deno.test(function day03part1Test() {
  const testPart1Expected = 161;
  assertEquals(day03part1(testInput), testPart1Expected);
});

Deno.test(function day03part2Test() {
  const testPart2Expected = 0;
  assertEquals(day03part2(testInput), testPart2Expected);
});
