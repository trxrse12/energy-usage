import { When, Then } from 'cucumber';
import superagent from 'superagent';
import {Request, Response} from 'koa';
import {ServerResponse} from 'http';

interface Error{
  response?: unknown;
  statusCode? :number;
}

interface Payload {
  status: number;
  data: {
    message: string;
    payload: {[key:string]: string|number}
  }
}

let request: superagent.SuperAgentRequest;
let response: Response;
let result: Response;
let header: string;
let payload: Payload;
let error: Error;

When('the client creates a POST request to /readings', function(){
  request = superagent('POST', 'http://localhost:3000/readings');
});

When('attaches a generic empty payload', function(){
  return undefined;
});

When('sends the request', function(cb){
  // @ts-ignore
  request
    .then((response) => {
      result = response.body;
      header = response.header;
      cb();
    })
    .catch((errResponse: { response: Error; }) =>{
      error = errResponse.response;
      cb();
    })
});

Then('our API should respond with a 400 HTTP status code', function () {
  {
    if (error && error.statusCode && error.statusCode !==400) {
      throw new Error();
    }
  };
});

Then('the header of the response should include {string}', function(string) {
  response = result || error;
  switch (string) {
    case 'application/json':
      let contentType!: string;
      // @ts-ignore
      contentType = header['content-type'];
      if (contentType && contentType.length === 0
        || (typeof contentType === 'string' && !contentType.includes(string))) {
        throw new Error('Response not of Content-Type application/json');
      }
  }
});

Then('the payload of the response should be a valid JSON object', function(){
  // Check if is valid JSON
  try {
    payload = JSON.parse(JSON.stringify(response));
  } catch (e) {
    throw new Error('Reponse not a valid JSON object')
  }
});


Then('contains a message property which says "Payload should not be empty"', function(){
  if(payload?.data?.message !== 'Payload should not be empty'){
    throw new Error('Invalid response for empty payload');
  }
});