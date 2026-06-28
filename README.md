# ⚡ EV Charging Station Management System

A full-stack Charging Station Management System built using **Node.js, Express, MongoDB, and Vue.js**.

The application allows users to manage EV charging stations with authentication, CRUD operations, filtering, and an interactive map view.

---

## Links
#Frontend 
```bash
https://evoltsoft-assignment-xi.vercel.app
```
# Backend API
```bash
https://evoltsoftassignment.onrender.com
```
3 Swagger API Documentation
```bash
https://evoltsoftassignment.onrender.com/api-docs/
```
# GitHub Repository

```bash
https://github.com/Aryanverma24/EvoltsoftAssignment
```


## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT based Authentication
- Protected Routes

### Charging Station Management
- Add new charging stations
- View all charging stations
- Edit charging station details
- Delete charging stations

### Station Details
Each charging station contains:
- Station Name
- Location (Latitude & Longitude)
- Status (Active/Inactive)
- Power Output (kW)
- Connector Type

### Map Integration
- Interactive map using OpenStreetMap + Leaflet
- Display charging stations using markers
- Marker popup showing station details

### Dashboard
- Station statistics
- Analytics charts
- Responsive UI

---

## 🛠 Tech Stack

### Frontend
- Vue.js 3
- Vite
- Tailwind CSS
- Axios
- Leaflet Maps

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## 📂 Project Structure




---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Aryanverma24/EvoltsoftAssignment.git

cd charging-station-app
```
## Backend Setup 

```bash
cd backend
```
# Install dependencies:

```bash
npm install
```

# Create .env file inside backend folder:

```bash

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

```
# Run Backend

```bash
npm run dev
```

# Backend will start on:

```bash
http://localhost:5000
```

## Frontend Setup

```bash
cd frontend
```
# Install dependencies:

```bash
npm install
```
# Run frontend

```bash
npm run dev
```

# Frontend will start on:

```bash
http://localhost:5173
```

# 🔗 API Endpoints

## 🔐 Authentication APIs


### Register User

Create a new user account.

**Method:** `POST`

```http
/api/auth/register
```

**Request Body:**

```json
{
  "name": "Aryan Verma",
  "email": "aryan@example.com",
  "password": "password123"
}

```Response

{
  "message": "User Registered Successfully",
  "token": "jwt_token"
}
```

# Login User

**Method:** `POST`

```http
/api/auth/login
```
Login user and generate JWT authentication token.

Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}

Response

{
  "message": "Login successfully",
  "token": "jwt_token"
}
```

## ⚡ Charging Station APIs

All charging station routes are protected and require JWT token.

Add token in request header:

Authorization: Bearer <JWT_TOKEN>

Get All Charging Stations
Fetch all available charging stations.

**Method:** `GET`

```http
/api/stations

```

# Create Charging Station

**Method:** `POST`

Create a new charging station.

```http
/api/stations
```

Request Body
```json
{
  "name": "EV Charging Station",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "status": "Active",
  "powerOutput": 50,
  "connectorType": "CCS"
}
```
# # Update Charging Station

**Method:** `PUT`

Update existing charging station details.

```http
/api/stations/:id
```

Request Body
```json
{
  "name": "Updated Station",
  "status": "Inactive",
  "powerOutput": 60,
  "connectorType": "Type-2"
}
```

## Delete Charging Station

**Method:** `DELETE`

Delete a charging station using station ID.

```http
/api/stations/:id
```

## Authentication

Protected APIs require JWT token:

Authorization: Bearer your_jwt_token

## SnapShots

# 1. Login Page
<img width="1920" height="1080" alt="Screenshot (199)" src="https://github.com/user-attachments/assets/5aaf24ef-a137-429a-82a9-d063aacaefbf" />


# 2.Register Page
<img width="1920" height="1080" alt="Screenshot (200)" src="https://github.com/user-attachments/assets/cd7c8049-3d6f-4d54-a95e-f6c8b92c017d" />

# 3 Dashboard Pages
<img width="1920" height="1080" alt="Screenshot (201)" src="https://github.com/user-attachments/assets/ed44845f-138c-4356-8508-eb5ea49700c5" />
<img width="1920" height="1080" alt="Screenshot (202)" src="https://github.com/user-attachments/assets/a803b647-972a-4ebc-88b2-e55f7bc3e3b8" />


# 4 Station Page
<img width="1920" height="1080" alt="Screenshot (203)" src="https://github.com/user-attachments/assets/94a3b324-62a7-4d36-93ed-f3c66eb4b0f3" />

# 5 Station Details Pages

<img width="1920" height="1080" alt="Screenshot (204)" src="https://github.com/user-attachments/assets/ec91e756-de2a-4066-9728-bcb87800c9dd" />
<img width="1920" height="1080" alt="Screenshot (205)" src="https://github.com/user-attachments/assets/cd0bd258-1288-45b5-bbec-98c24faf766c" />


#6 Stations list in Map
<img width="1920" height="1080" alt="Screenshot (206)" src="https://github.com/user-attachments/assets/8226e764-d405-4da3-91db-2a8a8c2390df" />



## 🌐 Deployment

# Frontend
```bash
https://evoltsoft-assignment-xi.vercel.app
```
# Backend API
```bash
https://evoltsoftassignment.onrender.com
```
# 🔐 Environment Variables

# Backend 
```
PORT=
MONGODB_URI=
JWT_SECRET=
```
# frontend 

```
VITE_API_URL=
```

## 👨‍💻 Author

# Aryan Verma

GitHub:

``` 
https://github.com/Aryanverma24
```

