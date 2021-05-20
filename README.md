# Problem

You are tasked to fix this work and bring it to production quality (A quality you are proud to maintain) following ReactJs common practice.

As part of your final submission:
1. Create a repo on github called 'react-challenge'
2. Commit this code into the repo.
3. Work through the code and fix the problems you find. The work is divided into 2 independent parts where each identified issue is marked with 'TODO'. Unidentified issues are left as bonuses.
4. **Do not commit all changes in one go**. Ensure to commit your code regularly as you expect to do in a real work scenario.  We would be looking at your commit history and messages closely and expect to see incremental improvements to the code in the challenge.    
5. Submit the solution by sending us a link to your completed github repository.

We have created this challenge with expectations it should not take longer than 2 hours, but feel free to spend more time or less time to deliver a solution you are happy with.

## Pension detail form

The form is not working properly and not following proper ReactJs practice. Identified issues (in order of priority) are:

1.  Form reloads the web page on submit button clicks.
2.  It is not coded following ReactJs standard, weird things happen. For example:

    - Checkboxes can not be unchecked
    - Form validation is not proper
    - Clicking submit on empty form shows error messages but when some fields are filled and resubmission is attempted the form clears the data.

3.  Api submission is not proper:
    - Success message notice shows before the actual submission completes.
    - Api error is not handled properly.
4.  Form reset is not yet done.
5.  Unit testing is broken
6.  **Bonus:** The markup is very long with a lot of unnecessary repetitions.
7.  **Bonus:** Styling is not reusable.

## Travel detail

1. It should use existing hook to get travelling data
2. It should get data from server, not using mock data
3. Travel doctors and exchange rates listings are not responsive

# Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
