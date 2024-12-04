import { assertEquals } from "@std/assert";
import { day04part1, day04part2 } from "./main.ts";

Deno.test(function day04part1Test() {
  const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  const testPart1Expected = 18;
  assertEquals(day04part1(testInput), testPart1Expected);
});

Deno.test(function day04part2Test() {
  const testInput = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;
  const testPart2Expected = 9;
  assertEquals(day04part2(testInput), testPart2Expected);
});
