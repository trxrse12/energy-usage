Feature: Retrieve all the energy readings
  Clients should be able to send a request to our API in order to retrieve the entire set of readings.

  Scenario: Retrieve all readings
    When the client creates a GET request to /readings
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be a valid JSON object