Time: [To be completed]

Obs. 
1. No previous experience on Koa (only Express)
2. No previous knowledge of sqlite3 (however, knowledgable in terms of SQL)
3. No previous knowledge of moment()

Notes:
    The project developement is split in separate independent features, to ensure a scalable and robust approach.
    Features:
        1. Retrieve a list of meter readings;
        2. Create a meter reading; 
    High level methodology description:
        1. Set the project and the necessary tools;
        2. A first run on the project to ensure tools operational;
        3. Create a git repo and set it accordingly to follow gitflow;
        4. Create the directories structure (explained below);
        5. Start working on the first feature 

1. Standard setup for a Typescipt project:
    * Setting up the dev tools: WebStorm project,  node (nvm), typescript, @types/node, ts-node, tsc-watch, yarn
    * Created the tsconfig.json;
    * Created the dist directory;
    * added the airbnb and microsoft rules to the tslint;
    * added the eslint to tslint bridge, to enable eslint in tslint;
    * created a proper .gitignore;
    * added the TDD testing tools (mocha, chai) and their types libs;
    * added the BDD testing tools (cucumber)
    * babel and its typescript plugin
    * .babelrc
    * yarn
    * nodemon
    * scripts in package.json
    
2. First run of the server to ensure is type-checking and no errors

3. Initialize git flow: 
    git init
    git add -A && git commit -m "Initial project setup"
    git branch (list the branches)
    git checkout -b dev master (create a dev branch)
    git checkout -b retrieve-readings dev (create a feature sub-branch)
    
4.  Create the necessary directories to modularize the app:
    /src/db: the database layer
    
    /src/middlewares: all the middlewares will reside in there
    
    /src/handlers: 
    modules having a single job of passing the requests to an Engine (see /src/engines below), which process the info and return the results. Based on this result,
 the request handler provide an appropriate response to the client     
                 ==> each request handler will reside in its own module  
                 ==> decoupling the route handlers from the middleware is good for scalability
                 ==> IMPORTANT!!! To properly decouple the handlers from the engines a new
                        HOF (Higher Order Function) called injectHandlerDependencies() has
                        been created in /src/utils
    
    /src/engines:
    modules that will take the requests from the corresponding handler and validate the request, then write to the database, and last but not least return the result to the request handlers;
    
    /src/validators:
    take as inputs the request from the client (passed through the engines, as per above) and run these inputs through an AJV validator (JSON validator), and in the case not valid will return custom errors (e.g. ValidationError);
    
    /src/utils:
    modules that will contain utility functions, including injectHandlerDependency(), as per above (see /src/handlers)
    
    /src/spec:
    folder that will contain all the E2E tests specs (feature oriented)
     

5. start developing the first route: POST /readings
    a. set up the infrastructure to use Cucumber.js on the compiled dist/spec folder
    b. Write the 1st cucumber feature file, readings.feature
    c. Added the first two error scenarios for the current route: "Empty Payload" and "Payload with Unsupported Media Type".
    d. Added an error handler middleware to ensure the right level of error control is operational
    e. Move all the common functions (e.g. checking for empty content, for json request format, etc)
        into common middleware functions;
    f. Added a cucumber scenario on input validations  
    g. Testing the energy reading upload success scenario  
    
6 To ensure FUTURE SCALABILITY, split the route processor into three components: 
    a. the route handler, having a single role of returning the response of the reading insertion result to the user;
    b. the engine, having a single role to actually insert the reading;
    c. the validator, having the single role of checking that the posted structure is a valid electricity reading;
    
7. Once the new scalable architecture is in place (see point 6.), add unit tests to test the validator, the engine and the rute handler. Also add unit tests for the middleware (not very detailed in here, just some simple examples).

8. add the next end point, GET /readings, with the associated E2E tests (for the sake of brevity, skipped the associated unit tests, as they will be similar to the POST /readings)

9. add the next end point, GET /usage
    a. developed an interpolation algorithm as per below:
        Starting from a list of energy readings, for each reading build an interpolated value corresponding
        to the end of month that the reading belongs to.
    b. build the E2E tests for this end point, then build the engine and the handler for it.          
         
    
Obs. Here are some practical observations:
    1. it is a good idea to open two terminals in your IDE and to keep the server dev terminal on on the left and the tests dev terminal on the right ==> that will help in dev speed, as you can indep  modify the app or the BDD test code;
    2. it is a good idea in the BDD code to have a console.print pair of instructions embedded in the "When(sends)" test, as it will help the dev process (it will make easier to see the server response)
    3. good idea to use the koa-logger
    4. good idea to console (if needed) the POST request payload from superagent
    5. 
    
    
Lessons learned on Koa:
    1. middlewares have to be async functions that end in "await next()";
    2. error handler middleware is the first middleware, not the last (due to generators)
    3. you can console the incoming request with ctx.request.body, NOT with ctx.body