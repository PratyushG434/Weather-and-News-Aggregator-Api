# 🌤️ Weather and News Aggregator API

## 📌 Introduction
The **Weather and News Aggregator API** provides real-time weather updates and the latest news for a specified city. It allows users to save preferences such as language, news categories, and location settings.

### 🚀 Base URL
```
https://weather-and-news-aggregator-dohnfguld.vercel.app
```

## 🔑 Authentication
- The API uses **JWT tokens** for protected routes.
- Users must **register and log in** to get their **JWT token**.

## 📌 Endpoints

### 📝 User Authentication

#### 🔹 **Register a New User**
- **Endpoint**: `POST /register`
- **Description**: Registers a new user.
- **Body Parameters**:
  ```json
  {
    "username": "example_user",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Registration successful! Please log in to get your authorization token.",
    "user": {
      "id": 1,
      "username": "example_user"
    }
  }
  ```

#### 🔹 **User Login**
- **Endpoint**: `POST /login`
- **Description**: Logs in a registered user and returns a JWT token.
- **Body Parameters**:
  ```json
  {
    "username": "example_user",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  "Your JWT bearer authorization token is : <TOKEN>"
  ```

### 🌍 **User Preferences Management**

#### 🔹 **Save User Preferences**
- **Endpoint**: `POST /save-preferences`
- **Authorization**: Bearer Token (JWT Required)
- **Body Parameters**:
  ```json
  {
    "preferredCity": "Mumbai",
    "preferredCategory": "Technology",
    "language": "English",
    "country": "India"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Preferences saved successfully!"
  }
  ```

#### 🔹 **Update User Preferences**
- **Endpoint**: `PUT /update-preferences`
- **Authorization**: Bearer Token (JWT Required)
- **Body Parameters** (Only provide fields you want to update):
  ```json
  {
    "preferredCity": "Delhi",
    "preferredCategory": "Business"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Preferences updated successfully!"
  }
  ```

#### 🔹 **Delete User Preferences**
- **Endpoint**: `DELETE /delete-preferences`
- **Authorization**: Bearer Token (JWT Required)
- **Response**:
  ```json
  {
    "message": "User preferences deleted successfully!"
  }
  ```

### ❌ **User Management**

#### 🔹 **Delete a User Account**
- **Endpoint**: `DELETE /delete-user`
- **Authorization**: Bearer Token (JWT Required)
- **Response**:
  ```json
  {
    "message": "User deleted successfully!"
  }
  ```

### 🌦️ **Weather & News Fetching**

#### 🔹 **Get Weather and News for a City**
- **Endpoint**: `GET /weather-news?city=Mumbai`
- **Description**: Fetches weather and news for the specified city.
- **Response**:
  ```json
  {
    "weather": {
      "temperature": "30°C",
      "humidity": "70%",
      "description": "Partly Cloudy"
    },
    "news": [
      {
        "headline": "Tech Innovations in India",
        "source": "Times of India",
        "link": "https://news.example.com"
      },
      {
        "headline": "Stock Market Hits Record High",
        "source": "Economic Times",
        "link": "https://news.example.com"
      }
    ]
  }
  ```

## 🛠 **Tech Stack**
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: JWT + bcrypt
- **Caching**: Upstash Redis
- **Deployment**: Vercel

## 📌 **How to Use the API**
1. **Register & Login** to get your JWT token.
2. **Save your preferences** (city, category, language, etc.).
3. **Use the `/weather-news` endpoint** to get real-time data.
4. **Update or delete** preferences as needed.

## 📌 **Contributing**
Contributions are welcome! If you find a bug or want to add a feature, feel free to submit a pull request.

---

© 2025 Weather and News Aggregator API | All Rights Reserved.
