import { When, Then } from 'cucumber';
import superagent from 'superagent';
import {Request, Response} from 'koa';
import {ServerResponse} from 'http';
import assert from 'assert';
import {AssertionError} from 'assert';
import chai from 'chai';
const expect = chai.expect;

// function that helps testing API return messages that contain quotes and slashes
const cleanStr = (s: string|undefined) => s ? s.replace(/[\\|\/|"]/g,'') : '';

interface Error{
  response?: unknown;
  statusCode? :number;
}

interface Payload {
  status: number;
  text?: string,
  data?: string,
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

When('attaches a generic non-JSON payload', function(){
  request.send('<?xml version="1.0" encoding="UTF-8"?><value>10000</value>');
  request.set('Content-Type', 'text/xml');
});

When('attaches a generic malformed payload', function(){
  request.send('{"cumulative": 22300, "readingDate": }');
  request.set('Content-Type', 'application/json');
});

When('sends the request', function(cb){
  // @ts-ignore
  request
    .then((response) => {
      console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTT response=', response)
      result = response?.body;
      header = response?.header;
      cb();
    })
    .catch((errResponse: { response: Error; }) =>{
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE errorResponse=', errResponse);
      error = errResponse.response;
      // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE error=', error);
      cb();
    })
});

When(/^without a (?:"|')([\w-]+)(?:"|') header set$/, function(headerName) {
  request.unset(headerName);
});

Then('our API should respond with a 400 HTTP status code', function () {
  {
    if (error && error.statusCode && error.statusCode !==400) {
      throw new AssertionError({
        expected: 400,
        actual: error.statusCode
      });
    }
  };
});

Then('our API should respond with a 415 HTTP status code', function () {
  {
    if (error && error.statusCode && error.statusCode !==415) {
      throw new AssertionError({
        expected: 415,
        actual: response?.status
      });
    }
  };
});

Then('the header of the response should include {string}', function(string) {
  switch (string) {
    case 'application/json':
      let contentType!: string;
      if (header) {
        // @ts-ignore
        contentType = header['content-type'];
        if (contentType && contentType.length === 0
          || (typeof contentType === 'string' && !contentType.includes(string))) {
          throw new Error('Response not of Content-Type application/json');
        }
      }
  }
});

Then('the payload of the response should be a valid JSON object', function(){
  response = result || error;
  // Check if is valid JSON
  // console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY response=', response.status)
  try {
    payload = JSON.parse(JSON.stringify(response));
  } catch (e) {
    throw new Error('Reponse not a valid JSON object')
  }
});


Then('contains a message property which says "Payload should not be empty"', function(){
  // console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP payload=', payload)
  if(payload && (!payload.text || !payload?.text?.includes('Payload should not be empty'))){
    throw new Error('Invalid response for empty payload');
  }
  // if it got to this point it passed the test
});


Then(/^contains a message property which says 'The "Content-Type" header must always be "application\/json"'$/, function(){
  const cleanStr = (s: string|undefined) => s ? s.replace(/[\\|\/|"]/g,'') : '';
  const cleanMessage = cleanStr('The "Content-Type" header must always be "application\/json"');
  const cleanPayloadText = cleanStr(payload?.text);
  // console.log('CCCCCCCCCCCCCCCCCCCCCCCCCC: cleanMessage=', cleanMessage);
  // console.log('CCCCCCCCCCCCCCCCCCCCCCCCCC: cleanPayloadText=', cleanPayloadText);
  if(payload && payload.text  && !cleanPayloadText.includes(cleanMessage)){
    throw new Error('The "Content-Type" header must always be "application/json"');
  }
  // if it got to this point it passed the test
});

Then(/^contains a message property which says 'The "Content-Type" header must be set for requests with a non-empty payload'$/, function(){
  const cleanMessage = cleanStr('The "Content-Type" header must be set for requests with a non-empty payload');
  const cleanPayloadText = cleanStr(payload?.text);
  if(payload && payload.text  && !cleanPayloadText.includes(cleanMessage)){
    throw new Error('The "Content-Type" header must be set for requests with a non-empty payload');
  }
  // if it got to this point it passed the test
});

Then(/^contains a message property which says 'Payload should be in JSON format'$/, function(){
  expect(payload?.text).to.include('Payload should be in JSON format');
});