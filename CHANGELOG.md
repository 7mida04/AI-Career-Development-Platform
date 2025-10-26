# Changelog

All notable changes to the Career AI project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive README with project overview and features
- API documentation in `docs/API.md`
- Setup guide in `docs/SETUP.md`
- Security documentation in `docs/SECURITY.md`
- Contributing guidelines in `CONTRIBUTING.md`
- Python `requirements.txt` for backend dependencies
- `.env.example` file for environment variables template
- `.gitattributes` for consistent line endings
- MIT License file

### Changed
- Updated `.gitignore` to include Python cache files
- Improved project structure and organization

### Removed
- Duplicate configuration files (next.config.js, postcss.config.mjs, tailwind.config.js)
- Kept TypeScript versions of config files for consistency

### Security
- Documented API key security concerns in `docs/SECURITY.md`
- Added recommendations for environment variable usage

## [0.1.0] - 2025-01-XX

### Initial Release

#### Features
- CV upload and analysis with AI-powered profile extraction
- Job recommendations based on CV content
- Coursera course search integration
- UM6P executive education program finder
- Modern Next.js 15 frontend with TypeScript
- FastAPI backend with Groq AI integration
- Responsive UI with Tailwind CSS and Radix UI
- Profile management system

#### Tech Stack
- Frontend: Next.js 15, React 18, TypeScript, Tailwind CSS
- Backend: FastAPI, Python, Groq AI
- UI Components: Radix UI, Lucide Icons
- Web Scraping: BeautifulSoup4
- PDF Processing: PyPDF2

---

## Version History

- **0.1.0** - Initial release with core features
- **Unreleased** - Current development version

## Upgrade Notes

When upgrading between versions, check the "Changed" and "Security" sections for breaking changes and important updates.
