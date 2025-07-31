# shopping-list
An application that allows you to manage a shopping list. 

This project is for a technical assessment.

### Estimation

I estimated the time to develop for each story as follows: 

| Story | Estimated time | Cumulative time
|-|-|-|
|SL-1|30 minutes| 30 minutes |
|SL-2|60 minutes| 1.5 hours|
|SL-3|30 minutes| 2 hours|
|SL-4|45 minutes| 2.75 hours|
|SL-5|90 minutes| 4.25 hours |
|SL-6|60 minutes| 5.25 hours |
|SL-7|30 minutes| 5.75 hours |
|SL-8|45 minutes| 6.5 hours |
|SL-9|90 minutes| 8 hours|
|SL-10|75 minutes| 9.25 hours|

As a result the goal is to complete stories 1-7 within the 6 hours. 

Before starting I have already set up a skeleton app with code coverage report via cypress. 

You can check the coverage report by running `npm run test:coverage`

### Stack
The app will use Next.js for easy running of client/server, cypress for integration testing and Lowdb as the data layer (if required). 

### Tooling used
Github Copilot (code completion, tailwind css generation)

### Known issues
- The cypress tests all have a short wait added beforehand as I was not able to get the test db reset properly without occasionally encountering a race condition
- ShoppingList handlers optimistically update state without any rollback in case of an error in the api request
- Was not able to make a drag & drop work in cypress due to its click events being simulated, so a separate test is written in playwright. This can be run with 'npm run test:playwright' while the dev server is running, but it does run against the 'real' db instead of the test db. I think this can be fixed quickly by setting the process.env var when starting up the server for the playwright test, but I was running out of time so left this for now.

### Post-mortem 
Unfortunately I spent a long time in areas that I shouldn't have (in particular trying to get drag & drop testing working with cypress, and styling the add item form) and didn't leave myself enough time to ensure testing coverage was more complete. There are missing test cases for error handling and the existing tests are not all consistent. 
Since I ended up rushing I also didn't extract components out properly and the ShoppingList component became a bit unwieldy. 

On the plus side, I think the stack mostly made sense for the assessment (maybe with the exception of Lowdb), and despite not being happy with the condition of the tests I did manage to mostly finish the 7 stories I set out to complete. 