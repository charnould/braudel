#!/usr/bin/env node

// node index.js --gh charnould/braudel --group day --news "a headlines" --message "some content"
// node index.js --news "A Headline" --message "Some content"
// node index.js --news "[A Headline](htts://www.google.com)" --message "Some content"

import { spawnSync } from "child_process";
import { parseArgs } from "node:util";
import fs from "fs";

import { generate_template } from "./helpers/template.js";
import { transform } from "./helpers/transform.js";
import { parse_logs } from "./helpers/parse.js";

export const run_braudel = async () => {
  try {
    // Load config
    const config = { gh: null, group: "day" };

    const {
      values: { gh, group, news, message },
    } = parseArgs({
      options: {
        gh: { type: "string" },
        group: { type: "string", short: "g" },
        news: { type: "string", short: "n" },
        message: { type: "string", short: "m" },
      },
    });

    config.gh = gh;
    config.group = group;
    console.log("1️⃣  Configured");

    if (news !== undefined) {
      spawnSync(
        "git",
        ["commit", "--allow-empty", "-m", `news:${news}`, "-m", message],
        { encoding: "utf-8" },
      );
    }

    const commits = parse_logs();
    console.log("2️⃣  Parsed");

    const cleaned_commits = transform(commits, config);
    console.log("3️⃣  Formatted");

    const template = generate_template(config, cleaned_commits);
    console.log("4️⃣  Generated");

    fs.writeFileSync("UPDATES.md", template);
    console.log("✅ Outputed");

    return;
  } catch (err) {
    console.error(err);
  }
};

run_braudel();
