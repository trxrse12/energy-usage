Feature: Create readings

    The users should be able to create an add a new meter reading to the database;

    Scenario: Empty Payload
        If the client sends a POST request to /readings with an empty payload, it should receive
        a response with a 4xx Bad Request HTTP status code

        When the client creates a POST request to /readings
        And attaches a generic empty payload
        And sends the request
        Then our API should respond with a 400 HTTP status code
        And the header of the response should include "application/json"
        And the payload of the response should be a valid JSON object
        And contains a message property which says "Payload should not be empty"

    Scenario: Payload with Unsupported Media Type
        If the client creates a POST request to /readings with a payload that is not JSON,
        it should receive a response with a 415 Unsupported Media Type HTTP status code

        When the client creates a POST request to /readings
        And attaches a generic non-JSON payload
        And sends the request
        Then our API should respond with a 415 HTTP status code
        And the header of the response should include "application/json"
        And the payload of the response should be a valid JSON object
        And contains a message property which says 'The "Content-Type" header must always be "application/json"'

    Scenario: Malformed JSON Payload
        If the client sends a POST request to /readings with a payload that is malformed,
        it should receive a response with a 400 Unsupported Media Type HTTP status code
        When the client creates a POST request to /readings
        And attaches a generic malformed payload
        And sends the request
        Then our API should respond with a 400 HTTP status code
        And the header of the response should include "application/json"
        And the payload of the response should be a valid JSON object
        And contains a message property which says 'Payload should be in JSON format'