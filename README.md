# github-actions-sentry-example

This repository is an example of how to send errors that occur in a GitHub Actions workflow build to [Sentry](https://sentry.io/welcome/), using [the Sentry SDK for Node.js](https://docs.sentry.io/platforms/node/).

## Usage

Create a project on [Sentry](https://sentry.io/) and set the DSN as `SENTRY_DSN` repository secret. Then pass it to your script, like so:

```yml
name: My Workflow
"on":
  workflow_dispatch: {}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 16
          cache: npm
      - run: npm ci --production
      - run: node index.js
        env:
          SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
```

## License

[ISC](LICENSE.md)
