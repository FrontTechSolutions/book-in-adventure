# Book-in Adventure – API Reference

## Professional Public Page (Client View)

### Main Endpoints

#### Professional Info
- `GET /pros/:id` : Get professional's public info

#### Activities
- `GET /pros/:id/activities` : List all activities for the professional

#### Slots
- `GET /pros/:id/slots?activity=...&date=...` : Get available slots for a given activity and date

#### Cart
- `POST /cart/add` : Add a slot to the cart
- `GET /cart` : Get the current cart (summary of reservations)
- `POST /cart/checkout` : Validate and pay for the cart

---

## Example Usage

### Get Professional Info
```http
GET /pros/12345
```

### List Activities
```http
GET /pros/12345/activities
```

### Get Filtered Slots
```http
GET /pros/12345/slots?activity=67890&date=2025-12-19
```

### Add Slot to Cart
```http
POST /cart/add
Content-Type: application/json
{
  "slotId": "abcde",
  "quantity": 2
}
```

### Get Cart
```http
GET /cart
```

### Checkout Cart
```http
POST /cart/checkout
Content-Type: application/json
{
  "paymentMethod": "stripe"
}
```

---

## Notes
- All endpoints are RESTful and return JSON.
- Authentication may be required for some actions (cart, checkout).
- Filtering and pagination parameters can be added as needed.

For more details, see the functional documentation or contact the technical team.
