import { spawnSync } from "child_process";

export const parse_logs = () => {
  const { stdout } = spawnSync(
    "git",
    ["log", "--pretty=%h ¦ %s ¦ %aN ¦ %aE ¦ %aI "],
    { encoding: "utf-8" },
  );

  const split_by_line = stdout.split(/\n/);

  const items = [];
  for (const line of split_by_line) {
    const split = line.split("¦");

    items.push({
      username: split[2],
      date: split[4],
      email: split[3],
      commit: split[1],
      hash: split[0],
      type: split[1],
      message: split[1],
    });
  }

  items.pop();

  return items;
};
