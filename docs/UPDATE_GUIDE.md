# Trishul Homestay Direct Booking Engine

# Content & Availability Update Guide

This guide explains how to update room details, availability, images, and contact information without changing the website code.

---

# 1. Update Room Information

File:

```text
data/rooms.json
```

Example:

```json
{
  "id": 1,
  "name": "Standard Room",
  "price": "₹1800 / Night",
  "capacity": "2 Guests",
  "image": "assets/images/room-standard.jpg",
  "description": "Comfortable room ideal for solo travelers and couples.",
  "amenities": [
    "Free WiFi",
    "Hot Water",
    "Parking"
  ]
}
```

---

## Change Room Price

Current:

```json
"price": "₹1800 / Night"
```

Updated:

```json
"price": "₹2200 / Night"
```

Save file.

Refresh website.

Done.

---

## Change Room Description

Current:

```json
"description": "Comfortable room ideal for solo travelers."
```

Replace with desired text.

Save file.

Refresh website.

Done.

---

# 2. Add New Room

Open:

```text
data/rooms.json
```

Copy an existing room block.

Example:

```json
{
  "id": 4,
  "name": "Premium Cottage",
  "price": "₹4500 / Night",
  "capacity": "4 Guests",
  "image": "assets/images/premium-cottage.jpg",
  "description": "Luxury cottage with panoramic mountain view.",
  "amenities": [
    "WiFi",
    "Breakfast",
    "Bonfire",
    "Mountain View"
  ]
}
```

Add comma before the new object if needed.

Save file.

Refresh website.

New room will automatically appear.

---

# 3. Update Availability

Open:

```text
data/availability.json
```

Example:

```json
{
  "2026-07-01": "available",
  "2026-07-02": "booked"
}
```

---

## Mark Date As Booked

Change:

```json
"2026-07-10": "available"
```

To:

```json
"2026-07-10": "booked"
```

Save file.

Refresh website.

Date will appear in red.

---

## Mark Date As Available

Change:

```json
"2026-07-10": "booked"
```

To:

```json
"2026-07-10": "available"
```

Save file.

Refresh website.

Date will appear in green.

---

# 4. Update WhatsApp Number

Open:

```text
js/booking.js
```

Find:

```javascript
const WHATSAPP_NUMBER = "919876543210";
```

Replace:

```javascript
const WHATSAPP_NUMBER = "91YOURNUMBER";
```

Example:

```javascript
const WHATSAPP_NUMBER = "919876543210";
```

Save file.

Done.

---

# 5. Replace Images

Image Folder:

```text
assets/images/
```

---

## Hero Image

Replace:

```text
hero.jpg
```

---

## About Image

Replace:

```text
about.jpg
```

---

## Room Images

Replace:

```text
room-standard.jpg
room-deluxe.jpg
room-family.jpg
```

---

## Gallery Images

Replace:

```text
gallery1.jpg
gallery2.jpg
gallery3.jpg
gallery4.jpg
gallery5.jpg
gallery6.jpg
```

Important:

Keep same file names.

No code changes required.

---

# 6. Update Contact Information

Files:

```text
index.html
rooms.html
availability.html
booking.html
```

Search:

```text
+91 9876543210
```

Replace with actual number.

Search:

```text
info@trishulhomestay.com
```

Replace with actual email.

Save files.

Done.

---

# 7. Change Logo

File:

```text
assets/images/logo.png
```

Replace logo image with new logo.

Keep same filename:

```text
logo.png
```

Refresh website.

Done.

---

# 8. Dark Mode

Dark Mode is automatically enabled through theme toggle.

No configuration required.

---

# 9. Deploy Website

Recommended Hosting:

- GitHub Pages
- Netlify

Upload complete project folder.

Website will go live.

---

# Troubleshooting

## Rooms Not Showing

Check:

```text
data/rooms.json
```

Ensure valid JSON format.

---

## Availability Not Showing

Check:

```text
data/availability.json
```

Ensure valid JSON format.

---

## WhatsApp Not Opening

Check:

```text
js/booking.js
```

Verify WhatsApp number format:

```text
919876543210
```

No spaces.

No '+' sign.

---

# Support

For future upgrades:

- Admin Dashboard
- Database Integration
- Online Payments
- User Login System
- AI Travel Assistant

can be added without redesigning the project structure.