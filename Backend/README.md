# User API Documentation

## Register User
`POST /users/register`

Register a new user in the system.

### Request Body
```json
{
    "fullname": {
        "firstname": "string", // required, min 3 characters
        "lastname": "string"   // optional, min 3 characters if provided
    },
    "email": "string",    // required, valid email format, min 5 characters
    "password": "string"  // required, min 6 characters
}
```

### Response

#### Success Response
- **Status Code**: 201 Created
- **Content**:
```json
{
    "message": "User created successfully",
    "token": "string"  // JWT authentication token
}
```

#### Error Responses

##### Validation Error
- **Status Code**: 400 Bad Request
- **Conditions**:
  - First name less than 3 characters
  - Invalid email format
  - Password less than 6 characters
  - Missing required fields

##### Email Already Exists
- **Status Code**: 409 Conflict
- **Condition**: When the provided email is already registered

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

### Data Validation Rules
- **First Name**: 
  - Required
  - Minimum 3 characters
- **Last Name**:
  - Optional
  - Minimum 3 characters if provided
- **Email**:
  - Required
  - Must be a valid email format
  - Minimum 5 characters
  - Must be unique in the system
- **Password**:
  - Required
  - Minimum 6 characters
  - Stored securely using bcrypt hashing

## Login User
`POST /users/login`

Authenticate an existing user and get an access token.

### Request Body
```json
{
    "email": "string",    // required, valid email format
    "password": "string"  // required, min 6 characters
}
```

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content**:
```json
{
    "message": "Login successful",
    "token": "string"  // JWT authentication token
}
```

#### Error Responses

##### Validation Error
- **Status Code**: 400 Bad Request
- **Conditions**:
  - Invalid email format
  - Password less than 6 characters
  - Missing required fields
- **Response Format**:
```json
{
    "errors": [
        {
            "msg": "Error message",
            "param": "field_name"
        }
    ]
}
```

##### Authentication Failed
- **Status Code**: 401 Unauthorized
- **Condition**: When email doesn't exist or password is incorrect
- **Content**:
```json
{
    "message": "Invalid email or password"
}
```

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

### Data Validation Rules
- **Email**:
  - Required
  - Must be a valid email format
- **Password**:
  - Required
  - Minimum 6 characters

### Security Features
- Passwords are hashed using bcrypt with a salt round of 10
- Password field is excluded from all query results
- Input validation is performed using express-validator
- Authentication uses JWT (JSON Web Tokens)

## Get User Profile
`GET /users/profile`

Retrieve the profile information of the currently authenticated user.

### Headers
```
Authorization: Bearer <JWT_TOKEN>
```

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content**:
```json
{
    "fullname": {
        "firstname": "string",
        "lastname": "string"
    },
    "email": "string",
    "_id": "string",
    "socketId": "string"  // optional
}
```

#### Error Responses

##### Unauthorized
- **Status Code**: 401 Unauthorized
- **Conditions**:
  - No token provided
  - Invalid token
  - Expired token
- **Content**:
```json
{
    "message": "Unauthorized access"
}
```

## Logout User
`GET /users/logout`

Logout the currently authenticated user.

### Headers
```
Authorization: Bearer <JWT_TOKEN>
```

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content**:
```json
{
    "message": "Logged out successfully"
}
```

#### Error Responses

##### Unauthorized
- **Status Code**: 401 Unauthorized
- **Conditions**:
  - No token provided
  - Invalid token
  - Expired token
- **Content**:
```json
{
    "message": "Unauthorized access"
}
```

### Authentication Note
Both `/users/profile` and `/users/logout` endpoints require authentication using JWT token. The token must be included in the request headers using the Bearer token format.
