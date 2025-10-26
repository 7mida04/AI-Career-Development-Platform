# Contributing to Career AI

Thank you for considering contributing to Career AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, Python version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** and **motivation**
- **Possible implementation** approach
- **Examples** from other projects if applicable

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit** with clear messages:
   ```bash
   git commit -m "Add: feature description"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request** with a clear description

## Development Guidelines

### Code Style

#### TypeScript/React
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use functional components
- Keep components small and focused
- Use meaningful variable and function names

#### Python
- Follow PEP 8 style guide
- Use type hints where applicable
- Write docstrings for functions and classes
- Keep functions focused and modular

### Commit Messages

Format: `<type>: <description>`

Types:
- `Add:` New features
- `Fix:` Bug fixes
- `Update:` Updates to existing features
- `Refactor:` Code refactoring
- `Docs:` Documentation changes
- `Style:` Code style changes (formatting)
- `Test:` Adding or updating tests

Examples:
```
Add: CV upload validation
Fix: Job recommendation API error handling
Update: Improve course search algorithm
Docs: Add API endpoint documentation
```

### Testing

- Test your changes locally before submitting
- Ensure both frontend and backend work together
- Check for console errors and warnings
- Test on different screen sizes (responsive design)

### Documentation

- Update README.md if needed
- Add/update API documentation for new endpoints
- Comment complex code sections
- Update SETUP.md for new dependencies

## Project Structure

```
career-ai/
├── app/                    # Next.js pages and components
│   ├── actions/           # Server actions
│   ├── components/        # React components
│   └── [pages]/           # Route pages
├── lib/                   # Utility functions
├── public/                # Static assets
├── backend.py             # FastAPI backend
├── docs/                  # Documentation
└── README.md              # Main documentation
```

## Areas for Contribution

### High Priority
- [ ] Add unit tests for backend endpoints
- [ ] Implement user authentication
- [ ] Add database support for user profiles
- [ ] Improve error handling and validation
- [ ] Add loading states and better UX feedback

### Medium Priority
- [ ] Add more job search sources
- [ ] Expand course provider integrations
- [ ] Improve AI prompt engineering
- [ ] Add PDF generation for reports
- [ ] Implement caching for API responses

### Low Priority
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Advanced filtering options
- [ ] Export functionality (CV, recommendations)
- [ ] Social sharing features

## Getting Help

- Check the [SETUP.md](./SETUP.md) for setup instructions
- Review [API.md](./API.md) for API documentation
- Open an issue for questions or discussion
- Tag maintainers for urgent issues

## Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes
- Project documentation

---

Thank you for contributing to Career AI! 🚀
