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
- **Endpoint**: `POST /auth/register`
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
- **Endpoint**: `POST /auth/login`
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
  "<TOKEN>"
  ```

### 🌍 **User Preferences Management**

#### 🔹 **Save User Preferences**
- **Endpoint**: `POST /user/preferences`
- **Authorization**: Bearer Token (JWT Required) in request header
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
- **Endpoint**: `PUT /user/preferences`
- **Authorization**: Bearer Token (JWT Required) in request header
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
- **Endpoint**: `DELETE /user/preferences/delete`
- **Authorization**: Bearer Token (JWT Required) in request header
- **Response**:
  ```json
  {
    "message": "User preferences deleted successfully!"
  }
  ```

### ❌ **User Management**

#### 🔹 **Delete a User Account**
- **Endpoint**: `DELETE /user/delete`
- **Authorization**: Bearer Token (JWT Required) in request header 
- **Response**:
  ```json
  {
    "message": "User deleted successfully!"
  }
  ```

### 🌦️ **Weather & News Fetching**

#### 🔹 **Get Weather and News for a City**
- **Endpoint**: `GET /weatherAndNews?city=Mumbai`
- **Description**: Fetches weather and news for the specified city.
- **Response**:
  ```json
  {
    "weather": {
        "openWeatherApi": {
            "location": {
                "city": "Connaught Place",
                "country": "IN",
                "timezone": 19800
            },
            "temperature": {
                "value": 294.21,
                "unit": "°C",
                "feelsLike": 293.05
            },
            "condition": {
                "description": "haze",
                "icon": "50d"
            },
            "wind": {
                "speed": 5.14,
                "direction": 280
            },
            "humidity": 26,
            "visibility": 5,
            "lastUpdated": "2025-02-07T11:09:44.386Z"
        },
        "weatherAPI": {
            "location": {
                "city": "New Delhi",
                "country": "India",
                "timezone": "Asia/Kolkata"
            },
            "temperature": {
                "value": 21.2,
                "unit": "°C",
                "feelsLike": 21.2
            },
            "condition": {
                "description": "Mist",
                "icon": "//cdn.weatherapi.com/weather/64x64/day/143.png"
            },
            "wind": {
                "speed": 18,
                "direction": 294
            },
            "humidity": 26,
            "visibility": 5,
            "lastUpdated": "2025-02-07T11:09:44.948Z"
        }
    },
    "news": {
        "newsApi": {
            "articles": [
                {
                    "headline": "Abstimmung in Delhi: Wahlkampf mit Besen",
                    "source": "Faz.net",
                    "publishedAt": "2025-02-04T18:05:17Z",
                    "summary": "Niemand hat Indiens Regierungschef Modi bisher so vorgeführt wie der Landeschef von Delhi, Arvind Kejriwal. Doch nach zehn Jahren sind einige Wähler von                                   ihm und seiner Partei enttäuscht. Schafft er trotzdem die Wiederwahl?",
                    "url": "https://www.faz.net/aktuell/politik/ausland/abstimmung-in-delhi-modis-kontrahent-wackelt-im-wahlkampf-110275849.html",
                    "image": "https://media1.faz.net/ppmedia/aktuell/politik/1088118842/1.10275845/facebook_teaser_fplus/ein-aergernis-fuer-die-bjp.jpg",
                    "category": null
                },
               
        "gNewsApi": {
            "articles": [
                {
                    "headline": "Delhi Vidhan Sabha Chunav/Election Result 2025 Vote Counting Date and Time, Key Constituencies",
                    "source": "The Indian Express",
                    "publishedAt": "2025-02-07T08:11:32Z",
                    "summary": "Election Commission of India (ECI), Delhi Election Results 2025 Counting Date, Time, Key Constituencies Live Updates :",
                    "url": "https://indianexpress.com/article/cities/delhi/delhi-election-results-2025-live-updates-election-commission-of-india-vidhan-sabha-chunav-results-9822255/",
                    "image": "https://images.indianexpress.com/2025/02/arvind-kejriwal-6.jpg",
                    "category": null
                },
        
            ]
        }
    }


  ```
#### 🔹 **Get Personalised Weather and News for a City**
- **Endpoint**: `GET /weatherAndNews/personalised` (NOTE : YOU DON'T NEED TO ADD CITY IF YOU WANT UPDATES OF THE ADDED PREFERRED CITY)
- **Description**: Fetches weather and news for the specified/preferred city.
- **Response**:
  ```json
  {
    "weather": {
        "openWeatherApi": {
            "location": {
                "city": "Connaught Place",
                "country": "IN",
                "timezone": 19800
            },
            "temperature": {
                "value": 294.21,
                "unit": "°C",
                "feelsLike": 293.05
            },
            "condition": {
                "description": "haze",
                "icon": "50d"
            },
            "wind": {
                "speed": 5.14,
                "direction": 280
            },
            "humidity": 26,
            "visibility": 5,
            "lastUpdated": "2025-02-07T11:09:44.386Z"
        },
        "weatherAPI": {
            "location": {
                "city": "New Delhi",
                "country": "India",
                "timezone": "Asia/Kolkata"
            },
            "temperature": {
                "value": 21.2,
                "unit": "°C",
                "feelsLike": 21.2
            },
            "condition": {
                "description": "Mist",
                "icon": "//cdn.weatherapi.com/weather/64x64/day/143.png"
            },
            "wind": {
                "speed": 18,
                "direction": 294
            },
            "humidity": 26,
            "visibility": 5,
            "lastUpdated": "2025-02-07T11:09:44.948Z"
        }
    },
    "news": {
        "newsApi": {
            "articles": [
                {
                    "headline": "Abstimmung in Delhi: Wahlkampf mit Besen",
                    "source": "Faz.net",
                    "publishedAt": "2025-02-04T18:05:17Z",
                    "summary": "Niemand hat Indiens Regierungschef Modi bisher so vorgeführt wie der Landeschef von Delhi, Arvind Kejriwal. Doch nach zehn Jahren sind einige Wähler von                                    ihm und seiner Partei enttäuscht. Schafft er trotzdem die Wiederwahl?",
                    "url": "https://www.faz.net/aktuell/politik/ausland/abstimmung-in-delhi-modis-kontrahent-wackelt-im-wahlkampf-110275849.html",
                    "image": "https://media1.faz.net/ppmedia/aktuell/politik/1088118842/1.10275845/facebook_teaser_fplus/ein-aergernis-fuer-die-bjp.jpg",
                    "category": null
                },
               
        "gNewsApi": {
            "articles": [
                {
                    "headline": "Delhi Vidhan Sabha Chunav/Election Result 2025 Vote Counting Date and Time, Key Constituencies",
                    "source": "The Indian Express",
                    "publishedAt": "2025-02-07T08:11:32Z",
                    "summary": "Election Commission of India (ECI), Delhi Election Results 2025 Counting Date, Time, Key Constituencies Live Updates :",
                    "url": "https://indianexpress.com/article/cities/delhi/delhi-election-results-2025-live-updates-election-commission-of-india-vidhan-sabha-chunav-results-9822255/",
                    "image": "https://images.indianexpress.com/2025/02/arvind-kejriwal-6.jpg",
                    "category": null
                },
        
            ]
        }
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
