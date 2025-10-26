# API Documentation

## Base URL
```
http://localhost:8000
```

## Endpoints

### 1. Upload and Analyze CV
**Endpoint:** `POST /upload-cv`

**Description:** Upload a PDF CV and extract profile information using AI.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: 
  - `file`: PDF file

**Response:**
```json
{
  "success": true,
  "profile": {
    "name": "John Doe",
    "email": "john@example.com",
    "skills": ["Python", "JavaScript", "React"],
    "experience": "5 years",
    "education": "Master's Degree"
  },
  "text": "extracted CV text"
}
```

---

### 2. Get Job Recommendations
**Endpoint:** `POST /job-recommendation`

**Description:** Get AI-powered job recommendations based on CV text.

**Request:**
```json
{
  "cv_text": "Your CV text here..."
}
```

**Response:**
```json
{
  "job_title": "Full Stack Developer",
  "jobs": [
    {
      "title": "Senior Full Stack Developer",
      "company": "Tech Corp",
      "description": "Job description here...",
      "url": "https://..."
    }
  ]
}
```

---

### 3. Search Coursera Courses
**Endpoint:** `POST /search-coursera`

**Description:** Search for relevant Coursera courses.

**Request:**
```json
{
  "query": "Python programming"
}
```

**Response:**
```json
{
  "courses": [
    {
      "title": "Python for Everybody",
      "provider": "University of Michigan",
      "url": "https://...",
      "description": "Course description..."
    }
  ]
}
```

---

### 4. Get Course Recommendations
**Endpoint:** `POST /recommend-courses`

**Description:** Get personalized course recommendations based on profile.

**Request:**
```json
{
  "profile": {
    "skills": ["Python", "Data Science"],
    "interests": ["Machine Learning"]
  }
}
```

**Response:**
```json
{
  "recommended_courses": [
    {
      "title": "Machine Learning Specialization",
      "relevance": "High",
      "reason": "Matches your interest in ML"
    }
  ]
}
```

---

### 5. Get UM6P Programs
**Endpoint:** `GET /um6p-programs/{theme}`

**Description:** Get UM6P executive education programs by theme.

**Available Themes:**
- Agriculture
- Digital: AI, Data Science, Cybersecurity & Cloud Computing
- Energie Renouvelable
- Géologie et Exploitation Minière
- HSE, Wellbeing & Sciences de la Santé
- Industrie 4.0
- Innovation Urbaine et Territoriale
- Process Engineering
- Science des Matériaux et Nanotechnologie
- Sciences de l'éducation
- Sciences des Eaux
- Sustainability

**Response:**
```json
{
  "theme": "Digital",
  "programs": [
    {
      "title": "AI & Data Science Certificate",
      "duration": "6 months",
      "description": "...",
      "url": "https://..."
    }
  ]
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "detail": "Error message here"
}
```

**Common Status Codes:**
- 200: Success
- 400: Bad Request
- 404: Not Found
- 422: Validation Error
- 500: Internal Server Error

---

## Rate Limiting

Currently, there are no rate limits implemented. However, please use the API responsibly to avoid overwhelming the Groq AI service.

---

## CORS

The API allows requests from all origins (`*`). In production, this should be restricted to your frontend domain.
