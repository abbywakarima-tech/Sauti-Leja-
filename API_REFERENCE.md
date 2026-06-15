# SautiLeja API Reference

## Base URL
```
https://api.sautileja.com
```

## Authentication

All endpoints (except signup/login) require a JWT token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Authentication Endpoints

### Sign Up
```
POST /api/auth/signup

Request Body:
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phoneNumber": "+254712345678",
  "businessName": "Jane's Vegetables",
  "businessType": "Market Stall",
  "location": "Nairobi",
  "preferredLanguage": "sw",
  "password": "secure_password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user123",
    "email": "jane@example.com",
    "fullName": "Jane Doe"
  }
}
```

### Login
```
POST /api/auth/login

Request Body:
{
  "email": "jane@example.com",
  "password": "secure_password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### Forgot Password
```
POST /api/auth/forgot-password

Request Body:
{
  "email": "jane@example.com"
}

Response:
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

## Transaction Endpoints

### List Transactions
```
GET /api/transactions

Query Parameters:
- limit: number (default: 50)
- offset: number (default: 0)
- startDate: ISO date
- endDate: ISO date

Response:
{
  "transactions": [
    {
      "id": "tx123",
      "productName": "Tomatoes",
      "category": "Food",
      "quantity": 10,
      "revenue": 500,
      "date": "2024-06-15T10:30:00Z"
    }
  ],
  "total": 156,
  "limit": 50,
  "offset": 0
}
```

### Create Transaction
```
POST /api/transactions

Request Body:
{
  "productName": "Tomatoes",
  "category": "Food",
  "quantity": 10,
  "sellingPrice": 50,
  "revenue": 500,
  "recordType": "manual"
}

Response:
{
  "id": "tx123",
  "productName": "Tomatoes",
  "category": "Food",
  "quantity": 10,
  "revenue": 500,
  "date": "2024-06-15T10:30:00Z",
  "recordType": "manual"
}
```

### Process Voice Transaction
```
POST /api/transactions/voice

Request Body:
{
  "audioUrl": "s3://bucket/voice.wav",
  "language": "sw"
}

Response:
{
  "success": true,
  "extractedData": {
    "productName": "Tomatoes",
    "quantity": 10,
    "revenue": 500,
    "category": "Food",
    "language": "sw"
  }
}
```

### Update Transaction
```
PUT /api/transactions/:id

Request Body:
{
  "quantity": 12,
  "sellingPrice": 55,
  "revenue": 660
}

Response: Updated transaction object
```

### Delete Transaction
```
DELETE /api/transactions/:id

Response:
{
  "success": true,
  "message": "Transaction deleted"
}
```

---

## Inventory Endpoints

### List Inventory
```
GET /api/inventory

Response:
{
  "items": [
    {
      "id": "inv123",
      "productName": "Tomatoes",
      "category": "Food",
      "stockQuantity": 50,
      "costPrice": 20,
      "sellingPrice": 30,
      "profitMargin": 33
    }
  ]
}
```

### Add Inventory Item
```
POST /api/inventory

Request Body:
{
  "productName": "Tomatoes",
  "category": "Food",
  "stockQuantity": 50,
  "costPrice": 20,
  "sellingPrice": 30
}

Response: Created inventory item
```

### Update Inventory Item
```
PUT /api/inventory/:id

Request Body:
{
  "stockQuantity": 60
}

Response: Updated item
```

### Delete Inventory Item
```
DELETE /api/inventory/:id

Response:
{
  "success": true,
  "message": "Item deleted"
}
```

---

## Reports Endpoints

### List Reports
```
GET /api/reports

Response:
{
  "reports": [
    {
      "id": "rpt123",
      "reportType": "monthly",
      "startDate": "2024-06-01",
      "endDate": "2024-06-30",
      "totalRevenue": 425000,
      "totalTransactions": 156,
      "createdAt": "2024-06-30T23:59:59Z"
    }
  ]
}
```

### Generate Report
```
POST /api/reports

Request Body:
{
  "reportType": "monthly",
  "startDate": "2024-06-01",
  "endDate": "2024-06-30"
}

Response: Generated report object
```

### Download Report
```
GET /api/reports/:id/download/:format

Format options: pdf, excel, csv

Response: File download
```

---

## Insights Endpoints

### Get Dashboard Insights
```
GET /api/insights/dashboard

Response:
{
  "insights": [
    {
      "id": 1,
      "title": "Top Selling Product",
      "description": "Tomatoes are your best-selling product",
      "priority": "high"
    }
  ]
}
```

### Get Analytics
```
GET /api/insights/analytics?startDate=2024-06-01&endDate=2024-06-30

Response:
{
  "revenue": 425000,
  "transactions": 156,
  "avgTransaction": 2724,
  "products": {...},
  "trends": {...}
}
```

---

## Subscription Endpoints

### Get Subscription Status
```
GET /api/subscription/status

Response:
{
  "planType": "starter",
  "status": "active",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-02-01T00:00:00Z",
  "autoRenew": true
}
```

### Get Credit Profile
```
GET /api/subscription/credit-profile

Response:
{
  "creditReadinessScore": 78,
  "businessGrowthScore": 65,
  "recordConsistencyScore": 85,
  "inventoryStabilityScore": 72
}
```

### Upgrade Plan
```
POST /api/subscription/upgrade

Request Body:
{
  "planType": "business"
}

Response:
{
  "success": true,
  "newPlan": "business",
  "startDate": "2024-06-15T00:00:00Z"
}
```

---

## Chatbot Endpoints

### Send Message
```
POST /api/chatbot

Request Body:
{
  "message": "How much did I sell this week?",
  "language": "en"
}

Response:
{
  "response": "Based on your transactions, you sold KES 98,250 this week with 35 transactions."
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields",
  "details": {
    "productName": "Product name is required"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "requestId": "req_123"
}
```

---

## Rate Limiting

- **Free Plan**: 100 requests/hour
- **Starter Plan**: 1,000 requests/hour
- **Business Plan**: Unlimited

---

## Pagination

All list endpoints support pagination:

```
GET /api/endpoint?limit=50&offset=0

Response:
{
  "data": [...],
  "total": 1000,
  "limit": 50,
  "offset": 0
}
```

---

## Webhooks (Beta)

Subscribe to events:

```
POST /api/webhooks/subscribe

Request Body:
{
  "url": "https://yourapp.com/webhooks",
  "events": ["transaction.created", "payment.completed"]
}
```

---

For more information, visit https://docs.sautileja.com

