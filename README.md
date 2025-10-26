# Career AI - Intelligent Career Development Platform

An AI-powered career development platform that helps users discover career opportunities, get personalized job recommendations, and find relevant courses based on their CV. Built with Next.js and FastAPI, integrating with UM6P career resources and Coursera courses.

## 🌟 Features

- **CV Upload & Analysis**: Upload your CV (PDF) and get intelligent profile extraction
- **AI-Powered Job Recommendations**: Get personalized job recommendations based on your profile
- **Smart Job Search**: Search for jobs with detailed descriptions and requirements
- **Course Recommendations**: Discover relevant Coursera courses aligned with your career goals
- **UM6P Program Finder**: Access specialized programs from UM6P across various themes
- **Profile Management**: Create and manage your professional profile
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and Radix UI

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend
- **FastAPI** - Modern Python web framework
- **Groq AI** - AI-powered text processing and recommendations
- **BeautifulSoup4** - Web scraping for job data
- **PyPDF2** - PDF text extraction
- **CORS Middleware** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Groq API keys

## 🚀 Getting Started

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables (see `.env.example`)

3. Run the FastAPI server:
```bash
uvicorn backend:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000)

## 📁 Project Structure

```
career-ai/
├── app/                      # Next.js app directory
│   ├── actions/             # Server actions
│   ├── components/          # React components
│   │   └── ui/             # UI components
│   ├── coursera/           # Coursera courses page
│   ├── formations/         # UM6P programs page
│   ├── job-results/        # Job search results
│   ├── landing-page/       # Landing page
│   ├── profile/            # User profile
│   └── upload-cv/          # CV upload functionality
├── lib/                     # Utility functions
├── public/                  # Static assets
├── backend.py              # FastAPI backend server
└── README.md               # This file
```

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For backend, configure your Groq API keys in the appropriate section.

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `uvicorn backend:app --reload` - Start development server
- `uvicorn backend:app` - Start production server

## 🎯 Key Features Explained

### CV Analysis
Upload your CV and the AI will extract:
- Personal information
- Skills and competencies
- Work experience
- Education background
- Career objectives

### Job Recommendations
Based on your profile, the system recommends:
- Relevant job titles
- Job descriptions from major portals
- Required skills and qualifications

### UM6P Programs
Access specialized executive education programs in:
- Agriculture
- Digital (AI, Data Science, Cybersecurity)
- Renewable Energy
- Geology & Mining
- Industry 4.0
- And more...

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and intended for educational purposes.

## 🙏 Acknowledgments

- UM6P Executive Education for program data
- Groq AI for intelligent recommendations
- Coursera for course information
- Next.js and FastAPI communities

## 📞 Support

For questions and support, please open an issue in the repository.

---

Built with ❤️ using Next.js and FastAPI
