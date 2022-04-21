// @ts-check

import { readFileSync } from "node:fs";

import { Octokit } from "octokit";
import core from "@actions/core";

import { captureError } from "./capture-error.js";

// we export the `run` function for testing.
// Call `run()` directly if this file is the entry point
if (import.meta.url.endsWith(process.argv[1])) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));

  run(process.env, event, core, octokit).catch((error) =>
    captureError(process.env, error)
  );
}

/**
 * @param {NodeJS.ProcessEnv} env
 * @param {import("@octokit/webhooks-types").IssuesEvent} event
 * @param {core} core
 * @param {Octokit} octokit
 */
export async function run(env, event, core, octokit) {
  // do your thing here. We simulate that an error gets thrown.
  throw new Error("test");
}
