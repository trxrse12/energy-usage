import { When, Then } from 'cucumber';
import superagent from 'superagent';

let request;
let result;
let error;

When('the client creates a POST request to /readings', function(cb){
  request = superagent('POST', 'localhost:3000/readings');
});

When('attaches a generic empty payload', function(cb){
  cb(null, 'pending');
});

When('sends the request', function(cb){
  cb(null, 'pending');
});

Then('our API should respond with a 400 HTTP status code', function (cb) {
  cb(null, 'pending');
});

Then('the payload of the response should be a JSON object', function(cb){
  cb(null, 'pending');
});

Then('contains a message property which says "Payload should not be empty"', function(cb){
  cb(null, 'pending');
});