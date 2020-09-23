# Sleep Timer UI

This is the UI part of the sleep timer app.

It is built on ReactJs and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the project

This project is built to work with the [sleep timer backend app](https://github.com/jaydlawrence/sleep-timer) running on a [particle](https://www.particle.io/) board.

### Particle-io credentials

To run the project, duplicate the `src/password.template.json` file and rename it `password.json` and add your username and password to this file.
This file is ignored by git.
DO NOT commit this file to git as the details are confidential.

### Install and run app

Install the dependencies with:

```
npm install
```

Then to run the project:

```
npm run start
```

This runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Statically compile app

```
npm run build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## App walkthrough

The app state is driven off of the state of the connected [particle](https://www.particle.io/) device.

When the app loads, it contacts the server and then goes to the relevant page with actions that make sense in that state.

### Ready State

When the device is in the ready state, the app will show the ready state page with options to sleep until a particular time or nap for a given amount of time.

![Ready State](https://github.com/jaydlawrence/sleep-timer-ui/blob/master/public/media/ready.png)

If a user selects to sleep until a certain time, they get a follow up screen, allowing them to select a time to sleep until.

![Sleep Until Page](https://github.com/jaydlawrence/sleep-timer-ui/blob/master/public/media/sleep.png)

If the user selected the nap for option, they will get a screen allowing them to set hours and/or minutes to nap for.

![Nap Until Page](https://github.com/jaydlawrence/sleep-timer-ui/blob/master/public/media/nap.png)

### Timing State

When the device is in the timing state, the app will show the timing state page with a progress bar and a description of the remaining time and the time at which the device will stop timing.
It also displays options to wake now or to clear the timer.

![Timing State](https://github.com/jaydlawrence/sleep-timer-ui/blob/master/public/media/timing.png)

### Done State

When the device is in the done state, the app will show the done state page with a description of when the device stopped timing.

It also displays option to clear the timer.

![Done State](https://github.com/jaydlawrence/sleep-timer-ui/blob/master/public/media/done.png)


## In action

See it in action in my [blog post](https://jaydlawrence.dev/sleep-timer-iot-sleep-training-app/)