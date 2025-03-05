# Calculator with API

This API provides endpoints for performing basic arithmetic operations (sum, subtraction, multiplication, and division) using the HTTP `POST` method. The data is exchanged in the JSON:API format (`application/vnd.api+json`).

## Features
- Supports arithmetic operations: addition, subtraction, multiplication, and division.
- Requires `POST` requests with `application/vnd.api+json` content type and accept header.
- Returns results in a consistent JSON:API response format.
- Handles errors, including invalid JSON and unsupported media types.

## Endpoints

### 1. `/sum`
- **Method:** `POST`
- **Description:** Calculates the sum of two numbers.
- **Request Body Example:**
  ```json
  {
    "data": {
      "type": "operation",
      "attributes": {
        "num1": "5",
        "num2": "10"
      }
    }
  }
  ```
- **Response Example:**
  ```json
  {
    "data": {
      "type": "operation",
      "id": "sum-operation",
      "attributes": {
        "num1": "5",
        "num2": "10",
        "result": "15"
      }
    }
  }
  ```

### 2. `/sub`
- **Method:** `POST`
- **Description:** Calculates the difference between two numbers.
- **Request Body Example:**
  ```json
  {
    "data": {
      "type": "operation",
      "attributes": {
        "num1": "10",
        "num2": "3"
      }
    }
  }
  ```
- **Response Example:**
  ```json
  {
    "data": {
      "type": "operation",
      "id": "substraction-operation",
      "attributes": {
        "num1": "10",
        "num2": "3",
        "result": "7"
      }
    }
  }
  ```

### 3. `/mult`
- **Method:** `POST`
- **Description:** Calculates the product of two numbers.
- **Request Body Example:**
  ```json
  {
    "data": {
      "type": "operation",
      "attributes": {
        "num1": "4",
        "num2": "5"
      }
    }
  }
  ```
- **Response Example:**
  ```json
  {
    "data": {
      "type": "operation",
      "id": "multiplication-operation",
      "attributes": {
        "num1": "4",
        "num2": "5",
        "result": "20"
      }
    }
  }
  ```

### 4. `/div`
- **Method:** `POST`
- **Description:** Calculates the quotient of two numbers.
- **Request Body Example:**
  ```json
  {
    "data": {
      "type": "operation",
      "attributes": {
        "num1": "20",
        "num2": "5"
      }
    }
  }
  ```
- **Response Example:**
  ```json
  {
    "data": {
      "type": "operation",
      "id": "division-operation",
      "attributes": {
        "num1": "20",
        "num2": "5",
        "result": "4"
      }
    }
  }
  ```

## Error Handling

### Supported Errors:
- **415 Unsupported Media Type:** If the `Content-Type` header is not set to `application/vnd.api+json`.
- **406 Not Acceptable:** If the `Accept` header is not set to `application/vnd.api+json`.
- **400 Invalid JSON:** If the request payload is not valid JSON.
- **405 Method Not Allowed:** If a request is made with any method other than `POST`.

#### Example error response:
```json
{
  "errors": [
    {
      "status": "415",
      "code": "unsupported-media-type",
      "title": "Unsupported Media Type",
      "detail": "Content-Type must be application/vnd.api+json"
    }
  ]
}
```

## How It Works
1. All endpoints expect the request body to be in JSON:API format with two numbers in the `attributes` object.
2. The API validates the request headers for `Content-Type` and `Accept`, returning appropriate errors if they are incorrect.
3. It processes the numbers and responds with the result in a consistent JSON:API format.
4. Errors like invalid JSON or unsupported methods are handled gracefully with appropriate error messages.

## Running the API

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the API with `npm start`.

## Notes

- This API is designed to only accept `POST` requests. Any other HTTP method will result in a `405 Method Not Allowed` error.
- The API uses centralized error handling to manage errors across all endpoints.