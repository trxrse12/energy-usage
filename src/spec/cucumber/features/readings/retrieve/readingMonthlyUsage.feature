Feature: Retrieve the monthly energy usage
  Clients should be able to send a request to our API in order to retrieve the entire set of monthly energy usage.

  Scenario: Retrieve monthly energy usage
    When the client creates a GET request to /usage
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be a valid JSON object