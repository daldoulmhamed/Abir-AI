# GitHub Copilot Quick Start Guide

**Get Up and Running in 15 Minutes**

---

## ⚡ Installation (5 min)

### Step 1: Get GitHub Copilot
```bash
# Option 1: Start free trial
# Visit: https://github.com/features/copilot
# Click "Start free trial" → Sign in → Accept permissions

# Option 2: Activate with existing subscription
# Already have Copilot? Just install the extension below
```

### Step 2: Install Extension

**VS Code:**
```bash
# Install via Command Palette (Ctrl+Shift+P / Cmd+Shift+P):
> Extensions: Install Extensions
# Search: "GitHub Copilot"
# Click Install
```

**JetBrains:**
```bash
# Settings/Preferences → Plugins
# Search: "GitHub Copilot"
# Click Install → Restart IDE
```

### Step 3: Verify Installation
```bash
# VS Code: Check bottom right status bar for Copilot icon
# Should show: ✓ GitHub Copilot (green checkmark)

# If not working: Ctrl+Shift+P → "GitHub Copilot: Sign In"
```

---

## 🚀 Essential Keyboard Shortcuts

### Code Suggestions
| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Accept suggestion | `Tab` | `Tab` |
| Reject suggestion | `Esc` | `Esc` |
| Next suggestion | `Alt+]` | `Option+]` |
| Previous suggestion | `Alt+[` | `Option+[` |
| Show all suggestions | `Ctrl+Enter` | `Cmd+Return` |

### Copilot Chat
| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Open Chat | `Ctrl+Shift+I` | `Cmd+Shift+I` |
| Inline Chat | `Ctrl+I` | `Cmd+I` |
| Quick Chat | `Ctrl+Shift+Alt+L` | `Cmd+Shift+Option+L` |

---

## 💬 Copilot Chat Commands

### Slash Commands (Type in Chat)
```bash
/explain      # Explain selected code
/fix          # Fix bugs in selection
/tests        # Generate tests
/doc          # Add documentation
/optimize     # Optimize performance
/new          # Scaffold new code
```

### Chat Participants (Type @ in Chat)
```bash
@workspace    # Ask about entire workspace
@vscode       # VS Code API questions
@terminal     # Terminal command help
```

### Example Usage:
```bash
# In Copilot Chat:
/tests         # Generate tests for selected function
@workspace what files handle authentication?
/fix           # Fix the bug in selected code
```

---

## 📝 Prompt Engineering Templates

### 1. Function Generation
```javascript
// Create a function that [SPECIFIC TASK]
// Input: [DESCRIBE INPUT]
// Output: [DESCRIBE OUTPUT]
// Handle edge cases: [LIST CASES]
```

**Example:**
```javascript
// Create a function that validates email addresses
// Input: string (email)
// Output: boolean (true if valid)
// Handle edge cases: null, undefined, special characters
```

### 2. API Integration
```python
# Create a [METHOD] endpoint for [RESOURCE]
# Route: [URL PATH]
# Request body: [FIELDS]
# Response: [FORMAT]
# Error handling: [SCENARIOS]
```

**Example:**
```python
# Create a POST endpoint for user registration
# Route: /api/users/register
# Request body: email, password, username
# Response: JSON with userId and token
# Error handling: duplicate email, weak password
```

### 3. Test Generation
```typescript
// Generate unit tests for the following function
// Test cases:
// 1. [NORMAL CASE]
// 2. [EDGE CASE 1]
// 3. [ERROR CASE]
// Use [TESTING FRAMEWORK]
```

**Example:**
```typescript
// Generate unit tests for the calculateTotal function
// Test cases:
// 1. Valid items array
// 2. Empty array
// 3. Null or undefined input
// Use Jest
```

### 4. Refactoring
```javascript
// Refactor this code to:
// - [IMPROVEMENT 1]
// - [IMPROVEMENT 2]
// - Keep same functionality
```

**Example:**
```javascript
// Refactor this code to:
// - Use async/await instead of callbacks
// - Add error handling
// - Keep same functionality
```

---

## 🎯 First 3 Things to Try

### 1. Generate a Function (2 min)
```javascript
// 1. Create a new file: quickstart.js
// 2. Type this comment:
// Function to calculate fibonacci sequence up to n terms

// 3. Press Enter and wait
// Copilot will suggest the complete function!
// Press Tab to accept
```

### 2. Ask Copilot Chat (2 min)
```bash
# 1. Open Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
# 2. Type: "Create a React button component with hover effect"
# 3. Copilot will generate the component
# 4. Click "Insert at Cursor" or "Copy"
```

### 3. Fix a Bug (2 min)
```python
# 1. Write intentionally buggy code:
def divide(a, b):
    return a / b  # Bug: No zero division check

# 2. Select the code
# 3. Open Chat: Type "/fix"
# 4. Copilot will suggest the fix!
```

---

## 🔥 Power User Tips

### Tip 1: Use Comments as Instructions
```javascript
// Instead of this:
function calculate() {
  // ...code...
}

// Do this:
// Calculate monthly payment with:
// - Loan amount
// - Interest rate (annual)
// - Loan term (months)
// - Return formatted currency string

// Copilot generates more accurate code!
```

### Tip 2: Provide Context
```typescript
// Context helps Copilot understand your needs:

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

// Now generate a function to validate user permissions
// Copilot knows about the User interface!
```

### Tip 3: Iterate on Suggestions
```bash
# Don't accept the first suggestion blindly
# 1. View multiple options: Ctrl+Enter / Cmd+Return
# 2. Choose the best one
# 3. Or reject all and rephrase your comment
```

### Tip 4: Chain Suggestions
```python
# Generate related code step by step:

# 1. First, create the model
class BlogPost:
    # Copilot generates model fields

# 2. Then create the service
class BlogService:
    # Copilot generates CRUD methods

# 3. Finally, create the API
@app.route('/posts')
def list_posts():
    # Copilot generates endpoint logic
```

---

## 🐛 Troubleshooting

### Copilot Not Working?

**Issue 1: No Suggestions**
```bash
# Check 1: Is Copilot enabled?
# - Look for icon in bottom right (VS Code)
# - Should show green checkmark

# Check 2: Are you signed in?
# - Ctrl+Shift+P → "GitHub Copilot: Sign In"

# Check 3: Is file type supported?
# - Copilot works best with common languages
# - Check: https://github.com/github/copilot-docs/blob/main/docs/faq.md
```

**Issue 2: Poor Suggestions**
```bash
# Fix 1: Provide more context
# - Add comments explaining what you want
# - Include type definitions
# - Reference existing functions

# Fix 2: Check your prompt
# - Be specific, not vague
# - Include examples if needed
# - Mention edge cases
```

**Issue 3: Slow Responses**
```bash
# Cause: Network latency or file too large
# Fix 1: Check internet connection
# Fix 2: Break large files into smaller modules
# Fix 3: Disable other extensions temporarily
```

### Common Errors

**Error: "Copilot is not available"**
```bash
Solution: Check subscription status
→ Visit: https://github.com/settings/copilot
→ Verify active subscription
```

**Error: "Rate limit exceeded"**
```bash
Solution: Wait a few minutes
→ Copilot has usage limits to prevent abuse
→ Limits reset automatically
```

---

## 📊 Productivity Hacks

### Hack 1: Template Files
```javascript
// Create template.js with common patterns:

// API endpoint template
// [METHOD] /api/[resource]
// Authenticated: [yes/no]
// Returns: [response format]

// Reuse this comment pattern for consistency!
```

### Hack 2: Snippet Library
```bash
# Create .copilot-prompts folder
# Save your best prompts as templates

# Example: error-handler.txt
"Create error middleware with:
- Custom error classes
- Logger integration
- Client-friendly messages
- Stack trace in dev only"
```

### Hack 3: Keyboard Maestro
```bash
# Set up custom shortcuts:
# 1. Ctrl+Shift+G → "/tests" in Chat
# 2. Ctrl+Shift+D → "/doc" in Chat
# 3. Ctrl+Shift+E → "/explain" in Chat

# Saves tons of time!
```

### Hack 4: Pair with AI
```bash
# Work session flow:
# 1. Write comment describing feature
# 2. Let Copilot generate skeleton
# 3. Use Chat to refine details
# 4. Generate tests with /tests
# 5. Add docs with /doc

# 10x productivity boost!
```

---

## 📚 Language-Specific Tips

### JavaScript/TypeScript
```typescript
// Use TypeScript types for better suggestions
interface Product {
  id: number;
  name: string;
  price: number;
}

// Copilot understands types!
function calculateTotal(products: Product[])
```

### Python
```python
# Use type hints
from typing import List, Dict, Optional

def process_data(
    items: List[Dict[str, any]],
    filter_key: Optional[str] = None
) -> List[Dict[str, any]]:
    # Copilot generates better code with types
```

### React
```jsx
// Describe component behavior in comments
// Button component with:
// - Loading state
// - Disabled state  
// - Click handler
// - Custom className support

export default function Button() {
  // Copilot generates complete component!
}
```

---

## 🎓 Learning Path

### Week 1: Basics
- [ ] Install and configure Copilot
- [ ] Learn keyboard shortcuts
- [ ] Generate 10 functions
- [ ] Try all slash commands
- [ ] Complete Module 1

### Week 2: Intermediate
- [ ] Use Copilot Chat for complex tasks
- [ ] Generate tests for existing code
- [ ] Refactor legacy code
- [ ] Complete Modules 2-3

### Week 3: Advanced
- [ ] Build full feature with Copilot
- [ ] Create custom workflows
- [ ] Optimize prompts
- [ ] Complete Modules 4-6

---

## 🔗 Essential Resources

**Official Docs:**
- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [VS Code Copilot Guide](https://code.visualstudio.com/docs/copilot/overview)
- [Best Practices](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/)

**Community:**
- [GitHub Copilot Discussions](https://github.com/orgs/community/discussions/categories/copilot)
- [Reddit r/github](https://reddit.com/r/github)
- [Discord Community](https://discord.gg/github)

**Learning:**
- [Copilot YouTube Channel](https://www.youtube.com/@GitHub)
- [Official Blog](https://github.blog/tag/copilot/)
- [Example Repository](https://github.com/github/copilot-demo)

---

## ✅ Daily Checklist

**Morning Routine:**
- [ ] Start Copilot in your IDE
- [ ] Review yesterday's AI-generated code
- [ ] Plan today's features with Chat

**During Development:**
- [ ] Use comments for complex logic
- [ ] Generate tests as you code
- [ ] Refactor with `/optimize`
- [ ] Document with `/doc`

**End of Day:**
- [ ] Review Copilot acceptance rate
- [ ] Save useful prompts
- [ ] Note what worked well

---

## 🚀 Next Steps

**You're Ready!** Start with these:

1. **[Generate Your First Function](#-first-3-things-to-try)** (2 min)
2. **[Try Copilot Chat](#copilot-chat-commands)** (3 min)
3. **[Complete Module 1](./module-1-introduction-to-github-copilot.md)** (3-6 hours)
4. **[Join Community](https://discord.gg/abir-ai)** (1 min)

**Questions?** [copilot-cert@abir-ai.com](mailto:copilot-cert@abir-ai.com)

---

**Last Updated:** January 2026  
**Version:** 1.0
