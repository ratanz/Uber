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
- **Status Code**: 200 OK
- **Content**: Returns the created user object (password field excluded)
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
