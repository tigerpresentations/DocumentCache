# ⚡ Quick Deployment Guide

## 🎯 Add New Documents in 3 Steps

### Step 1: Add Your Files
```bash
# Copy your PDF to the documents folder
cp ~/Desktop/new-document.pdf documents/

# Copy your MP4 to the videos folder  
cp ~/Desktop/new-video.mp4 videos/
```

### Step 2: Update documents.json
Edit `documents.json` and add your new content:

```json
{
  "documents": [
    {
      "id": "doc3",
      "title": "New Document Title",
      "description": "Brief description of the document content.",
      "filename": "new-document.pdf",
      "size": "2.5 MB",
      "url": "documents/new-document.pdf"
    }
  ]
}
```

### Step 3: Deploy
```bash
# Option A: Use the deployment script
./deploy.sh "Add new document: Document Title"

# Option B: Manual git commands
git add .
git commit -m "Add new document: Document Title"
git push origin main
```

## 🚀 One-Line Deployment

For quick updates, use our deployment script:

```bash
./deploy.sh "Add security guidelines document"
```

The script will:
- ✅ Validate your JSON syntax
- 📤 Add and commit your changes
- 🌐 Push to GitHub
- 📱 Trigger PWA update

## 📝 JSON Template

Copy-paste this template for new documents:

```json
{
  "id": "doc_ID_HERE",
  "title": "TITLE_HERE",
  "description": "DESCRIPTION_HERE",
  "filename": "FILENAME_HERE.pdf",
  "size": "SIZE_HERE",
  "url": "documents/FILENAME_HERE.pdf"
}
```

For videos:
```json
{
  "id": "vid_ID_HERE", 
  "title": "TITLE_HERE",
  "description": "DESCRIPTION_HERE",
  "filename": "FILENAME_HERE.mp4",
  "duration": "MM:SS",
  "size": "SIZE_HERE",
  "url": "videos/FILENAME_HERE.mp4"
}
```

## 🔧 Troubleshooting

**JSON Errors?** → Use [jsonlint.com](https://jsonlint.com) to check syntax

**Files not showing?** → Check filename matches exactly in JSON

**Still not working?** → Use "Force Refresh" button in the PWA

---

That's it! No code changes needed - just files and JSON! 🎉