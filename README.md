# Effort Task
<p float="left">
  <img src="/assets/icons/win/icon.ico" width="200" />
</p>

[![Actions Status](https://github.com/lnccbrown/task-effort/workflows/CI%20Tests/badge.svg)](https://github.com/lnccbrown/task-effort/actions)
[![Actions Status](https://github.com/lnccbrown/task-effort/workflows/Build%20at%20home%20version%20%28Windows%29/badge.svg)](https://github.com/lnccbrown/task-effort/actions)  
![Add App Installers to Release](https://github.com/lnccbrown/task-effort/workflows/Add%20App%20Installers%20to%20Release/badge.svg?branch=master)

This repo contains the Effort task. It is a [jspsych](https://www.jspsych.org/) task built with React and Electron. This task uses the [Neuro Task Starter](https://www.github.com/brown-ccv/neuro-task-starter).

## TO RUN THE TASK - BEHAVIORAL ONLY
Go to the releases tab (https://github.com/lnccbrown/task-effort/releases) and download the recent installer for your machine.

## TO RUN THE TASK - EEG
Follow the instructions above for behavioral version (i.e., download relevant installer).

In addition, follow instructions on the repo Wiki to set the port name:
https://github.com/lnccbrown/task-effort/wiki/Task-Effort-Running-Notes-(EEG)

## TO QUIT THE TASK
If you want to quit in the middle of the task, you can use these keyboard shortcuts:
```
Ctrl+W (for PC/Windows)
```
```
Cmd+Q (for Mac)
```
Partial data will be saved.

## TO REUSE A SUBJECT ID NUMBER
If you want to overwrite a subject's data file:

1) Go to your desktop to where the Effort-Data folder is. Delete the .json data file corresponding to the SubjectID you want to reuse.

2) Go to the corresponding locations (dependent on operating system):
```
Mac OS: ~/Library/Application Support/task-effort
Windows: C:\Users\<you>\AppData\Roaming\task-effort
Linux: ~/.config/task-effort
```
In order to find this directory on a PC, you may need to <a href="https://support.microsoft.com/en-us/help/4028316/windows-view-hidden-files-and-folders-in-windows-10"><u>enable viewing hidden folders and files</u></a>. Alternatively, you can right-click on the app shortcut on the desktop, and select 'Open File Location.'


Once you have succesfully navigated to the corresponding location, delete the .json data file corresponding to the SubjectID you want to overwrite or reuse.

Once you have deleted both of these .json files, you should be able to use a SubjectID you have used in the past.





## THE FOLLOWING INSTRUCTIONS ARE FOR MAKING CONTRIBUTIONS TO TASK CODE

## Getting Started

1. Clone this repo onto your computer using git.
```
git clone https://github.com/lnccbrown/task-effort.git
```
2. Navigate to the task-effort directory and then install the dependencies. You may first need to install Node.js (https://nodejs.org/en/download/) before being able to use npm commands in the terminal.
```
npm install
```
3. Build the package.
```
npm run build
```
4. Run the task in development (dev) mode - this should launch an electron window with the task with the inspector open to the console and will hot-reload when changes are made to the app.

For Mac and Linux:
```
npm run dev
```

For Windows:
You will need to open 2 terminals. In the first (and make sure you are in the task-effort repo directory), run the command:
```
npm start
```
In the second terminal (and make you are in the task-effort repo directory), run:
```
npm run electron-dev
```

5. Check out the data - the data is saved throughout the task to the users's app directory.  This is logged at the beginning of the task wherever you ran `npm run dev`. It is also stored in a folder that is generated by the app named 'Effort-Data', which should be found on the desktop.

## Contributing

1. Clone the repo and create a new feature branch off `develop`.

```shell
git clone https://github.com/lnccbrown/task-effort.git
git checkout -b your-feature-branch
```

2. Make your changes and commit using [commitizen](https://pypi.org/project/commitizen/)
3. Submit a [pull request](https://help.github.com/en/articles/creating-a-pull-request) to the `develop` branch. Add @wasita as a reviewer.

## Project Organization

This project directory is organized to be very modular and composable. In general, files and functions should be relatively small and self-contained, global scope should not be used (and definitely not mutated), and only the pieces of code needed for any given file should be imported. This keeps the code maintainable with clear lineage and purpose for each piece of code. Below are descriptions of the main files and folders.

### `package.json`

The `package.json` file contains metadata about your project and scripts to run tasks related to your task. The `name` should be updated to your task's name and `scripts` can be added as desired, but otherwise this file should not be edited manually.  To remove or add a dependency use `npm install` or `npm uninstall` with the `-D` flag if installing a dev dependency.

The `package-lock.json` contains metadata about the package installation. It should never be manually updated.

### `assets`

The icons for the installed applications are located here.

### `public/`

The `public` directory contains files that are used as assets in the built app. The `favicon.ico` is the small icon you can see in the browser tab (on Chrome) - it is set to Brown's logo in the project. The `index.html` contains the shell of your website - the name displayed on the tab can be changed here, otherwise it shouldn't need to be edited. The scripts included in the file are for `psiturk` as are the files in the `lib/` directory.

#### `electron.js`

This file contains all of the code relating to the electron app. This includes the event-marker, throwing errors via dialog windows, saving data, and reading files.

#### `config/`

The `config` directory contains the config files needed for the electron app.  This includes the event-marker details and event codes.

Note: the productId can be overwritten by the environment variable EVENT_MARKER_PRODUCT_ID

### `src/`

This folder contains the code for the app, the vast majority of changes and code should go here.

#### `App.js`

This is the starting point for the app. The `<Experiment>` component initializes a `jspsych` experiment. This is also where communication is set up with the `electron` and `psiturk` processes.

#### `electron-starter.js`

This file controls the main electron process. This is where any code that needs to interact with the system (ports, file system, etc.) should go. To communicate between electron and the task, use `ipc`.

#### `App.css`

This is where styling for the app is housed. If colors, fonts, spacing, etc. need to be set, do it here.

#### `assets/`

This folder contains any static files that are used by the app, such as images.

#### `config/`

In the `config/` directory, there are `.js` files which contain settings for the different parts of the task.  Every task should have a `main` config and a `trigger` config (assuming use of the event marker). The `main` config has all global settings for the task (such as whether it is in mturk mode or not), load the appropriate language file, and set up a default (or only) configuration object for the task. The `trigger` config has settings specific to the event marker and uses a slightly different style of javascript as it is imported both in the React app as well as the electron process.

Other config files can be used to add settings for specific blocks or sub-sections of the experiment.

#### `language/`

Any language that is displayed in the experiment should be stored in this folder. Usage of language json files allows for easy internationalization of the task (e.g. english and spanish) as well as allows for mturk specific language. This also makes it easy to re-use common phrases in many places in the task.

#### `lib/`

The `lib/` directory contains utility functions and markup that is used in the tasks.  This allows for functions and html to be re-used wherever needed. The `lib/utils.js` file contains functions that are generally useful across many tasks, whereas `lib/taskUtils.js` contains functions specific to this task.

#### `lib/markup`

`markup` files should contain primarily templates for HTML that is used throughout the task. Typically this will be a function that takes in some parameters and then returns a string with html.

#### `timelines`

`jspsych` uses `timelines` to control what `trials` are displayed in what order.  `timelines` can contain other `timelines`, which is why there may be several files in this directory.  The `main.js` file should have the timeline that is called by `App.js`.

#### `trials`

`jspsych` uses `trials` as its base unit of an experiment. These trials do things such as display some stimulus or request a response.
## Environment Variables

The following are environment variables used by the app:

* `ELECTRON_START_URL` [string]: URL (e.g. `http://localhost:3000`) where the front end of the app is being hosted - also used in `electron.js` to indicate the app is running in dev mode
* `EVENT_MARKER_PRODUCT_ID` [string]: The product ID of the event marker (e.g. `0487`).  If not set, it will use the `productID` set in `public/config/trigger.js`.
* `REACT_APP_AT_HOME` [boolean]: whether the app is being used in home mode (true) or clinic mode (false)
* `REACT_APP_PATIENT_ID` [string]: The default patient id to show when requesting a patient ID in `userID`.  If not set, no default is shown (blank input box).

## Usage with PsiTurk

While this set up is optimized for Electron, we added functionality that will make use with PsiTurk easy. The application will detect if it's being used in a Turk environment and will:  

- Save the data to the default PsiTurk SQLite database.  
- Switch the language to Turk specific, if `src/language/<locale>.mturk.json` exists.  
- Use the Turk specific timeline if different than the primary timeline.  

**Prebuilt version**
When GitHub Actions is run, a psiturk build will be created automatically, and can be downloaded from its artifacts (skip next step if using).

**Build instructions**
To set up your PsiTurk project, we provide a script that does the conversion.
PsiTurk is a Python package used to manage HITs in Mechanical Turk. Before using the provided script, install [PsiTurk](https://psiturk.org/).

You'll need to follow these steps (the path to the PsiTurk project should be a directory you wish to be created):
- Build the application: `npm run build`  
- Move to the `psiturkit` directory: `cd psiturkit`
- If it's the first time you're running the script:  
  `./psiturk-it -p <PATH_TO_NEW_PSITURK_PROJECT>`  

- To update an existing PsiTurk project (the path to the PsiTurk project should already exist from the previous steps):  
  `./psiturk-it -u -p <PATH_TO_NEW_PSITURK_PROJECT>`

**Running psiturk**
After that, just navigate to your newly created PsiTurk project directory.
```shell
shell> psiturk #start psiturk
psiturk> server on #start server
psiturk> debug #debug mode
```

## Best Practices

### Write good commit messages

[Commitizen](https://pypi.org/project/commitizen/) is a great tool for writing angular commits - this will create a standardized commit format which makes for easier change logging and more sane messages.

### Use git flow (ish)

Your `master` branch should be where official releases are made (whenever code is used in real life tasks) and `develop` should be the working copy.  Use branches for any new features or fixes and then use pull requests to merge those into `develop`. Merge `develop` into `master` when using the task and make sure to tag a release. This will ensure you can always go back to exactly the code that was working with a specific subject/session.

### Keep your code style consistent

* `let` instead of `var`
* fat arrow functions (`const myFunc = (var) => doSomething(var)`) instead of es5/6 functions (`function myFunc(var) { doSomething(var) }`)
* camel case for variable, and function names (`doSomething`) instead of snake case (`do_something`)
* but snake case inside json is fine
* a `tab` === two spaces
* file exports at the bottom of the file in one chunk instead of exporting the function declaration
* when in doubt, leave future you a comment (you'll never regret it)

## Troubleshooting

When developing electron apps there are two processes: `main`, and `renderer`.  In this case `main` corresponds to `electron-starter.js` and its console is wherever you called `npm run dev` or `electron .` from. `renderer` corresponds to the React App - this is everything else. The react app's console is in the electron/browser window and can be seen by using dev tools to inspect the window.  When running `npm run dev`, it should open by default.

### Potential Issues

#### Package not found or other error related to `npm`

Try deleting your `node_modules` folder and the `package-lock.json` then running `npm install` then `npm run rebuild`.


## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs `npm start` and `npm run electron-dev` concurrently.  This may not play nicely with windows.  If it doesn't, run `npm start` and `npm run electron-dev` from different terminal windows.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Creates a production build of the app (renderer).  This must be done before running `package:platform` or the psiturk build instructions.

### `npm run package:platform`

It correctly bundles creates electron packages for the given platform.  It then creates an installer for that platform.  The output can be found in `/dist`
platforms: windows, mac, linux.


#### Prerequisites

If not running this command on a windows machine, must have `mono` and `wine` installed.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Run Electron

#### `npm run electron`

Run the built app.

#### `npm run electron-dev`

Run the current state of the code (un-built).
