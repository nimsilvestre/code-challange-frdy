# Frontend Developer Code Challange

Build a simple web app that allows a user to select their car from a directory of registered cars. This data will be provided by the api server in this repo. The api provides a list of available makes, models of each make and specific cars for each model with horsepower and engine capacity info.

## Problem

- Display an interface that enables users to choose from a list of
  makes in a given order, so we could store the API request parameter
  before needing to fetch the next set of data to display to the user.
- Handle the 5xx Server Error and keep track of steps without
  re-rendering the Application and providing a more "human-readable"
  error experience.
- Render an unpredictable large amount of array data in a more
  user-friendly way.
- Make the App maintainable, DRY, and perhaps, scalable.

## Solution

- The solution is a multi-step form that will change to another page
  and help lead the user on the right action we need to follow to
  display the vehicle's search results.
- I am using a Redux Toolkit to implement a Redux State management for
  scalability and better state management throughout the App state. I
  have used Redux Toolkit to simplify the Redux implementation and
  reduce Boilerplate code.
- For handling the API Errors, I have implemented a re-try call on
  dispatch redux action to a maximum of 3 tries while keeping track of
  how many times the App tried to re-try API call. Without the user having the perception that the re-try is happening :)

>

## Installation

**client**

     git clone url-para-repo-aqui
     yarn install or
     npm install

> The App should be runnig on port `http://localhost:3000/` please open on the browser.
>
> **server**

       node server.js

> node run server on port `http://localhost:8080/`
