# OpenInnovationAI-QAChallenge

This project contains files to execute all API tests mentioned by Open Innovation AI in documents.

## Important Note

##### **Assingment completed in Playwright with Typescript.**

**Test run on pipeline or local will get failed becuase of one test case which were in requirement to get it failed. But you can view report in git action pipeline and local as well.**

## **Run Tests Via Git Action:**

* Goto repo: https://github.com/saifa1i/OpenInnovationAI-QAChallenge
* Click on Action tab
* Click on Playwright Tests Execution
* Click Run workflow button
* Select 'main' branch (Selected by default)
* Click Run workflow and test cases will get started executing
* After completion of workflow, go to Playwright Tests Execution workflow and download report
* Extract report and click on index.html to view report in browser.

## Run Tests on local

**Prerequisite:**

* Docker
* Node @latest Version
* NPM @latest Version

**Steps:**

* Clone repo of Open Innovation AI - QA Challenge
* Install docker to run qa-server
* Run command to start qa-server 'docker-compose up'
* Clone this public repo.
* Install dependencies by command 'npm install'
* Install playwright by command 'npx playwright install'
* Run all test cases by coomand 'npx playwright test'
* To view report please use command: 'npx playwright show-report'

## File Structure

For this project 'OpenInnovationAI-QAChallenge' I have followed POM model. As all constant data, schemas and helpers are kept in different files to be easily accessbile. 

* .github
  * workflows
    * PlaywrightTestsExecution.yml ➡️ Contains code for test pipeline to execute test cases on github actions and get results after execution. It includes both to use app repo to start QA Server app and run test cases of playwright.
* helpers
  * assertHerlpers.ts ➡️ Contains code for helping in assertion using chai library mainly for validation of schema.
  * dataHelper.ts ➡️ Includes constant data for endpoints body.
* jsonSchema ➡️ Includes schemas for all endpoints which are further used in assertion.
* playwright-report ➡️ Includes html playwright report of test cases executed, by clicking on index.html file inside folder report can be visualized.
* tests
  * modelEndpointTests.spec.ts ➡️ Include test cases for /model endpoints and a failing test case as well.
  * modelIdEndpointTests.spec.ts ➡️ Includes test cases for all /version endpoints.
  * modelInferEndpointTests.spec.ts ➡️ Includes test case for inference endpoint.
* package.json ➡️ Includes all dependencies and libraries need to execute test cases. To install just run command 'npm install'
* playwright.config.ts ➡️ Includes configuration and setting for execution of test cases.

## Advantages of Approach:

* Clarity in code
* Easily maintainable
* HTML reporter, easily downloadable and can be viewed just by one clicked

### Disadvantages of Approach:

Execution of test cases in sequential manner as in playwright we can easily execute test cases parallelly but I had to use 1 worker as we need to execute test cases one by one due to dependency of endpoints on each other.
