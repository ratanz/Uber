# User API Documentation

## API Base URL
All endpoints are prefixed with `/users`

## Authentication
Most endpoints require JWT authentication. For authenticated routes:
- Include the JWT token in the Authorization header
- Format: `Authorization: Bearer <your_jwt_token>`
- Token is obtained from login or register response

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
    "token": "string",  // JWT authentication token
    "user": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "_id": "string"
    }
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
- **Response Format**:
```json
{
    "errors": [
        {
            "msg": "Error message",
            "param": "field_name",
            "value": "provided_value"
        }
    ]
}
```

##### Email Already Exists
- **Status Code**: 409 Conflict
- **Condition**: When the provided email is already registered
- **Content**:
```json
{
    "message": "Email already registered"
}
```

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
    "token": "string",  // JWT authentication token
    "user": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "_id": "string"
    }
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
            "param": "field_name",
            "value": "provided_value"
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

## Get User Profile
`GET /users/profile`

Retrieve the profile information of the currently authenticated user.

### Headers
```
Authorization: Bearer <JWT_TOKEN>  // Required
```

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content**:
```json
{
    "user": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "_id": "string",
        "socketId": "string"  // optional
    }
}
```

#### Error Responses

##### Unauthorized
- **Status Code**: 401 Unauthorized
- **Conditions**:
  - No token provided
  - Invalid token
  - Expired token
  - Malformed token
- **Content**:
```json
{
    "message": "Unauthorized access"
}
```

##### Server Error
- **Status Code**: 500 Internal Server Error
- **Content**:
```json
{
    "message": "Error fetching user profile"
}
```

## Logout User
`GET /users/logout`

Logout the currently authenticated user and invalidate the token.

### Headers
```
Authorization: Bearer <JWT_TOKEN>  // Required
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
  - Token already invalidated
- **Content**:
```json
{
    "message": "Unauthorized access"
}
```

##### Server Error
- **Status Code**: 500 Internal Server Error
- **Content**:
```json
{
    "message": "Error during logout"
}
```

## Data Validation Rules
- **First Name**: 
  - Required
  - Minimum 3 characters
  - String type
- **Last Name**:
  - Optional
  - Minimum 3 characters if provided
  - String type
- **Email**:
  - Required
  - Must be a valid email format
  - Minimum 5 characters
  - Must be unique in the system
  - String type
- **Password**:
  - Required
  - Minimum 6 characters
  - String type
  - Stored securely using bcrypt hashing

## Security Features
- Passwords are hashed using bcrypt with a salt round of 10
- Password field is excluded from all query results
- Input validation is performed using express-validator
- Authentication uses JWT (JSON Web Tokens)
- Token-based session management
- Protection against:
  - Brute force attacks
  - SQL injection
  - XSS attacks
  - CSRF attacks

## Rate Limiting
- Maximum 100 requests per IP per 15 minutes
- Applies to all endpoints
- Status code 429 when limit exceeded

## Error Handling
All endpoints follow a consistent error response format:
```json
{
    "message": "Error description",
    "errors": [  // Optional, present for validation errors
        {
            "msg": "Error message",
            "param": "field_name",
            "value": "provided_value"
        }
    ]
}
```

# Captain API Documentation

## API Base URL
All captain endpoints are prefixed with `/captains`

## Register Captain
`POST /captains/register`

Register a new captain in the system.

### Request Body
```json
{
    "fullname": {
        "firstname": "string",  // required, min 3 characters
        "lastname": "string"    // optional
    },
    "email": "string",         // required, valid email format
    "password": "string",      // required, min 6 characters
    "vehicle": {
        "color": "string",     // required, min 3 characters
        "plate": "string",     // required, min 3 characters
        "capacity": "number",   // required, min 1
        "vehicleType": "string" // required, enum: ['car', 'motorcycle', 'auto']
    }
}
```

### Response

#### Success Response
- **Status Code**: 201 Created
- **Content**:
```json
{
    "message": "Captain registered successfully",
    "captain": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "number",
            "vehicleType": "string"
        },
        "_id": "string"
    }
}
```

#### Error Responses

##### Validation Error
- **Status Code**: 400 Bad Request
- **Conditions**:
  - First name is empty
  - Invalid email format
  - Password less than 6 characters
  - Vehicle color less than 3 characters
  - Vehicle plate less than 3 characters
  - Vehicle capacity less than 1
  - Invalid vehicle type
  - Missing required fields
- **Response Format**:
```json
{
    "errors": [
        {
            "msg": "Error message",
            "param": "field_name",
            "value": "provided_value"
        }
    ]
}
```

##### Email Already Exists
- **Status Code**: 409 Conflict
- **Condition**: When the provided email is already registered
- **Content**:
```json
{
    "message": "Email already registered"
}
```

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "password": "securepass123",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Data Validation Rules
- **First Name**: 
  - Required
  - Non-empty string
  - String type
- **Last Name**:
  - Optional
  - String type
- **Email**:
  - Required
  - Must be a valid email format
  - Must be unique in the system
  - String type
- **Password**:
  - Required
  - Minimum 6 characters
  - String type
  - Stored securely using bcrypt hashing
- **Vehicle Color**:
  - Required
  - Minimum 3 characters
  - String type
- **Vehicle Plate**:
  - Required
  - Minimum 3 characters
  - String type
- **Vehicle Capacity**:
  - Required
  - Integer type
  - Minimum value: 1
- **Vehicle Type**:
  - Required
  - Must be one of: ['car', 'motorcycle', 'auto']
  - String type

### Security Features
All security features from the User API apply to Captain API as well:
- Password hashing with bcrypt
- Input validation using express-validator
- Protection against common attacks
- Rate limiting
- Token-based authentication

## Login Captain
`POST /captain/login`

Authenticate an existing captain and get an access token.

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
    "token": "string",  // JWT authentication token
    "captain": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "number",
            "vehicleType": "string"
        },
        "_id": "string"
    }
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
            "param": "field_name",
            "value": "provided_value"
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

## Get Captain Profile
`GET /captain/profile`

Retrieve the profile information of the currently authenticated captain.

### Headers
```
Authorization: Bearer <JWT_TOKEN>  // Required
```

### Response

#### Success Response
- **Status Code**: 200 OK
- **Content**:
```json
{
    "captain": {
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "number",
            "vehicleType": "string"
        },
        "_id": "string"
    }
}
```

#### Error Responses

##### Unauthorized
- **Status Code**: 401 Unauthorized
- **Conditions**:
  - No token provided
  - Invalid token
  - Expired token
  - Malformed token
- **Content**:
```json
{
    "message": "Unauthorized access"
}
```

##### Server Error
- **Status Code**: 500 Internal Server Error
- **Content**:
```json
{
    "message": "Error fetching captain profile"
}
```

## Logout Captain
`GET /captain/logout`

Logout the currently authenticated captain and invalidate the token.

### Headers
```
Authorization: Bearer <JWT_TOKEN>  // Required
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
  - Token already invalidated
- **Content**:
```json
{
    "message": "Unauthorized access"
}
```

##### Server Error
- **Status Code**: 500 Internal Server Error
- **Content**:
```json
{
    "message": "Error during logout"
}
```

## Captain Authentication Note
- All authenticated captain endpoints require a valid JWT token
- Token is obtained from login or register response
- Token must be included in the Authorization header
- Token format: `Bearer <token>`
- Invalid or expired tokens will result in 401 Unauthorized responses

## Captain-specific Validation Rules
- **Vehicle Details**:
  - All vehicle information is required during registration
  - Vehicle type must be one of: ['car', 'motorcycle', 'auto']
  - Vehicle capacity must be a positive number
  - Vehicle plate must be unique in the system
  - Color and plate must be at least 3 characters long

## Captain API Security
- All security features from the User API apply
- Additional validation for vehicle-related data
- Vehicle plate uniqueness check
- Role-based access control for captain-specific endpoints
