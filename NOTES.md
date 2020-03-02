Time: [To be completed]

Obs. 
1. No previous experience on Koa (only Express)

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

1. 9.00 am >>> Standard setup for a Typescipt project:
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
    
2. 10.10 am >>> First run of the server to ensure is type-checking and no errors

3. 10.30am >>> Initialize git flow: 
    git init
    git add -A && git commit -m "Initial project setup"
    git branch (list the branches)
    git checkout -b dev master (create a dev branch)
    git checkout -b retrieve-readings dev (create a feature sub-branch)
    
4.  11.20 am >>> Create the necessary directories to modularize the app:
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
     

4. 11.40 am >>> start developing the first route, /GET