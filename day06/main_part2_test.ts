import { assertEquals } from "@std/assert";
import type { Coordinate, Field } from "./main_part1.ts";
import {
  processInput,
  extractStartPosition,
  extractObstacles,
  createGuard,
  day06part2,
} from "./main_part2.ts";

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const testFinalField = `
....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..`;

const testVisited = new Set<string>([
  "0,4",
  "1,4",
  "1,5",
  "1,6",
  "1,7",
  "1,8",
  "2,4",
  "2,8",
  "3,4",
  "3,8",
  "4,2",
  "4,2",
  "4,3",
  "4,4",
  "4,5",
  "4,6",
  "4,8",
  "5,2",
  "5,4",
  "5,6",
  "5,8",
  "6,2",
  "6,3",
  "6,4",
  "6,5",
  "6,6",
  "6,7",
  "6,8",
  "7,1",
  "7,2",
  "7,3",
  "7,4",
  "7,5",
  "7,6",
  "8,1",
  "8,2",
  "8,3",
  "8,4",
  "8,5",
  "8,6",
  "8,7",
  "9,7",
]);

Deno.test(function guardTest() {
  const startPosition: Coordinate = [6, 4];
  const obstacles = new Set<string>([
    "0,4",
    "1,9",
    "3,2",
    "4,7",
    "6,1",
    "7,8",
    "8,0",
    "9,6",
  ]);
  const guard = createGuard(startPosition, obstacles);
  assertEquals(guard.getPosition(), [6, 4]);
  assertEquals(guard.getDirection(), [-1, 0]);
  guard.step();
  assertEquals(guard.getPosition(), [5, 4]);
  guard.turn();
  assertEquals(guard.getDirection(), [0, 1]);
  guard.step();
  assertEquals(guard.getPosition(), [5, 5]);
  guard.turn();
  assertEquals(guard.getDirection(), [1, 0]);
  guard.step();
  assertEquals(guard.getPosition(), [6, 5]);
  guard.turn();
  assertEquals(guard.getDirection(), [0, -1]);
  guard.step();
  assertEquals(guard.getPosition(), [6, 4]);
  guard.turn();
  assertEquals(guard.getDirection(), [-1, 0]);
  guard.step();
  assertEquals(guard.getPosition(), [5, 4]);
  const positionCollector = guard.done();
  const expectedVisited = new Set(["6,4", "5,4", "5,5", "6,5"]);
  assertEquals(positionCollector.values(), expectedVisited.values());
});

Deno.test(function processInputTest() {
  const expected: Field = [
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ];
  assertEquals(processInput(testInput), expected);
});

Deno.test(function extractStartPositionTest() {
  const expected: Coordinate = [6, 4];
  assertEquals(extractStartPosition(testInput), expected);
});

Deno.test(function extractObstaclesTest01() {
  const expected = new Set<string>([
    "0,4",
    "1,9",
    "3,2",
    "4,7",
    "6,1",
    "7,8",
    "8,0",
    "9,6",
  ]);
  assertEquals(extractObstacles(testInput), expected);
});

Deno.test(function extractObstaclesTest02() {
  const testInput = `.#..#
....#
.....
.^###`;
  const expected = new Set<string>(["0,1", "0,4", "1,4", "3,2", "3,3", "3,4"]);
  assertEquals(extractObstacles(testInput), expected);
});

Deno.test(function day06part2Test01() {
  const testPart1Expected = 41;
  assertEquals(day06part2(testInput), testPart1Expected);
});

Deno.test(function day06part2Test02() {
  const testInput = `.#.#
...#
.^#.`;
  const testPart1Expected = 4;
  assertEquals(day06part2(testInput), testPart1Expected);
});

Deno.test(function day06part2Test03() {
  const testInput = `.#..#
....#
.....
.^###`;
  const testPart1Expected = 8;
  assertEquals(day06part2(testInput), testPart1Expected);
});

Deno.test(function day06part2Test04() {
  const testInput = `#
.
.
.
.
^`;
  const testPart1Expected = 5;
  assertEquals(day06part2(testInput), testPart1Expected);
});
