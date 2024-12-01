import { assertEquals } from "@std/assert";
import { day01part1 } from "./main.ts";

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

const testExpected = 11;

Deno.test(function day01part1Test() {
  assertEquals(day01part1(testInput), testExpected);
});
