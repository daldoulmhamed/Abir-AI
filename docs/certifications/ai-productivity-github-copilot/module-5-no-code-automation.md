# Module 5: No-Code & Automation with AI

**Duration:** Self-paced (3-5 hours)  
**Level:** Beginner-Intermediate  
**Prerequisites:** Module 1 completed (Modules 2-4 recommended)

---

## Module Overview

GitHub Copilot isn't just for developers. This module teaches how to use AI for workflow automation, no-code/low-code solutions, data processing, and productivity enhancement across all roles. Learn to automate repetitive tasks and build powerful workflows without extensive coding knowledge.

**Learning Objectives:**
- Automate workflows with GitHub Actions and Copilot
- Build no-code/low-code solutions with AI assistance
- Process and analyze data using AI-generated scripts
- Create productivity tools and utilities
- Integrate AI into existing business processes

---

## Lesson 5.1: GitHub Actions Automation

### Automated Workflows for Everyone

GitHub Actions allows you to automate tasks without being a DevOps expert. Copilot makes it even easier.

**Example 1: Automated Issue Management**

```yaml
# Ask Copilot: "Create a GitHub Action to automatically label issues based on content"

name: Auto-Label Issues

on:
  issues:
    types: [opened, edited]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - name: Auto-label based on content
        uses: actions/github-script@v6
        with:
          script: |
            const issue = context.payload.issue;
            const body = issue.body.toLowerCase();
            const title = issue.title.toLowerCase();
            
            const labels = [];
            
            // Check for bug-related keywords
            if (body.includes('bug') || body.includes('error') || title.includes('bug')) {
              labels.push('bug');
            }
            
            // Check for feature requests
            if (body.includes('feature') || body.includes('enhancement')) {
              labels.push('enhancement');
            }
            
            // Check for documentation
            if (body.includes('documentation') || body.includes('docs')) {
              labels.push('documentation');
            }
            
            // Check for questions
            if (body.includes('how to') || body.includes('question')) {
              labels.push('question');
            }
            
            // Apply labels
            if (labels.length > 0) {
              await github.rest.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: issue.number,
                labels: labels
              });
            }
```

**Example 2: Automated Report Generation**

```yaml
# Chat: "Create a weekly automated report of repository activity"

name: Weekly Repository Report

on:
  schedule:
    # Run every Monday at 9 AM UTC
    - cron: '0 9 * * 1'
  workflow_dispatch: # Allow manual trigger

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Activity Report
        uses: actions/github-script@v6
        with:
          script: |
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            
            // Get PRs merged this week
            const { data: prs } = await github.rest.pulls.list({
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'closed',
              since: oneWeekAgo.toISOString()
            });
            
            const mergedPRs = prs.filter(pr => pr.merged_at);
            
            // Get issues closed this week
            const { data: issues } = await github.rest.issues.listForRepo({
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'closed',
              since: oneWeekAgo.toISOString()
            });
            
            // Generate report
            const report = `
            # 📊 Weekly Repository Report
            **Period:** ${oneWeekAgo.toDateString()} - ${new Date().toDateString()}
            
            ## 🎉 Merged Pull Requests: ${mergedPRs.length}
            ${mergedPRs.map(pr => `- ${pr.title} (#${pr.number}) by @${pr.user.login}`).join('\n')}
            
            ## ✅ Closed Issues: ${issues.length}
            ${issues.map(issue => `- ${issue.title} (#${issue.number})`).join('\n')}
            
            ## 👥 Top Contributors
            <!-- Add contributor stats -->
            `;
            
            // Post report as issue
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Weekly Report - ${new Date().toDateString()}`,
              body: report,
              labels: ['report', 'automated']
            });
```

---

## Lesson 5.2: Data Processing & Analysis

### Automate Data Tasks with AI-Generated Scripts

**Example 1: CSV Data Transformation**

```python
# Chat: "Create a script to clean and transform CSV data"

import pandas as pd
import re
from datetime import datetime

def clean_and_transform_sales_data(input_file, output_file):
    """
    Clean and transform sales data from CSV.
    
    Transformations:
    - Remove duplicates
    - Standardize date formats
    - Clean currency values
    - Calculate totals
    - Add derived columns
    """
    # Load data
    df = pd.read_csv(input_file)
    
    # Remove duplicates
    df = df.drop_duplicates(subset=['order_id'], keep='first')
    
    # Clean and standardize dates
    df['order_date'] = pd.to_datetime(df['order_date'], errors='coerce')
    df['order_date'] = df['order_date'].dt.strftime('%Y-%m-%d')
    
    # Clean currency values (remove $, commas)
    df['amount'] = df['amount'].replace('[\$,]', '', regex=True).astype(float)
    
    # Handle missing values
    df['customer_email'] = df['customer_email'].fillna('unknown@example.com')
    df['amount'] = df['amount'].fillna(0)
    
    # Add derived columns
    df['month'] = pd.to_datetime(df['order_date']).dt.month
    df['year'] = pd.to_datetime(df['order_date']).dt.year
    df['quarter'] = pd.to_datetime(df['order_date']).dt.quarter
    
    # Calculate totals by customer
    df['customer_total'] = df.groupby('customer_email')['amount'].transform('sum')
    
    # Categorize customers
    df['customer_tier'] = pd.cut(
        df['customer_total'],
        bins=[0, 100, 500, 1000, float('inf')],
        labels=['Bronze', 'Silver', 'Gold', 'Platinum']
    )
    
    # Save cleaned data
    df.to_csv(output_file, index=False)
    
    # Generate summary report
    print(f"✅ Data cleaned successfully!")
    print(f"📊 Total orders: {len(df)}")
    print(f"💰 Total revenue: ${df['amount'].sum():,.2f}")
    print(f"👥 Unique customers: {df['customer_email'].nunique()}")
    
    return df

# Usage
if __name__ == "__main__":
    df = clean_and_transform_sales_data('raw_sales.csv', 'clean_sales.csv')
```

**Example 2: Automated Data Reporting**

```python
# Chat: "Create an automated daily sales report generator"

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import smtplib
from datetime import datetime, timedelta

class DailySalesReporter:
    def __init__(self, data_file):
        self.df = pd.read_csv(data_file)
        self.today = datetime.now().date()
        self.yesterday = self.today - timedelta(days=1)
    
    def generate_charts(self):
        """Generate visualization charts."""
        # Sales by hour
        plt.figure(figsize=(12, 4))
        
        plt.subplot(1, 2, 1)
        hourly_sales = self.df.groupby('hour')['amount'].sum()
        plt.bar(hourly_sales.index, hourly_sales.values)
        plt.title('Sales by Hour')
        plt.xlabel('Hour')
        plt.ylabel('Revenue ($)')
        plt.savefig('hourly_sales.png')
        
        # Top products
        plt.subplot(1, 2, 2)
        top_products = self.df.groupby('product')['quantity'].sum().nlargest(10)
        plt.barh(top_products.index, top_products.values)
        plt.title('Top 10 Products')
        plt.xlabel('Quantity Sold')
        plt.tight_layout()
        plt.savefig('top_products.png')
    
    def generate_html_report(self):
        """Generate HTML report."""
        stats = {
            'total_revenue': self.df['amount'].sum(),
            'total_orders': len(self.df),
            'avg_order_value': self.df['amount'].mean(),
            'unique_customers': self.df['customer_id'].nunique()
        }
        
        html = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                .metric {{ 
                    background: #f0f0f0; 
                    padding: 20px; 
                    margin: 10px; 
                    border-radius: 5px; 
                }}
                .number {{ font-size: 24px; font-weight: bold; color: #2c3e50; }}
            </style>
        </head>
        <body>
            <h1>Daily Sales Report - {self.today}</h1>
            
            <div class="metric">
                <div>Total Revenue</div>
                <div class="number">${stats['total_revenue']:,.2f}</div>
            </div>
            
            <div class="metric">
                <div>Total Orders</div>
                <div class="number">{stats['total_orders']}</div>
            </div>
            
            <div class="metric">
                <div>Average Order Value</div>
                <div class="number">${stats['avg_order_value']:,.2f}</div>
            </div>
            
            <div class="metric">
                <div>Unique Customers</div>
                <div class="number">{stats['unique_customers']}</div>
            </div>
            
            <h2>Visualizations</h2>
            <img src="cid:hourly_sales" />
            <img src="cid:top_products" />
        </body>
        </html>
        """
        return html
    
    def send_email(self, recipients):
        """Send report via email."""
        msg = MIMEMultipart('related')
        msg['Subject'] = f'Daily Sales Report - {self.today}'
        msg['From'] = 'reports@company.com'
        msg['To'] = ', '.join(recipients)
        
        # Attach HTML
        html_part = MIMEText(self.generate_html_report(), 'html')
        msg.attach(html_part)
        
        # Attach images
        with open('hourly_sales.png', 'rb') as f:
            img = MIMEImage(f.read())
            img.add_header('Content-ID', '<hourly_sales>')
            msg.attach(img)
        
        with open('top_products.png', 'rb') as f:
            img = MIMEImage(f.read())
            img.add_header('Content-ID', '<top_products>')
            msg.attach(img)
        
        # Send email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login('your-email@gmail.com', 'your-password')
            server.send_message(msg)
```

---

## Lesson 5.3: No-Code Utilities

### Building Productivity Tools

**Example 1: File Organization Script**

```python
# Chat: "Create a script to organize files by type and date"

import os
import shutil
from pathlib import Path
from datetime import datetime

def organize_downloads_folder(source_folder="~/Downloads"):
    """
    Organize files in Downloads folder by type and date.
    Creates folders for: Documents, Images, Videos, Archives, etc.
    """
    source = Path(source_folder).expanduser()
    
    # Define file type categories
    categories = {
        'Documents': ['.pdf', '.doc', '.docx', '.txt', '.xlsx', '.pptx'],
        'Images': ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
        'Videos': ['.mp4', '.avi', '.mkv', '.mov'],
        'Audio': ['.mp3', '.wav', '.flac', '.m4a'],
        'Archives': ['.zip', '.rar', '.7z', '.tar', '.gz'],
        'Code': ['.py', '.js', '.html', '.css', '.java', '.cpp'],
        'Others': []
    }
    
    # Process each file
    for file_path in source.iterdir():
        if file_path.is_file():
            # Determine category
            ext = file_path.suffix.lower()
            category = 'Others'
            
            for cat, extensions in categories.items():
                if ext in extensions:
                    category = cat
                    break
            
            # Create category folder if doesn't exist
            category_folder = source / category
            category_folder.mkdir(exist_ok=True)
            
            # Create month subfolder
            modified_date = datetime.fromtimestamp(file_path.stat().st_mtime)
            month_folder = category_folder / modified_date.strftime('%Y-%m')
            month_folder.mkdir(exist_ok=True)
            
            # Move file
            destination = month_folder / file_path.name
            
            # Handle duplicates
            counter = 1
            while destination.exists():
                name = file_path.stem
                destination = month_folder / f"{name}_{counter}{ext}"
                counter += 1
            
            shutil.move(str(file_path), str(destination))
            print(f"Moved: {file_path.name} → {category}/{month_folder.name}")
    
    print("\n✅ Organization complete!")

if __name__ == "__main__":
    organize_downloads_folder()
```

**Example 2: Automated Backup Script**

```python
# Chat: "Create an automated backup script with compression"

import os
import shutil
import tarfile
from datetime import datetime
from pathlib import Path

class AutoBackup:
    def __init__(self, source_dirs, backup_location):
        self.source_dirs = [Path(d) for d in source_dirs]
        self.backup_location = Path(backup_location)
        self.backup_location.mkdir(parents=True, exist_ok=True)
    
    def create_backup(self, keep_last_n=5):
        """Create compressed backup of specified directories."""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_name = f"backup_{timestamp}.tar.gz"
        backup_path = self.backup_location / backup_name
        
        print(f"Creating backup: {backup_name}")
        
        # Create compressed archive
        with tarfile.open(backup_path, 'w:gz') as tar:
            for source_dir in self.source_dirs:
                if source_dir.exists():
                    print(f"  Adding: {source_dir}")
                    tar.add(source_dir, arcname=source_dir.name)
                else:
                    print(f"  ⚠️  Skipping missing directory: {source_dir}")
        
        # Get backup size
        size_mb = backup_path.stat().st_size / (1024 * 1024)
        print(f"✅ Backup created: {size_mb:.2f} MB")
        
        # Clean old backups
        self._clean_old_backups(keep_last_n)
        
        return backup_path
    
    def _clean_old_backups(self, keep_last_n):
        """Keep only the last N backups."""
        backups = sorted(
            self.backup_location.glob('backup_*.tar.gz'),
            key=lambda p: p.stat().st_mtime,
            reverse=True
        )
        
        for old_backup in backups[keep_last_n:]:
            print(f"Removing old backup: {old_backup.name}")
            old_backup.unlink()

# Usage
if __name__ == "__main__":
    backup = AutoBackup(
        source_dirs=[
            '~/Documents/Important',
            '~/Projects',
            '~/.config'
        ],
        backup_location='~/Backups'
    )
    
    backup.create_backup(keep_last_n=5)
```

---

## Lesson 5.4: Workflow Integration

### Zapier-Style Automation with Code

**Example: Slack Notifications for GitHub Events**

```python
# Chat: "Create a Slack notification bot for GitHub events"

import requests
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

SLACK_WEBHOOK_URL = os.getenv('SLACK_WEBHOOK_URL')

def send_slack_message(message, channel='#github-notifications'):
    """Send message to Slack."""
    payload = {
        'channel': channel,
        'username': 'GitHub Bot',
        'icon_emoji': ':github:',
        'text': message
    }
    
    response = requests.post(SLACK_WEBHOOK_URL, json=payload)
    return response.status_code == 200

@app.route('/webhook/github', methods=['POST'])
def github_webhook():
    """Handle GitHub webhook events."""
    event = request.headers.get('X-GitHub-Event')
    payload = request.json
    
    if event == 'push':
        # New push event
        commits = len(payload['commits'])
        repo = payload['repository']['name']
        pusher = payload['pusher']['name']
        message = f"🚀 {pusher} pushed {commits} commit(s) to {repo}"
        send_slack_message(message)
    
    elif event == 'pull_request':
        # Pull request event
        action = payload['action']
        pr = payload['pull_request']
        repo = payload['repository']['name']
        
        if action == 'opened':
            message = f"📝 New PR opened in {repo}: {pr['title']}\n{pr['html_url']}"
        elif action == 'merged':
            message = f"✅ PR merged in {repo}: {pr['title']}"
        else:
            message = None
        
        if message:
            send_slack_message(message)
    
    elif event == 'issues':
        # Issue event
        action = payload['action']
        issue = payload['issue']
        repo = payload['repository']['name']
        
        if action == 'opened':
            message = f"🐛 New issue in {repo}: {issue['title']}\n{issue['html_url']}"
            send_slack_message(message)
    
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(port=5000)
```

---

## Practical Exercises

### Exercise 5.1: Build Your Automation

**Task:** Create a personal productivity automation

**Ideas:**
- File organizer for specific needs
- Automated backup system
- Data processing pipeline
- Report generator
- Notification system

**Time:** 2-3 hours

### Exercise 5.2: GitHub Actions Workflow

**Challenge:** Automate a repository task

**Options:**
- Auto-close stale issues
- Generate changelog on release
- Run security scans
- Deploy documentation

### Exercise 5.3: Data Analysis Automation

**Project:** Build an automated data pipeline

**Requirements:**
1. Load data from source
2. Clean and transform
3. Generate insights
4. Create visualizations
5. Send report

---

## Module Summary

🎯 **Key Takeaways:**

1. **GitHub Actions** enables powerful automation for everyone
2. **Data processing** becomes simple with AI-generated scripts
3. **No-code utilities** solve everyday productivity challenges
4. **Workflow integration** connects your tools seamlessly
5. **AI assistance** makes automation accessible to non-developers

### Automation Impact

- **70%** time saved on repetitive tasks
- **5-10 hours** per week recovered
- **Zero** coding experience required for basic automation
- **Unlimited** scalability and customization

### Next Steps

Module 6 covers:
- Advanced Copilot integrations
- Enterprise-scale AI workflows
- Performance optimization
- Future of AI-assisted development

**Before Module 6:**
- [ ] Create one automation workflow
- [ ] Build a productivity utility
- [ ] Set up GitHub Actions
- [ ] Automate a data task

---

**Estimated Completion Time:** 3-5 hours
