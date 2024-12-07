const input = Deno.readTextFileSync("input.txt");

export type Coordinate = [number, number];
export type Field = string[][];

export const processInput = (input: string): string[][] =>
  input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

interface Guard {
  positionCollector: Set<string>;
  step: () => void;
  checkObstacleAhead: () => boolean;
  turn: () => void;
  position: Coordinate;
  direction: Coordinate;
  getPosition: () => Coordinate;
  getDirection: () => Coordinate;
  done: () => Set<string>;
}
export const createGuard = (
  startPosition: Coordinate,
  obstacles: Set<string>
) => {
  const guard: Guard = {
    positionCollector: new Set([`${startPosition[0]},${startPosition[1]}`]),
    step: function () {
      while (this.checkObstacleAhead()) {
        this.turn();
      }
      this.position = [
        this.position[0] + this.direction[0],
        this.position[1] + this.direction[1],
      ];
      this.positionCollector.add(`${this.position[0]},${this.position[1]}`);
    },
    checkObstacleAhead: function () {
      const x = this.position[0] + this.direction[0];
      const y = this.position[1] + this.direction[1];
      return obstacles.has(`${x},${y}`);
    },
    turn: function () {
      const [x, y] = this.direction;
      if (x === 0 && y === 1) {
        this.direction = [1, 0];
      } else if (x === 1 && y === 0) {
        this.direction = [0, -1];
      } else if (x === 0 && y === -1) {
        this.direction = [-1, 0];
      } else if (x === -1 && y === 0) {
        this.direction = [0, 1];
      }
    },
    position: startPosition || [0, 0],
    direction: [-1, 0],
    getPosition: function () {
      return this.position;
    },
    getDirection: function () {
      return this.direction;
    },
    done: function () {
      return this.positionCollector;
    },
  };
  return guard;
};

export const extractStartPosition = (input: string): Coordinate => {
  const field = processInput(input);
  for (let x = 0; x < field.length; x++) {
    const y = field[x].indexOf("^");
    if (y !== -1) {
      return [x, y];
    }
  }
  throw new Error("No start position found");
};

export const extractObstacles = (input: string): Set<string> => {
  const field = processInput(input);
  const obstacles: Set<string> = new Set();
  for (let x = 0; x < field.length; x++) {
    for (let y = 0; y < field[x].length; y++) {
      if (field[x][y] === "#") {
        obstacles.add(`${x},${y}`);
      }
    }
  }
  return obstacles;
};

export function day06part1(input: string): number {
  const field = processInput(input);
  const fieldDimensions = [field.length, field[0].length];
  const guard = createGuard(
    extractStartPosition(input),
    extractObstacles(input)
  );
  while (
    guard.position[0] >= 0 &&
    guard.position[1] >= 0 &&
    guard.position[0] < fieldDimensions[0] &&
    guard.position[1] < fieldDimensions[1]
  ) {
    guard.step();
  }
  const visited = guard.done();
  return visited.size - 1;
}

export function day06part2(input: string): number {
  return 0;
}

if (import.meta.main) {
  console.log("Answer for day06 part1", day06part1(input));
  console.log("Answer for day06 part2", day06part2(input));
}
