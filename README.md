# Weather and News Aggregator API

The **Weather and News Aggregator API** retrieves real-time weather data and news for a given city, consolidating information from multiple sources.

## 🌐 Base URL
```
https://weather-and-news-aggregator-4f2mvhpqx.vercel.app

```


## 📌 **How to Use the API**
1. **Register & Login** to get your JWT token.
2. **Save your preferences** (city, category, language, etc.).
3. **Use the `/weather-news` endpoint** to get real-time data.
4. **Update or delete** preferences as needed.



## 🔐 Authentication
Some routes require authentication using JWT. You need to register and log in to obtain a token.

---

## 📌 Endpoints

### 📝 **User Authentication**
#### 1️⃣ Register a User
**Endpoint:** `POST /auth/register`  
Registers a new user.

**Request Body (JSON):**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**
```json
{
  "message": "Registration successful! Please log in to get your authorization token.",
  "user": {
    "id": 1,
    "username": "your_username"
  }
}
```

---

#### 2️⃣ User Login
**Endpoint:** `POST /auth/login`  
Logs in a user and returns a JWT token which remains valid for 10 minutes.

**Request Body (JSON):**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "your_jwt_token"
}
```

---

#### 3️⃣ Delete User Account
**Endpoint:** `DELETE /user/delete`  
Deletes the authenticated user.

**Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

**Response:**
```json
{
  "message": "User deleted successfully!"
}
```

---

### 🌎 **Weather & News Data**
#### 4️⃣ Get Weather and News
**Endpoint:** `GET /weatherAndNews`  
Fetches current weather and latest news for a given city.

**Query Parameters:**  
- `city` (required): Name of the city.

**Example Request:**
```
GET /weatherAndNews?city=Delhi
```

**Response Example:**
```json
{
    "weather": {
        "openWeatherApi": {
            "location": {
                "city": "Delhi",
                "country": "IN",
                "timezone": 19800
            },
            "temperature": {
                "value": 291.18,
                "unit": "°C",
                "feelsLike": 289.98
            },
            "condition": {
                "description": "haze",
                "icon": "50d"
            },
            "wind": {
                "speed": 5.66,
                "direction": 280
            },
            "humidity": 36,
            "visibility": 4,
            "lastUpdated": "2025-02-07T05:57:50.145Z"
        },
        "weatherAPI": {
            "location": {
                "city": "New Delhi",
                "country": "India",
                "timezone": "Asia/Kolkata"
            },
            "temperature": {
                "value": 18.2,
                "unit": "°C",
                "feelsLike": 18.2
            },
            "condition": {
                "description": "Mist",
                "icon": "//cdn.weatherapi.com/weather/64x64/day/143.png"
            },
            "wind": {
                "speed": 20.9,
                "direction": 302
            },
            "humidity": 37,
            "visibility": 4,
            "lastUpdated": "2025-02-07T05:57:50.756Z"
        }
    },
    "news": {
        "newsApi": {
            "articles": [
                {
                    "headline": "Abstimmung in Delhi: Wahlkampf mit Besen",
                    "source": "Faz.net",
                    "publishedAt": "2025-02-04T18:05:17Z",
                    "summary": "Niemand hat Indiens Regierungschef Modi bisher so vorgeführt wie der Landeschef von Delhi, Arvind Kejriwal. Doch nach zehn Jahren sind einige Wähler von ihm und seiner Partei enttäuscht. Schafft er trotzdem die Wiederwahl?",
                    "url": "https://www.faz.net/aktuell/politik/ausland/abstimmung-in-delhi-modis-kontrahent-wackelt-im-wahlkampf-110275849.html",
                    "image": "https://media1.faz.net/ppmedia/aktuell/politik/1088118842/1.10275845/facebook_teaser_fplus/ein-aergernis-fuer-die-bjp.jpg",
                    "category": null
                },
               
               
            ]
        },
        "gNewsApi" : {
            "articles": [
                {
                    "headline": "Air India once gifted painter Salvador Dali a baby elephant. Here’s why",
                    "source": "Firstpost",
                    "publishedAt": "2025-02-07T03:36:04Z",
                    "summary": "Organised by Bruno Art Group, an exhibition titled ‘Dali Comes to India’ will feature Salvador Dali’s works in New Delhi starting today. In 1967, Air India gifted the surrealist painter a two-year-old elephant, which was flown from Bengaluru to Geneva. From there, the baby elephant was transported by truck to Cadaques in Spain, where Dali lived. Here’s why he was gifted an elephant by the airline",
                    "url": "https://www.firstpost.com/explainers/salvador-dali-exhibition-new-delhi-air-india-baby-elephant-gift-ashtray-connection-13860346.html",
                    "image": "https://images.firstpost.com/uploads/2025/02/Untitled-design-18-2025-02-dd3bc35f094b886e3d826cfa606dbf61.jpg?im=FitAndFill=(1200,675)",
                    "category": null
                },
            ]
            
        }
    }
}
```

**Endpoint:** `GET /weatherAndNews/personalised`  
Fetches current weather and latest news for the saved city and based on the saved preferences.
**Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

**Query Parameters:**  
- `city` (optional): Name of the city.

**Example Request:**
```
GET /weatherAndNews/personalised
```

**Response Example:**  Same as above just with incorporating user preferences 

---

### 🔧 **User Preferences**
#### 5️⃣ Save User Preferences
**Endpoint:** `POST /user/preferences`  
Saves user preferences for personalised weather and news.

**Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

**Request Body:**
```json
{
  "preferredCity": "Delhi",
  "preferredCategory": "Technology",
  "language": "English",
  "country": "India"
}
```

**Response:**
```json
{
  "message": "Preferences saved successfully!"
}
```

---

#### 6️⃣ Update User Preferences
**Endpoint:** `PUT /user/preferences`  
Updates user preferences.

**Headers:** 
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

**Request Body:** Only the parameters which you want to update 
```json
{
  "preferredCity": "Delhi",
  "preferredCategory": "Technology",

}
```

**Response:**
```json
{
  "message": "Preferences updated successfully!"
}
```

---

#### 7️⃣ Delete User Preferences
**Endpoint:** `DELETE /user/preferences/delete`  
Deletes user preferences.

**Headers:** Same as above.

**Response:**
```json
{
  "message": "User preferences deleted successfully!"
}
```

---

### 🗑️ **Cache Management (Redis)**
#### 8️⃣ Delete Weather and News Cache
**Endpoint:** `DELETE /weatherAndNews/clear-cache`  
Clears cached weather and news data for the city if specified otherwise all cache.

**Query Parameters:**  
- `city` (optional): Name of the city.


**Response:** (If city is not specified)
```json
{
  "message": "Redis cache cleared successfully!"
}
```

**Response:** (If city is specified)
```json
{
  "message": "Cache cleared for city: ${city}"
}
```

---

## 🛠 **Tech Stack**
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: JWT + bcrypt
- **Caching**: Upstash Redis
- **Deployment**: Vercel  


