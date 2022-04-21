import * as Sentry from "@sentry/node";
import core from "@actions/core";

/**
 * Send error to Sentry if `SENTRY_DSN` is set, otherwise log out error to console.
 *
 * @param {NodeJS.ProcessEnv} env
 * @param {Error} error
 */
export function captureError({ SENTRY_DSN, ...env }, error) {
  if (!SENTRY_DSN) {
    core.info("# Environment Variables");
    for (const [key, value] of Object.entries(env)) {
      core.info(`${key}=${value}`);
    }
    core.setFailed(error);
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    release: "github/howie@" + env.HOWIE_VERSION,
  });

  const repository = env.GITHUB_REPOSITORY.split("/").pop();
  const build = {
    summary: `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_NUMBER}`,
    job: `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/runs/${env.GITHUB_JOB}`,
    attempt: env.GITHUB_RUN_ATTEMPT,
  };

  Sentry.captureException(error, {
    contexts: {
      build,
      env,
    },
    tags: {
      repository,
    },
    user: {
      id: env.GITHUB_ACTOR,
    },
  });
}
