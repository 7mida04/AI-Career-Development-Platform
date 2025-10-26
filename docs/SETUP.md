# Setup Guide

## Complete Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Python** 3.8 or higher ([Download](https://www.python.org/))
- **pip** (comes with Python)
- **Git** ([Download](https://git-scm.com/))

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd "projet 2"
```

### 2. Frontend Setup

#### Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Radix UI components
- And more...

#### Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Run Development Server

```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### 3. Backend Setup

#### Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- FastAPI
- Uvicorn
- Groq AI
- BeautifulSoup4
- PyPDF2
- And other dependencies

#### Configure API Keys

The backend uses Groq API for AI-powered features. You have two options:

**Option 1: Hardcode in backend.py (Current Setup)**
The API keys are currently in the code. For production, move them to environment variables.

**Option 2: Use Environment Variables (Recommended)**

1. Create a `.env` file in the root directory
2. Add your Groq API keys (get them from [console.groq.com](https://console.groq.com/))
3. Update `backend.py` to read from environment variables

#### Run Backend Server

```bash
uvicorn backend:app --reload
```

The backend will be available at [http://localhost:8000](http://localhost:8000)

You can view the auto-generated API docs at:
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 4. Verify Setup

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Try uploading a CV
3. Check if job recommendations work
4. Test the Coursera course search
5. Explore UM6P programs

### 5. Common Issues and Solutions

#### Port Already in Use

**Frontend (Port 3000):**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

**Backend (Port 8000):**
```bash
# Find and kill process
lsof -ti:8000 | xargs kill -9
# Or use a different port
uvicorn backend:app --reload --port 8001
```

#### Module Not Found Errors

**Frontend:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Backend:**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### CORS Issues

If you encounter CORS errors:
1. Ensure backend is running
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify CORS middleware in `backend.py` allows your frontend origin

#### PDF Upload Not Working

1. Check file size (keep under 10MB)
2. Ensure backend has write permissions
3. Verify PyPDF2 is installed correctly

### 6. Development Workflow

#### Making Changes

1. **Frontend changes**: Hot-reload is enabled, changes appear automatically
2. **Backend changes**: Uvicorn's `--reload` flag auto-restarts the server

#### Adding New Dependencies

**Frontend:**
```bash
npm install <package-name>
```

**Backend:**
```bash
pip install <package-name>
pip freeze > requirements.txt
```

### 7. Production Build

#### Frontend

```bash
npm run build
npm start
```

#### Backend

```bash
uvicorn backend:app --host 0.0.0.0 --port 8000
```

For production deployment, consider using:
- **Frontend**: Vercel, Netlify, or Docker
- **Backend**: Docker, AWS EC2, or a Python hosting service

### 8. Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### 9. Getting Help

If you encounter issues:
1. Check the error message carefully
2. Verify all prerequisites are installed
3. Ensure environment variables are set correctly
4. Check the API documentation in `docs/API.md`
5. Look for similar issues in the project's issue tracker

---

## Quick Start Commands

```bash
# Terminal 1: Frontend
npm install
npm run dev

# Terminal 2: Backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend:app --reload
```

That's it! You should now have both frontend and backend running. 🎉
