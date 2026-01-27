# Module 4: Team Collaboration & Code Quality with AI

**Duration:** Self-paced (3-5 hours)  
**Level:** Intermediate-Advanced  
**Prerequisites:** Modules 1-3 completed

---

## Module Overview

Learn how to implement GitHub Copilot effectively across development teams. This module covers establishing team standards, maintaining code quality, knowledge sharing, and creating scalable AI-assisted workflows.

**Learning Objectives:**
- Establish team standards for AI-assisted development
- Maintain consistent code quality across the team
- Share knowledge and best practices
- Handle sensitive data and security concerns
- Measure and optimize AI productivity impact

---

## Lesson 4.1: Team Standards & Guidelines

### Creating an AI Usage Policy

**Sample Team Agreement:**

```markdown
# GitHub Copilot Usage Guidelines

## When to Use Copilot

✅ **Encouraged:**
- Boilerplate code and scaffolding
- Test case generation
- Documentation and comments
- Code refactoring suggestions
- Learning new libraries/frameworks

⚠️ **Use with Caution:**
- Business logic implementation (always review)
- API integrations (verify endpoints/authentication)
- Database queries (check for SQL injection)
- Complex algorithms (verify correctness)

❌ **Never Use AI-Generated Code Directly For:**
- Security-critical functions (auth, encryption)
- Payment processing logic
- Personal/sensitive data handling
- Regulatory compliance code

## Code Review Requirements

All AI-generated code must:
1. Be reviewed by at least one team member
2. Have accompanying tests
3. Include inline comments explaining complex logic
4. Follow team coding standards
5. Pass all security scans
```

### Consistent Configuration Across Team

**Project-Level Copilot Settings:**

Create `.vscode/settings.json` in your repository:

```json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "plaintext": false,
    "env": false,  // Don't suggest in .env files
    "secrets": false
  },
  
  "github.copilot.advanced": {
    "length": 500,
    "temperature": 0.1,  // Lower temperature for more deterministic suggestions
    "top_p": 0.95
  },
  
  // Team code style
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  },
  
  // Consistent imports
  "typescript.preferences.importModuleSpecifier": "relative",
  "javascript.preferences.importModuleSpecifier": "relative"
}
```

**Team Copilot Instructions:**

Create `.github/copilot-instructions.md`:

```markdown
# Project-Specific Copilot Guidelines

## Tech Stack
- **Backend:** Node.js with TypeScript, Express
- **Frontend:** React 18 with TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Testing:** Jest and React Testing Library

## Code Style
- Use functional components and hooks (React)
- Prefer async/await over promises .then()
- Use const for all variables unless reassignment needed
- Always include TypeScript types (no implicit any)
- Use named exports over default exports

## Naming Conventions
- Components: PascalCase (UserProfile.tsx)
- Functions: camelCase (getUserById)
- Constants: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
- Files: kebab-case (user-service.ts)

## Testing Standards
- Unit tests for all business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Minimum 80% code coverage

## Security
- Never commit API keys or secrets
- Always validate user input
- Use parameterized queries for database
- Implement rate limiting on public endpoints
```

---

## Lesson 4.2: Code Quality & Standards

### Automated Quality Checks

**Pre-Commit Hooks with Copilot:**

```javascript
// .husky/pre-commit
// Ask Copilot: "Create a pre-commit hook that runs linting, formatting, and tests"

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Run linter
echo "Running ESLint..."
npm run lint || {
  echo "❌ ESLint failed. Please fix errors before committing."
  exit 1
}

# Run formatter
echo "Running Prettier..."
npm run format:check || {
  echo "❌ Code formatting issues found. Run 'npm run format' to fix."
  exit 1
}

# Run tests
echo "Running tests..."
npm test -- --watchAll=false --coverage || {
  echo "❌ Tests failed. Please fix before committing."
  exit 1
}

# Check for secrets
echo "Checking for secrets..."
if git diff --cached --name-only | xargs grep -i "api_key\|secret\|password" --exclude=package-lock.json; then
  echo "❌ Potential secret found. Please remove before committing."
  exit 1
fi

echo "✅ All pre-commit checks passed!"
```

### Code Review Templates

**Copilot-Assisted PR Template:**

```markdown
# Pull Request Template

## Description
<!-- Use Copilot Chat: "Summarize the changes in this PR" -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## AI Assistance Used
<!-- Be transparent about Copilot usage -->
- [ ] Code generation
- [ ] Test generation
- [ ] Refactoring
- [ ] Documentation
- [ ] None

## Checklist
- [ ] Code follows team style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Tests added/updated (coverage: __%)
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] All Copilot suggestions reviewed for security

## Test Coverage
<!-- Paste coverage report -->

## Screenshots (if applicable)
```

### Style Guide Enforcement

**Use Copilot to Generate Style Guides:**

```python
# Chat: "Create a Python style guide for our data science team"

# team_style_guide.py
"""
Team Python Style Guide - Enforced Rules

This module demonstrates and enforces our team's coding standards.
Use this as a reference when writing new code or reviewing PRs.
"""

# 1. Imports Organization
# Standard library imports first
import os
import sys
from typing import List, Dict, Optional

# Third-party imports
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Local imports
from .models import UserModel
from .utils import validate_input

# 2. Type Hints (Required)
def calculate_statistics(data: List[float]) -> Dict[str, float]:
    """
    Calculate basic statistics for numerical data.
    
    Args:
        data: List of numerical values
        
    Returns:
        Dictionary with mean, median, std deviation
    """
    return {
        'mean': np.mean(data),
        'median': np.median(data),
        'std': np.std(data)
    }

# 3. Error Handling (Always include)
def load_dataset(filepath: str) -> pd.DataFrame:
    """Load dataset with proper error handling."""
    try:
        df = pd.read_csv(filepath)
        validate_input(df)
        return df
    except FileNotFoundError:
        raise FileNotFoundError(f"Dataset not found: {filepath}")
    except pd.errors.EmptyDataError:
        raise ValueError("Dataset is empty")
    except Exception as e:
        raise RuntimeError(f"Error loading dataset: {str(e)}")

# 4. Documentation (Required for all public functions)
class DataProcessor:
    """
    Process and transform datasets for machine learning pipelines.
    
    Attributes:
        scaler: Fitted StandardScaler instance
        feature_names: List of feature column names
        
    Example:
        >>> processor = DataProcessor()
        >>> X_train, X_test = processor.fit_transform(data)
    """
    pass
```

---

## Lesson 4.3: Knowledge Sharing

### Documentation Practices

**Team Knowledge Base Generation:**

```markdown
# Ask Copilot Chat:
"Create a comprehensive guide for onboarding new developers to our authentication system"

# Copilot generates:

# Authentication System Guide

## Overview
Our authentication system uses JWT tokens with refresh token rotation...

## Architecture
```
flowchart
User → Login → Auth Service → JWT Generation → Response
                    ↓
               Database Validation
```

## Getting Started

### 1. Environment Setup
\```bash
# Required environment variables
AUTH_SECRET=your-secret-key-here
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
\```

### 2. Basic Usage
\```typescript
import { AuthService } from './services/auth';

// Login
const { accessToken, refreshToken } = await AuthService.login(email, password);

// Verify token
const user = await AuthService.verifyToken(accessToken);
\```

### 3. Common Patterns
<!-- Copilot includes code examples -->

## Troubleshooting
### Issue: Token expires too quickly
**Solution:** Check JWT_EXPIRY environment variable...

## Security Best Practices
1. Never log tokens
2. Always use HTTPS
3. Implement rate limiting
...
```

### Code Examples Library

**Generate Team Code Snippets:**

```json
// .vscode/team-snippets.code-snippets
// Ask Copilot: "Create VS Code snippets for our common patterns"

{
  "API Error Handler": {
    "prefix": "api-error",
    "body": [
      "try {",
      "  ${1:// API call}",
      "} catch (error) {",
      "  if (error.response) {",
      "    // Server responded with error",
      "    const { status, data } = error.response;",
      "    throw new APIError(status, data.message);",
      "  } else if (error.request) {",
      "    // Request made but no response",
      "    throw new NetworkError('No response from server');",
      "  } else {",
      "    // Error setting up request",
      "    throw new Error(error.message);",
      "  }",
      "}"
    ],
    "description": "Standard API error handling pattern"
  },
  
  "React Custom Hook": {
    "prefix": "use-hook",
    "body": [
      "import { useState, useEffect } from 'react';",
      "",
      "export function use${1:HookName}() {",
      "  const [data, setData] = useState(${2:null});",
      "  const [loading, setLoading] = useState(true);",
      "  const [error, setError] = useState(null);",
      "  ",
      "  useEffect(() => {",
      "    ${3:// Fetch data}",
      "  }, []);",
      "  ",
      "  return { data, loading, error };",
      "}"
    ],
    "description": "React custom hook template"
  }
}
```

---

## Lesson 4.4: Security & Sensitive Data

### Handling Secrets Safely

**Best Practices:**

```javascript
// ❌ BAD: Copilot might suggest hardcoded secrets
const API_KEY = "sk_live_abc123...";

// ✅ GOOD: Always use environment variables
const API_KEY = process.env.STRIPE_API_KEY;

if (!API_KEY) {
  throw new Error('STRIPE_API_KEY environment variable is required');
}
```

**Configure Copilot to Avoid Secrets:**

```json
// .copilot/settings.json
{
  "excludePatterns": [
    "**/.env*",
    "**/secrets/**",
    "**/*.key",
    "**/*.pem",
    "**/config/credentials.yml"
  ],
  
  "securityScanning": {
    "enabled": true,
    "blockSuggestionsWithSecrets": true
  }
}
```

### Security Review Checklist

```python
# Use Copilot Chat to generate security checklist:
"Create a security review checklist for Python web applications"

# Copilot generates:

SECURITY_CHECKLIST = {
    "Authentication": [
        "Password hashing (bcrypt/argon2)",
        "Multi-factor authentication",
        "Session management",
        "Token expiration",
    ],
    
    "Input Validation": [
        "SQL injection prevention",
        "XSS protection",
        "CSRF tokens",
        "File upload validation",
    ],
    
    "Data Protection": [
        "Encryption at rest",
        "Encryption in transit (TLS)",
        "PII handling compliance",
        "Secure backup procedures",
    ],
    
    "Access Control": [
        "Role-based access control",
        "Principle of least privilege",
        "API rate limiting",
        "IP whitelisting where appropriate",
    ]
}
```

---

## Practical Exercises

### Exercise 4.1: Create Team Guidelines

**Task:** Develop comprehensive Copilot guidelines for your team

**Deliverables:**
1. AI usage policy document
2. `.copilot-instructions.md` file
3. Code review checklist
4. Security guidelines

**Time:** 1-2 hours

### Exercise 4.2: Implement Quality Gates

**Challenge:** Set up automated quality checks

**Requirements:**
1. Pre-commit hooks
2. PR template with AI disclosure
3. Automated test coverage checks
4. Security scanning integration

### Exercise 4.3: Knowledge Base Creation

**Project:** Build a searchable knowledge base

**Tasks:**
1. Document common patterns with Copilot
2. Create code snippet library
3. Generate troubleshooting guide
4. Build onboarding documentation

---

## Module Summary

🎯 **Key Takeaways:**

1. **Team standards** ensure consistent Copilot usage
2. **Quality gates** maintain high code quality
3. **Knowledge sharing** amplifies AI productivity benefits
4. **Security practices** prevent sensitive data exposure
5. **Measurement** tracks AI impact on team velocity

### Team Productivity Metrics

Teams using Copilot effectively report:
- **55%** faster development velocity
- **35%** reduction in code review time
- **45%** faster onboarding for new developers
- **30%** reduction in bugs reaching production

### Next Steps

Module 5 explores:
- No-code and low-code AI automation
- Workflow automation strategies
- AI for non-developers
- Productivity tools integration

**Before Module 5:**
- [ ] Implement team guidelines
- [ ] Set up quality gates
- [ ] Create code snippet library
- [ ] Conduct team Copilot training

---

**Estimated Completion Time:** 3-5 hours
