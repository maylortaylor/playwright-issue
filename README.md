# AMVER UI

## Table of Contents

- [AMVER UI](#amver-ui)
  - [Table of Contents](#table-of-contents)
- [Pole Star Defense Team Odyssey](#pole-star-defense-team-odyssey)
  - [Installation](#installation)
  - [Checking Your Work](#checking-your-work)
  - [.vscode/ Folder Information](#vscode-folder-information)
    - [Tasks.json - VSCode Tasks Made Easy](#tasksjson---vscode-tasks-made-easy)
    - [Launch.json - Running Locally With VSCode](#launchjson---running-locally-with-vscode)
      - [Launch Configurations](#launch-configurations)
  - [Updating Package.json](#updating-packagejson)
  - [Docker](#docker)
  - [Testing](#testing)
    - [Playwright + Allure](#playwright--allure)
      - [Running Playwright Tests](#running-playwright-tests)
      - [Running Allure Report](#running-allure-report)
  - [Updating Package.json](#updating-packagejson-1)
  - [Understanding The Codebase](#understanding-the-codebase)
  - [Folder Structure](#folder-structure)
  - [Git Flow](#git-flow)
    - [JIRA + Gitlab UI method](#jira--gitlab-ui-method)
    - [Command Line method](#command-line-method)
  - [Authors](#authors)

# Pole Star Defense Team Odyssey

-   [AMVER-UI Gitlab](https://gitlab.com/polestardefense/amver/amver-ui)
    -   Polestar Defense Gitlab repository for this project
-   [AMVER-Next Jira](https://pole-star.atlassian.net/jira/software/projects/USCG/boards/7)
    -   Polestar Defense JIRA project management board

## Installation

1. Install the latest LTS version of [NODEjs](https://nodejs.org/en).
2. Use the package manager [NPM](https://www.npmjs.com/package/npm) to install AMVER-UI.
3. Then run the following command in the root directory:

    ```bash
    npm install
    ```

## Checking Your Work

Once you have finsihed working on your latest feature and commits.  
You should check that the code works fine in `production mode`:

```bash
### run the build script
npm run build
# this will run Vite's build script and create a ./dist/ folder with a "production" version of the website

### run the preview script
npm run preview
# this will run Vite's preview script which will create a local server and serve the files inside the ./dist/ folder which should be a "production" version of the website
```

## .vscode/ Folder Information

[VSCode Launch Json Reference](https://code.visualstudio.com/docs/cpp/launch-json-reference)  
[VSCode Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference)

### Tasks.json - VSCode Tasks Made Easy

-   `AMVER-UI Build`
    -   Executes the `npm run build` command from [package.json](./package.json)
    -   This task depends on the `AMVER-UI Lint` task and will only start once the `AMVER-UI Lint` task is complete
-   `AMVER-UI Lint`
    -   Executes the `npm run lint` command from [package.json](./package.json)
    -   This task will be run before the `AMVER-UI Build` task
    -   This task will scan your code and make suggestions for ways clean up your code

### Launch.json - Running Locally With VSCode

VSCode allows for running and debugging the code locally by using the [Launch.json](.vscode/launch.json) file. This file lets you setup certain configurations that you can run under the VSCode's "Run/Debug" section (CTRL+SHIFT+D).

#### Launch Configurations

-   `Launch Dev`
    -   Executes the `npm run dev` command from [package.json](./package.json)
    -   This will run the application in with Webpack.
-   `Debug Test File`
    -   Executes the `npm run test:debug` command from [package.json](./package.json)
    -   This will run a single test file with a debugger attached so your breakpoints will be hit while running your code locally
    -   Make sure you have the file you want to debug open. (This is the file that will be executed with a debugger attached)

## Updating Package.json

When you add or update any packages to the `package.json` be sure you run

```bash
npm i --package-lock-only
```

## Docker

```bash
npm run build # build the production code in /dist folder
docker build -t polestar/amver-ui . # build the docker image from /dist folder
docker run -p 8080:8080 polestar/amver-ui # run a new container with port-forwarding
```

## Testing

We decided on using [Playwright](https://playwright.dev/) for our test framework. It seems that Playwright has all of the capabilities that we need for Unit and Integration testing. We can always add [Jest](https://jestjs.io/) in the future if we find limitations with Playwright. (although even the [Jest-Playwright package](https://github.com/playwright-community/jest-playwright) now recommends to just use the Playwright test-runner)

-   [Playwright](https://playwright.dev/) + [Allure Reporting](https://github.com/allure-framework) will be used for Integration and UI testing
```bash
# make sure to run, to install playwright locally
npx playwright install

```

### Playwright + Allure

-   [Playwright](https://playwright.dev/) is a full featured testing framework meant for Integration and UI testing.
    -   [Playwright Docs](https://playwright.dev/docs/intro)
-   [Allure](https://github.com/allure-framework) is a flexible, lightweight multi-language test reporting tool.
    -   [Allure-Playwright Docs](https://githu`b.com/allure-framework/allure-js/blob/master/packages/allure-playwright/README.md)

#### Running Playwright Tests

```bash
### for all of the tests you will need to pass in the the correct ENV variable 'qa|dev|qaApi|devApi'
# run all tests
npm run test:all
# run all API tests (~/tests/api)
npm run test:api
# run all INTEGRATION / UI functional tests (~/tests/integration)
# will run in a Chrome browser
npm run test:smoke # meaning "smoke test"
npm run test:smoke:headless # will run Chromium headless
npm run test:smoke:ui # will run Chrome with a UI

# after tests are ran
## to view test results
npx playwright show-report html-report
```

#### Running Allure Report
```bash
# install Allure with brew
brew install allure
# install allure-commandline globally
npm install -g allure-commandline
```

```bash
### Once you have run your tests, you can then run the Allure Report
npm run test:report
### this will launch a website with the ./html-report/index.html and give you a easy to read report for all of your tests
```

## Updating Package.json

When you add or update any packages to the `package.json` be sure you run

```bash
npm i --package-lock-only
```

## Understanding The Codebase

-   [Webpack](https://webpack.js.org/)
    -   A local development server
    -   [Webpack Docs](https://webpack.js.org/guides/getting-started/)
    -   [Webpack Assets Guide](https://www.linkedin.com/pulse/easy-to-understand-guide-asset-module-webpack-5-prasenjit-sutradhar)
-   [React JS](https://react.dev/learn)
    -   frontend javascript library for building UI based on components
    -   [React Docs](https://devdocs.io/react/)
-   [Material UI](https://mui.com/material-ui/getting-started/)
    -   React components for Google's Material UI
-   [Jotai](https://jotai.org/docs/introduction)
    -   an atomic approach to global React state management with a model inspired by [Recoil](https://recoiljs.org/docs/introduction/installation)
-   [Cesium](https://cesium.com/learn/cesiumjs/ref-doc/)
    -   open platform for software applications designed to unleash the power of 3D data and maps
    -   Cesium can be tricky to get working with Webpack, [use this guide for guidance](https://cesium.com/learn/cesiumjs-learn/cesiumjs-webpack/)
-   [Resium](https://resium.reearth.io/)
    -   React JS wrapper for Cesium
-   [MomentJs](https://momentjs.com/docs/)
    -   javaScript library which helps with parsing, validating, manipulating and displaying date/time

## Folder Structure

```
.
├── config
│   ├── build
├── dist
├── node_modules
├── public
│   ├── css
│   │   ├── **/*.css
│   ├── images
│   ├── js
│   ├── index.html
├── src
│   ├── App
│   |   ├── app.(tsx|css)
│   ├── assets
│   |   ├── images
│   │   |   ├── **/*.(png|svg|jpg)
│   |   ├── fonts
│   ├── components
│   │   ├── clock
│   │   ├── resium
│   │   ├── resiumEntities
│   │   |   ├── **/*.(tsx|css)
│   ├── configs
│   ├── constants
│   ├── features
│   ├── layouts
│   ├── pages
│   ├── store
│   ├── types
│   ├── utils
│   ├── main.(tsx|css)
│   ├── theme.ts
├── .browserslistrc
├── .editorconfig
├── .eslintrc.cjs
├── .gitignore
├── .gitlab-ci.yml
├── .prettierignore
├── babel.config.ts
├── cusomReporterConfig.ts
├── index.html
├── index.html
├── package-lock.json
├── package.json
├── playwright.config.ts
├── postcss.config.js
├── tsconfig.json
└── webpack.config.ts
```

-   `./config/build`
    -   Contains the Webpack configuration files.
-   `./src/components/`
    -   Contains reusable components that are most often used to compose Feature or Page components.
    -   These components are almost always pure and presentational, with no side-effects.
-   `./src/configs/`
    -   Contains configuration files that dictate the state of the app such as navigation items
-   `./src/constants/`
    -   Contains reusable & immutable strings like URLs or Regex Patterns.
-   `./src/features/`
    -   Contains reusable Feature Components. A Feature Component is a concept inspired by Redux in which all logic required for a feature is colocated to a single directory. A Feature Component is often composed of many other components, either local or shared. The same is true for all resources: utils, types, hooks, and so on.
    -   Feature Components often include side-effects.
    -   If using Redux, and interacts with the Store, the Feature Component will include a slice file that defines the “slice” of the Redux Store the feature represents.
-   `./src/layouts/`
    -   Contains reusable Layout Components. A Layout Component is a component that composes the layout of a page. It will often import components such as app-header, app-footer, app-side-nav, etc.
-   `./src/pages/`
    -   Contains Page Components. Each Page Component is associated with a route
    -   Page Components compose the content of a page by importing Components and Feature Components.
    -   A Page Component should rarely include side-effects, and should instead delegate side-effects to Feature Components.
-   `./src/store/`
    -   Location of the Redux slices or Jotai Atoms that handle state-management in your app.
-   `./src/types/`
    -   Reusable types for projects utilizing TypeScript.
-   `./src/utils/`
    -   Reusable utility functions.
    -   These functions should always be pure and produce no side-effects.
-   `tests/`
    -   All [Playwright](https://playwright.dev/) Integration tests for the app
    -   The `tests/Iintegrationz` folder is meant for [Playwright](https://playwright.dev/) Integration and UI tests
    -   [/tests/customReporterConfig.ts](./tests/customReporterConfig.ts)
        -   Configuration file used by Playwright [Playwright-Typescript Github](https://github.com/akshayp7/playwright-typescript-playwright-test/blob/main/CustomReporterConfig.ts)
-   [main.tsx](./src/main.tsx)
    -   Main entry point for the React app
-   [app.tsx](./src/app.tsx)
    -   Top-level component for the React app
-   [theme.ts](./src/theme.ts)
    -   All colors (hex/rgba) used in the app for Material UI, as well as the themed components for Material Ui
-   [.browserslistrc](./src/.browserslistrc)
    -   [BrowsersList](https://github.com/browserslist/browserslist) make css more compatible across specific versions of web browsers during the build process
-   [.editorconfig](./src/.editorconfig)
    -   [EditorConfig](https://editorconfig.org/) helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
-   [.eslintrc.cjs](./.eslintrc.cjs)
    -   Configuration file for a tool named ESLINT. ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs. [ESLINT Docs](https://eslint.org/docs/latest/use/configure/configuration-files)
-   [.gitignore](./.gitignore)
    -   Specifies intentionally untracked files that Git should ignore. [GitIgnore Docs](https://git-scm.com/docs/gitignore)
-   [.gitlab-ci.yml](./.gitlab-ci.yml)
    -   [Gitlab](https://gitlab.com/polestardefense/amver/amver-ui) configuration file for continuous-integration. [Gitlab CI Docs](https://docs.gitlab.com/ee/ci/yaml/)
-   [babel.config.json](https://github.com/babel/babel)
    -   A tool that transpiles Javascript files
-   [package.json](./package.json)
    -   Contains descriptive and functional metadata about a project, such as a name, version, and dependencies. The file provides the npm package manager with various information to help identify the project and handle dependencies. [Package.json Docs](https://nodesource.com/blog/the-basics-of-package-json/)
-   [prettierrc.json](./prettierrc.json)
    -   Configuration file used by Prettier, an automated code formatting tool. [Prettier Docs](https://prettier.io/docs/en/configuration.html)
-   [postcss.config.js](./postcss.config.js)
    -   Adds vendor prefixes to CSS rules using values from Can I Use. [PostCss](https://postcss.org/)
-   [playwright.config.ts](./playwright.config.ts)
    -   Configuration file that dictates the settings for [Playwright](https://playwright.dev/docs/test-configuration).
-   [tsconfig.json](./tsconfig.json)
    -   Configuration file that points the root level files and different compiler options to setup that require to compile a TypeScript based projects. [TSConfig Docs](https://www.typescriptlang.org/tsconfig)
-   [webpack.config.ts](./webpack.config.ts)
    -   Configuration file that dictates the settings for [Webpack](https://webpack.js.org/guides/getting-started/#using-a-configuration).

## Git Flow

### JIRA + Gitlab UI method

1. Create a JIRA ticket
2. Under the `Development` section on the JIRA ticket, click **Create Branch** then **Create branch in GitLab**
3. Once GitLab's "Create Branch" page opens, select the `project` you want to create a branch for, select the `source branch` that this new branch will be sourced from, then create a `branch name` (usually will be either `feature/USCG-{ticket-number}`)
4. Go to your command line in your top level folder for the project and run `git pull` - this will pull down the latest branch
5. Run the command `git checkout [branch-name]`
6. Do your work on this newly created branch
7. Once completed, run `git add .` to add all the changes to the branch
8. Run `git commit -m "USCG-{ticket-number}` to commit all the code with a well-written commit message
9. Run `git push` to push all the changes to the branch in JIRA
10. Next you will need to go to [Gitlab's Branches page](https://gitlab.com/polestardefense/amver/amver-ui/-/branches) and make sure your branch is all correct and click `New Merge Request` to create a merge request WITH A REVIEWER.

### Command Line method

```bash
# create a release branch from develop
git checkout develop
git fetch
git pull origin develop
git checkout -b feature/USCG-{ticket-number}

# finalise the change log, local build, etc
    # choose ONE of these commands that suites your needs
git add .   # Add only files created/modified to the index and not those deleted
    git add -u  # Add only files deleted/modified to the index and not those created
    git add -A  # Do both operations at once, add to all f
git commit -m "USCG-{ticket-number} some detailed
    message about what you accomplished in this commit"

### At this point you can do the merge-into-main method or the --rebase method
## 1.) merge-into-main
git checkout main # checkout the main branch
git pull # get latest code from main
git checkout feature/USCG-{ticket-number} # checkout/get on your feature code branch
git merge main # this will start the process of merging your the main branch's code with feature/USCG-{ticket-number} branch.
### --- you most likely will need to fix merge conflicts at this point ----
git push # push your feature branch that has been merged with main up to GitLab

# 2.) rebase against master, which we're going to merge into
git pull --rebase origin develop
git push --force-with-lease

```

## Authors

-   Matthew Taylor, Frontend Developer -- [Gitlab profile](https://gitlab.com/matt.taylor4), [Github profile](https://github.com/maylortaylor)
-   Raciel Garcia, Senior Software Developer -- [Gitlab profile](https://gitlab.com/raciel.garcia)
-   Alex Field, VP of Software Development -- [Gitlab profile](https://gitlab.com/Alex.Field.PSD)
