import { assertEquals } from "@std/assert";
import { day03part1, day03part2 } from "./main.ts";

Deno.test(function day03part1Test() {
  const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
  const testPart1Expected = 161;
  assertEquals(day03part1(testInput), testPart1Expected);
});

Deno.test(function day03part2Test() {
  const testInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
  const testPart2Expected = 48;
  assertEquals(day03part2(testInput), testPart2Expected);
});
