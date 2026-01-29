# API Documentation - Powell's Antique Shop

## 📡 API Overview

Base URL (Development): `http://localhost:3000/api`  
Base URL (Production): `https://your-domain.vercel.app/api`

**Content-Type:** `application/json`  
**Authentication:** JWT Bearer Token (Admin endpoints only)

---

## 🌐 Public Endpoints (No Authentication)

### 1. Get All Products

**Endpoint:** `GET /api/products`

**Description:** Retrieve a paginated list of products with optional filters.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Items per page (default: 12) |
| `category` | string | No | Filter by category slug |
| `search` | string | No | Search in name/description |
| `featured` | boolean | No | Only featured products |
| `minPrice` | number | No | Minimum price filter |
| `maxPrice` | number | No | Maximum price filter |
| `condition` | string | No | Filter by condition |

**Example Request:**
```bash
GET /api/products?page=1&limit=12&category=vintage-bags&minPrice=1000&maxPrice=5000
```

**Example Response:** (200 OK)
```json
{
  "products": [
    {
      "id": "clxxx123",
      "name": "1950s Leather Handbag",
      "slug": "1950s-leather-handbag",
      "description": "Authentic 1950s leather handbag...",
      "price": "4500.00",
      "condition": "Excellent",
      "material": "Genuine Leather",
      "history": "Originally from a private collection...",
      "categoryId": "clyyy456",
      "category": {
        "id": "clyyy456",
        "name": "Vintage Bags",
        "slug": "vintage-bags",
        "description": "Curated collection..."
      },
      "images": [
        "/uploads/bag-1-main.jpg",
        "/uploads/bag-1-side.jpg"
      ],
      "isAvailable": true,
      "isFeatured": true,
      "createdAt": "2026-01-20T10:00:00Z",
      "updatedAt": "2026-01-29T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 45,
    "totalPages": 4
  }
}
```

---

### 2. Get Single Product

**Endpoint:** `GET /api/products/:slug`

**Description:** Retrieve detailed information about a specific product.

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | Yes | Product slug (URL-friendly ID) |

**Example Request:**
```bash
GET /api/products/1950s-leather-handbag
```

**Example Response:** (200 OK)
```json
{
  "id": "clxxx123",
  "name": "1950s Leather Handbag",
  "slug": "1950s-leather-handbag",
  "description": "Authentic 1950s leather handbag in excellent condition...",
  "price": "4500.00",
  "condition": "Excellent",
  "material": "Genuine Leather",
  "history": "Originally from a private collection in Paris...",
  "categoryId": "clyyy456",
  "category": {
    "id": "clyyy456",
    "name": "Vintage Bags",
    "slug": "vintage-bags"
  },
  "images": [
    "/uploads/bag-1-main.jpg",
    "/uploads/bag-1-side.jpg",
    "/uploads/bag-1-detail.jpg"
  ],
  "isAvailable": true,
  "isFeatured": true,
  "createdAt": "2026-01-20T10:00:00Z",
  "updatedAt": "2026-01-29T14:30:00Z"
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "statusCode": 404,
  "message": "Product not found"
}
```

---

### 3. Get All Categories

**Endpoint:** `GET /api/categories`

**Description:** Retrieve list of all product categories.

**Example Request:**
```bash
GET /api/categories
```

**Example Response:** (200 OK)
```json
[
  {
    "id": "clyyy456",
    "name": "Vintage Bags",
    "slug": "vintage-bags",
    "description": "Curated collection of vintage and antique bags",
    "createdAt": "2026-01-15T08:00:00Z",
    "updatedAt": "2026-01-15T08:00:00Z"
  },
  {
    "id": "clzzz789",
    "name": "Collectibles",
    "slug": "collectibles",
    "description": "Rare and unique collectible items",
    "createdAt": "2026-01-15T08:00:00Z",
    "updatedAt": "2026-01-15T08:00:00Z"
  }
]
```

---

### 4. Create Order (Checkout)

**Endpoint:** `POST /api/orders`

**Description:** Submit a new order from checkout.

**Request Body:**
```json
{
  "customerName": "Juan Dela Cruz",
  "customerEmail": "juan@example.com",
  "customerPhone": "+639123456789",
  "shippingAddress": "123 Session Road, Baguio City, Philippines 2600",
  "items": [
    {
      "productId": "clxxx123",
      "quantity": 1
    }
  ],
  "customerNotes": "Please call before delivery"
}
```

**Validation Rules:**
- `customerName`: Required, min 1 character
- `customerEmail`: Required, valid email format
- `customerPhone`: Required, min 1 character
- `shippingAddress`: Required, min 1 character
- `items`: Required, array with at least 1 item
- `customerNotes`: Optional

**Example Response:** (200 OK)
```json
{
  "success": true,
  "order": {
    "id": "claaa111",
    "orderNumber": "ORD-1738166400-XY7K4M9Z",
    "customerName": "Juan Dela Cruz",
    "customerEmail": "juan@example.com",
    "customerPhone": "+639123456789",
    "shippingAddress": "123 Session Road, Baguio City...",
    "subtotal": "4500.00",
    "total": "4500.00",
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "customerNotes": "Please call before delivery",
    "items": [
      {
        "id": "clbbb222",
        "productId": "clxxx123",
        "productName": "1950s Leather Handbag",
        "productPrice": "4500.00",
        "quantity": 1,
        "product": {
          "id": "clxxx123",
          "name": "1950s Leather Handbag",
          "images": ["/uploads/bag-1-main.jpg"]
        }
      }
    ],
    "createdAt": "2026-01-29T15:30:00Z",
    "updatedAt": "2026-01-29T15:30:00Z"
  }
}
```

**Error Responses:**
```json
// 400 Bad Request - Validation Error
{
  "statusCode": 400,
  "message": "Valid email is required"
}

// 400 Bad Request - Product Unavailable
{
  "statusCode": 400,
  "message": "Some products are not available"
}
```

---

## 🔒 Admin Endpoints (Authentication Required)

### Authentication

All admin endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 5. Admin Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate admin user and receive JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Example Response:** (200 OK)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsY2NjMzMzIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcG93ZWxsc2FudGlxdWUuY29tIiwiaWF0IjoxNzM4MTY2NDAwLCJleHAiOjE3MzgyNTI4MDB9.xxxxx",
  "admin": {
    "id": "clccc333",
    "username": "admin",
    "email": "admin@powellsantique.com",
    "fullName": "Powell Admin"
  }
}
```

**Error Responses:**
```json
// 400 Bad Request
{
  "statusCode": 400,
  "message": "Username and password are required"
}

// 401 Unauthorized
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

**Token Usage:**
```javascript
// Store token (client-side)
localStorage.setItem('token', response.token)

// Use in subsequent requests
fetch('/api/admin/products', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

---

### 6. Create Product (Admin)

**Endpoint:** `POST /api/admin/products`  
**Auth:** Required

**Request Body:**
```json
{
  "name": "Victorian Coin Purse",
  "slug": "victorian-coin-purse",
  "description": "Rare Victorian-era coin purse with intricate metalwork...",
  "price": 2800,
  "condition": "Good",
  "material": "Metal & Velvet",
  "history": "Circa 1880s, typical of Victorian era craftsmanship",
  "categoryId": "clzzz789",
  "images": [
    "/uploads/purse-1.jpg",
    "/uploads/purse-2.jpg"
  ],
  "isAvailable": true,
  "isFeatured": false
}
```

**Example Response:** (201 Created)
```json
{
  "success": true,
  "product": {
    "id": "clddd444",
    "name": "Victorian Coin Purse",
    "slug": "victorian-coin-purse",
    // ... full product object
    "createdAt": "2026-01-29T16:00:00Z",
    "updatedAt": "2026-01-29T16:00:00Z"
  }
}
```

---

### 7. Update Product (Admin)

**Endpoint:** `PUT /api/admin/products/:id`  
**Auth:** Required

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Product ID (not slug) |

**Request Body:** (partial update supported)
```json
{
  "price": 3000,
  "isAvailable": false
}
```

**Example Response:** (200 OK)
```json
{
  "success": true,
  "product": {
    "id": "clddd444",
    "price": "3000.00",
    "isAvailable": false,
    "updatedAt": "2026-01-29T16:30:00Z"
  }
}
```

---

### 8. Delete Product (Admin)

**Endpoint:** `DELETE /api/admin/products/:id`  
**Auth:** Required

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Product ID |

**Example Response:** (200 OK)
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

### 9. Get All Orders (Admin)

**Endpoint:** `GET /api/admin/orders`  
**Auth:** Required

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |
| `status` | string | No | Filter by status |
| `search` | string | No | Search order number/customer |

**Example Request:**
```bash
GET /api/admin/orders?status=PENDING&page=1&limit=20
```

**Example Response:** (200 OK)
```json
{
  "orders": [
    {
      "id": "claaa111",
      "orderNumber": "ORD-1738166400-XY7K4M9Z",
      "customerName": "Juan Dela Cruz",
      "customerEmail": "juan@example.com",
      "total": "4500.00",
      "status": "PENDING",
      "paymentStatus": "PENDING",
      "createdAt": "2026-01-29T15:30:00Z",
      "items": [
        {
          "productName": "1950s Leather Handbag",
          "quantity": 1,
          "productPrice": "4500.00"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1
  }
}
```

---

### 10. Update Order Status (Admin)

**Endpoint:** `PUT /api/admin/orders/:id`  
**Auth:** Required

**Request Body:**
```json
{
  "status": "PROCESSING",
  "adminNotes": "Payment confirmed, preparing for shipment"
}
```

**Status Options:**
- `PENDING` - Order received, awaiting payment
- `PROCESSING` - Payment confirmed, preparing order
- `SHIPPED` - Order dispatched
- `COMPLETED` - Order delivered
- `CANCELLED` - Order cancelled

**Example Response:** (200 OK)
```json
{
  "success": true,
  "order": {
    "id": "claaa111",
    "status": "PROCESSING",
    "adminNotes": "Payment confirmed, preparing for shipment",
    "updatedAt": "2026-01-29T17:00:00Z"
  }
}
```

---

## 🔧 Implementation Examples

### Frontend (Vue/Nuxt)

#### Fetch Products with Filters
```vue
<script setup>
const { data, pending } = await useFetch('/api/products', {
  query: {
    category: 'vintage-bags',
    minPrice: 1000,
    maxPrice: 5000,
    page: 1
  }
})

const products = computed(() => data.value?.products || [])
</script>
```

#### Create Order
```vue
<script setup>
const submitOrder = async (formData) => {
  try {
    const { data } = await useFetch('/api/orders', {
      method: 'POST',
      body: {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        items: cartItems.value.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      }
    })
    
    if (data.value.success) {
      navigateTo(`/order-confirmation/${data.value.order.orderNumber}`)
    }
  } catch (error) {
    console.error('Order failed:', error)
  }
}
</script>
```

#### Admin Login
```vue
<script setup>
const login = async (username, password) => {
  try {
    const { data } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: { username, password }
    })
    
    if (data.value.success) {
      localStorage.setItem('token', data.value.token)
      navigateTo('/admin')
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>
```

---

## 🧪 Testing with cURL

### Get Products
```bash
curl http://localhost:3000/api/products
```

### Get Single Product
```bash
curl http://localhost:3000/api/products/1950s-leather-handbag
```

### Admin Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Create Product (Admin)
```bash
curl -X POST http://localhost:3000/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test Product",
    "slug": "test-product",
    "description": "Test description",
    "price": 1000,
    "condition": "Good",
    "categoryId": "clyyy456",
    "images": [],
    "isAvailable": true
  }'
```

---

## 🚨 Error Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## 📝 Notes

1. **Pagination:** Default limit is 12 items per page
2. **Prices:** Stored as DECIMAL(10,2), returned as strings
3. **Timestamps:** All timestamps in ISO 8601 format (UTC)
4. **Images:** Array of URLs (relative or absolute paths)
5. **JWT Expiry:** Tokens expire after 24 hours
6. **Rate Limiting:** Not yet implemented (Phase 2)

---

**API Version:** 1.0  
**Last Updated:** January 29, 2026
