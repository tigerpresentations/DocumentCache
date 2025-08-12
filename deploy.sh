#!/bin/bash

# Tiger Document Library - Quick Deployment Script
# Usage: ./deploy.sh "Your commit message"

echo "🚀 Tiger Document Library - Deployment Script"
echo "=============================================="

# Check if commit message provided
if [ -z "$1" ]; then
    echo "❌ Please provide a commit message"
    echo "Usage: ./deploy.sh \"Add new document: Your Document Title\""
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ This is not a git repository"
    exit 1
fi

echo "📋 Checking for changes..."

# Check if documents.json exists
if [ ! -f "documents.json" ]; then
    echo "❌ documents.json not found"
    exit 1
fi

# Validate JSON syntax
echo "🔍 Validating documents.json..."
if ! python3 -m json.tool documents.json > /dev/null 2>&1; then
    echo "❌ documents.json has invalid JSON syntax"
    echo "💡 Use https://jsonlint.com to check your JSON"
    exit 1
fi

echo "✅ JSON validation passed"

# Show what files will be added
echo "📁 Files to be deployed:"
git status --porcelain

# Add all changes
echo "📤 Adding files to git..."
git add .

# Check if there are actually changes to commit
if git diff --staged --quiet; then
    echo "⚠️  No changes to deploy"
    exit 0
fi

# Commit changes
echo "💾 Committing changes..."
git commit -m "$1"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
if git push origin main; then
    echo "✅ Successfully deployed!"
    echo "🕐 GitHub Pages will update in 2-5 minutes"
    echo "🔗 Check deployment: https://github.com/$(git remote get-url origin | sed 's/.*github\.com[:/]\([^/]*\/[^/]*\)\.git/\1/')/actions"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi

echo ""
echo "🎉 Deployment complete!"
echo "📱 Your PWA will update automatically once GitHub Pages rebuilds"
echo "💡 Users may need to refresh or use 'Force Refresh' to see changes"