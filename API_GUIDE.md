# Backend API Testing Guide

## Server Status
- ✅ Server: http://localhost:5000
- ✅ MongoDB: Connected

## API Endpoints

### 1. STUDENT AUTHENTICATION

#### Register Student
```
POST /api/students/register
Content-Type: application/json

{
  "phoneNumber": "9876543210",
  "password": "student123",
  "name": "John Doe",
  "email": "john@college.ac.in"
}

Response:
{
  "message": "Student registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "phoneNumber": "9876543210",
    "name": "John Doe"
  }
}
```

#### Login Student
```
POST /api/students/login
Content-Type: application/json

{
  "phoneNumber": "9876543210",
  "password": "student123"
}

Response:
{
  "message": "Student logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "phoneNumber": "9876543210",
    "name": "John Doe"
  }
}
```

---

### 2. ADMIN AUTHENTICATION

#### Register Admin
```
POST /api/admins/register
Content-Type: application/json

{
  "email": "admin@college.ac.in",
  "password": "admin123456",
  "name": "Admin User"
}

Response:
{
  "message": "Admin registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "507f1f77bcf86cd799439012",
    "email": "admin@college.ac.in",
    "name": "Admin User"
  }
}
```

#### Login Admin
```
POST /api/admins/login
Content-Type: application/json

{
  "email": "admin@college.ac.in",
  "password": "admin123456"
}

Response:
{
  "message": "Admin logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "507f1f77bcf86cd799439012",
    "email": "admin@college.ac.in",
    "name": "Admin User"
  }
}
```

---

### 3. COMPLAINT MANAGEMENT

#### Submit Complaint (Student)
```
POST /api/complaints/submit
Authorization: Bearer <student_token>
Content-Type: multipart/form-data

Form Data:
- message: "Describe the ragging incident here..."
- proofImages: [file1.jpg, file2.jpg, ...] (max 5 files, 5MB each)

Response:
{
  "message": "Complaint submitted successfully",
  "complaint": {
    "_id": "507f1f77bcf86cd799439013",
    "studentId": "507f1f77bcf86cd799439011",
    "studentPhone": "9876543210",
    "message": "Describe the ragging incident here...",
    "proofImages": [
      {
        "filename": "1674469800000.jpg",
        "path": "/uploads/1674469800000.jpg"
      }
    ],
    "status": "pending",
    "severity": "medium",
    "createdAt": "2026-01-23T05:45:00.000Z"
  }
}
```

#### Get Student's Complaints
```
GET /api/complaints/my-complaints
Authorization: Bearer <student_token>

Response:
{
  "message": "Student complaints retrieved",
  "complaints": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "studentId": "507f1f77bcf86cd799439011",
      "studentPhone": "9876543210",
      "message": "Incident description...",
      "status": "pending",
      "severity": "medium",
      "createdAt": "2026-01-23T05:45:00.000Z"
    }
  ]
}
```

#### Get All Complaints (Admin Only)
```
GET /api/complaints/all
Authorization: Bearer <admin_token>

Response:
{
  "message": "All complaints retrieved",
  "complaints": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "studentId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "phoneNumber": "9876543210",
        "email": "john@college.ac.in"
      },
      "studentPhone": "9876543210",
      "message": "Incident description...",
      "proofImages": [...],
      "status": "pending",
      "severity": "medium",
      "createdAt": "2026-01-23T05:45:00.000Z"
    }
  ]
}
```

#### Get Complaint Details (Admin Only)
```
GET /api/complaints/:complaintId
Authorization: Bearer <admin_token>

Response:
{
  "message": "Complaint details retrieved",
  "complaint": {
    "_id": "507f1f77bcf86cd799439013",
    "studentId": {...},
    "message": "...",
    "proofImages": [...]
  }
}
```

#### Update Complaint Status (Admin Only)
```
PUT /api/complaints/:complaintId
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "under-review",
  "severity": "high",
  "adminNotes": "Investigating the incident. Student will be contacted soon."
}

Response:
{
  "message": "Complaint updated successfully",
  "complaint": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "under-review",
    "severity": "high",
    "adminNotes": "Investigating the incident...",
    "updatedAt": "2026-01-23T06:00:00.000Z"
  }
}
```

---

## Status Values
- `pending` - Complaint just submitted
- `under-review` - Admin is reviewing
- `resolved` - Case closed

## Severity Levels
- `low` - Minor incident
- `medium` - Standard incident
- `high` - Serious incident

## Quick Test Flow

1. **Register a student**
```
POST http://localhost:5000/api/students/register
{
  "phoneNumber": "9876543210",
  "password": "student123",
  "name": "Test Student",
  "email": "test@college.ac.in"
}
```

2. **Register an admin**
```
POST http://localhost:5000/api/admins/register
{
  "email": "admin@college.ac.in",
  "password": "admin123456",
  "name": "Admin"
}
```

3. **Student submits complaint**
```
POST http://localhost:5000/api/complaints/submit
Authorization: Bearer <student_token>
(Include message and optional image files)
```

4. **Admin views all complaints**
```
GET http://localhost:5000/api/complaints/all
Authorization: Bearer <admin_token>
```

5. **Admin updates complaint**
```
PUT http://localhost:5000/api/complaints/<complaint_id>
Authorization: Bearer <admin_token>
{
  "status": "under-review",
  "severity": "high",
  "adminNotes": "Notes here"
}
```

## Tools to Test API

### Using Postman
1. Download Postman
2. Create requests for each endpoint
3. Add Authorization header: `Bearer <token>`
4. Send requests and verify responses

### Using cURL (Command Line)
```
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"9876543210","password":"student123","name":"Test","email":"test@test.com"}'
```

### Using Thunder Client (VS Code Extension)
1. Install Thunder Client extension
2. Create new request
3. Set method and URL
4. Add headers and body
5. Send and view response
