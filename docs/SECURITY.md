# Security Notice

## ⚠️ IMPORTANT: API Keys Exposed

The `backend.py` file currently contains **hardcoded API keys**. These should be moved to environment variables before pushing to GitHub.

### Immediate Action Required

1. **Remove hardcoded API keys** from `backend.py`
2. **Move keys to environment variables**
3. **Use `.env` file** for local development (already in .gitignore)
4. **Rotate exposed keys** on Groq console

### Steps to Secure API Keys

#### 1. Create a `.env` file (already gitignored)

```env
GROQ_API_KEY_JOB_RECOMMENDATION=your_groq_api_key_here
GROQ_API_KEY_SUMMARIZE=your_groq_api_key_here
GROQ_API_KEY_CAREER=your_groq_api_key_here
GROQ_API_KEY_PROFILE=your_groq_api_key_here
GROQ_API_KEY_COURSES=your_groq_api_key_here
GROQ_API_KEY_COURSERA=your_groq_api_key_here
GROQ_API_KEY_PDF=your_groq_api_key_here
GROQ_API_KEY_SCRAPE=your_groq_api_key_here
```

#### 2. Update `backend.py`

Replace the hardcoded `api_keys` dictionary with:

```python
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class UM6PCareerAdvisor:
    api_keys = {
        "get_job_recommendation": os.getenv("GROQ_API_KEY_JOB_RECOMMENDATION"),
        "summarize_job_description": os.getenv("GROQ_API_KEY_SUMMARIZE"),
        "get_career_recommendation": os.getenv("GROQ_API_KEY_CAREER"),
        "extract_profile_info": os.getenv("GROQ_API_KEY_PROFILE"),
        "recommend_courses": os.getenv("GROQ_API_KEY_COURSES"),
        "search_coursera_courses": os.getenv("GROQ_API_KEY_COURSERA"),
        "extract_text_from_pdf": os.getenv("GROQ_API_KEY_PDF"),
        "scrape_programs": os.getenv("GROQ_API_KEY_SCRAPE")
    }
```

#### 3. Rotate API Keys

Go to [Groq Console](https://console.groq.com/) and:
1. Generate new API keys
2. Update your `.env` file
3. Delete the old keys

### Best Practices

- ✅ Never commit API keys to version control
- ✅ Use environment variables for secrets
- ✅ Add `.env` to `.gitignore` (already done)
- ✅ Use `.env.example` as a template (already created)
- ✅ Rotate keys if accidentally exposed
- ✅ Use different keys for development and production

### Additional Security Recommendations

1. **Add rate limiting** to prevent API abuse
2. **Implement authentication** for your API endpoints
3. **Use HTTPS** in production
4. **Validate and sanitize** all user inputs
5. **Add logging** for security monitoring
6. **Keep dependencies updated** regularly

### GitHub Scanning

GitHub has secret scanning that will alert you if you push API keys. To prepare:

1. Remove keys from backend.py **before** initial commit
2. If already committed, use git history rewrite (see below)

### If Keys Already Committed

If you've already committed the keys to git:

```bash
# WARNING: This rewrites git history
# Make a backup first!

# Remove the file from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend.py" \
  --prune-empty --tag-name-filter cat -- --all

# Or use git-filter-repo (recommended)
git filter-repo --path backend.py --invert-paths

# Force push (be careful!)
git push origin --force --all
```

**Better approach:** Just rotate the keys and commit the fixed version.

---

## Current Status

- ✅ `.gitignore` includes `.env` files
- ✅ `.env.example` created as template
- ⚠️ **API keys still hardcoded in backend.py**
- ❌ Need to move keys to environment variables

## Next Steps

Before pushing to GitHub:
1. [ ] Move API keys to `.env` file
2. [ ] Update `backend.py` to read from environment
3. [ ] Rotate all exposed keys
4. [ ] Test that everything works with new setup
5. [ ] Double-check no secrets in git history
