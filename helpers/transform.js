//
//
//
//
//
//
export const transform = (commits, config) => {
  for (const commit of commits) {
    commit.username = commit.username.trim().toLowerCase();
    commit.group = group(commit.date, config);
    commit.email = commit.email.trim().toLowerCase();
    commit.commit = commit.commit.trim();
    commit.hash = commit.hash.trim();
    commit.type =
      /.+?:/.test(commit.type) === true
        ? commit.type.match(/.+?:/)[0].trim()
        : null;
    commit.message = commit.message.trim().split(":")[1]?.trim();
    commit.order = assign_order(commit.commit);
  }

  commits = group_by(commits);

  commits.sort((a, b) => {
    if (b.group < a.group) return -1;
    if (b.group > a.group) return 1;
    return 0;
  });

  return commits;
};

//
//
//
//
//
//
export const group = (d, config) => {
  if (d !== undefined) {
    d = d.trim();
    if (config.group === "day") return d.substring(0, 10);
    if (config.group === "month") return d.substring(0, 7);
    if (config.group === "year") return d.substring(0, 4);
    if (config.group === "week") return get_week(d);
    return;
  }
};

//
//
//
//
//
//
export const assign_order = (string) => {
  string = string.trim().toLowerCase();
  if (string.startsWith("news")) return "a";
  if (string.startsWith("feat")) return "b";
  if (string.startsWith("fix")) return "c";
  if (string.startsWith("doc")) return "d";
  if (string.startsWith("style")) return "e";
  if (string.startsWith("refactor")) return "f";
  if (string.startsWith("perf")) return "g";
  if (string.startsWith("test")) return "h";
  if (string.startsWith("build")) return "i";
  if (string.startsWith("ci")) return "j";
  if (string.startsWith("chore")) return "k";
  if (string.startsWith("revert")) return "l";
  else return "m";
};

//
//
//
//
//
//
export const group_by = (commits) => {
  // a set of all possible groups
  const groups = new Set();
  for (const commit of commits) {
    groups.add(commit.group);
  }

  const data = [];

  // for each group, build the right object
  for (const group of groups) {
    // keep only corresponding commits
    const c = commits.filter((c) => c.group === group);

    // sort commits by `order`
    c.sort((a, b) => {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });

    // push data
    data.push({
      group: group,
      commits: c,
    });
  }

  return data;
};

//
//
//
//
//
//
export const get_week = (date) => {
  const current_date = new Date(date);
  const start_date = new Date(current_date.getFullYear(), 0, 1);
  const days = Math.floor((current_date - start_date) / (24 * 60 * 60 * 1000));
  const week_number = Math.ceil(days / 7);

  return date.substring(0, 5) + "W" + week_number;
};
