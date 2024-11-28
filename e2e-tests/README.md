# e2e Tests with Playwright

These are e2e tests that are written using [Playwright](https://playwright.dev/) for this Wasp app.

## Running the tests

### Locally

First, install the test dependencies:

```shell
cd e2e-tests && npm install
```

Then, in the same dir, install Playwright browser binaries:

```shell
npx playwright install
```

Start your Wasp DB and leave it running:

```shell
cd ../ && wasp db start
```

Open another terminal and start the Wasp app with the environment variable set to skip email verification in development mode:

```shell
SKIP_EMAIL_VERIFICATION_IN_DEV=true wasp start
```

NOTE: When using the email auth method a verification link is sent when the user registers, or logged to the console if you're using the default Dummy provider. You must click this link to complete registration. Setting SKIP_EMAIL_VERIFICATION_IN_DEV to "true" skips this verification step, allowing you to automatically log in. This step must be skipped when running tests, otherwise the tests will hang and fail as the verification link is never clicked!

In another terminal, run the local e2e tests:

```shell
cd e2e-tests && npm run local:e2e:start
```

This will start the tests in Playwright's UI mode, which will allow you to see and run the tests in an interactive browser environment.

To exit the local e2e tests, go back to the terminal were you started your tests and press `ctrl + c`.

## CI/CD

Update the app name in the `ci:e2e:cleanup-db` script in the `package.json` file to match the name of your app. This script is used to clean up the database after the tests have run.

> [!IMPORTANT]  
> Please make sure to update the `WASP_VERSION` environment variable in the `e2e-tests.yml` file to match the version of Wasp you are using in your project.

In order for these tests to run correctly on GitHub, you need to provide the environment variables mentioned in the `e2e-tests.yml` file within your GitHub repository's "Actions" secrets so that they can be accessed by the tests.

Upon pushing to the repository's main branch, or creating a PR against the main branch, the tests will run in the CI/CD pipeline.
