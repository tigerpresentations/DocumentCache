# 📋 Document Deployment Guide

This guide explains how to easily add new documents and videos to your Tiger Document Library PWA.

## 🚀 Quick Start

To add new content, you only need to:
1. **Add your files** to the appropriate folder
2. **Update documents.json** with the new file information
3. **Commit and push** to GitHub

That's it! No code changes needed.

## 📁 File Structure

```
DocumentCache/
├── documents/          # Put PDF files here
│   ├── product-guide-1.pdf
│   ├── product-guide-2.pdf
│   └── [your-new-document.pdf]
├── videos/             # Put MP4 files here
│   ├── setup-tutorial.mp4
│   ├── troubleshooting.mp4
│   └── [your-new-video.mp4]
├── documents.json      # Configuration file (EDIT THIS)
└── index.html         # Main app (NO CHANGES NEEDED)
```

## 📝 Adding New Documents

### Step 1: Add Your PDF File
1. Upload your PDF file to the `documents/` folder
2. Use descriptive filenames (e.g., `installation-guide-v2.pdf`)
3. Keep file sizes reasonable (under 10MB recommended)

### Step 2: Update documents.json
Edit the `documents.json` file and add your new document:

```json
{
  "documents": [
    {
      "id": "doc3",                    // Unique ID (doc1, doc2, doc3, etc.)
      "title": "Installation Guide",   // Display title
      "description": "Complete installation instructions with troubleshooting tips.",
      "filename": "installation-guide-v2.pdf",  // Exact filename
      "size": "4.1 MB",               // Approximate file size
      "url": "documents/installation-guide-v2.pdf"  // Path to file
    }
  ]
}
```

## 🎥 Adding New Videos

### Step 1: Add Your MP4 File
1. Upload your MP4 file to the `videos/` folder
2. Use web-optimized MP4 format
3. Keep file sizes reasonable (under 50MB recommended)

### Step 2: Update documents.json
Add your video to the videos array:

```json
{
  "videos": [
    {
      "id": "vid4",                    // Unique ID
      "title": "Advanced Configuration", // Display title
      "description": "Learn advanced configuration options and best practices.",
      "filename": "advanced-config.mp4",  // Exact filename
      "duration": "5:30",              // Video length (MM:SS format)
      "size": "35 MB",                 // Approximate file size
      "url": "videos/advanced-config.mp4"  // Path to file
    }
  ]
}
```

## 📄 Complete documents.json Example

```json
{
  "documents": [
    {
      "id": "doc1",
      "title": "Quick Start Guide",
      "description": "Get up and running quickly with basic setup instructions.",
      "filename": "quick-start.pdf",
      "size": "2.1 MB",
      "url": "documents/quick-start.pdf"
    },
    {
      "id": "doc2",
      "title": "Advanced Manual",
      "description": "Comprehensive guide for power users and administrators.",
      "filename": "advanced-manual.pdf",
      "size": "5.8 MB",
      "url": "documents/advanced-manual.pdf"
    }
  ],
  "videos": [
    {
      "id": "vid1",
      "title": "Getting Started",
      "description": "5-minute introduction to the platform.",
      "filename": "intro-video.mp4",
      "duration": "5:12",
      "size": "28 MB",
      "url": "videos/intro-video.mp4"
    }
  ],
  "metadata": {
    "lastUpdated": "2025-01-12",
    "version": "1.1"
  }
}
```

## 🔧 Field Descriptions

| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| `id` | Unique identifier | ✅ | `"doc1"`, `"vid2"` |
| `title` | Display name in the app | ✅ | `"User Manual"` |
| `description` | Brief summary | ✅ | `"Complete user guide with examples"` |
| `filename` | Exact file name | ✅ | `"user-manual-v3.pdf"` |
| `size` | File size (display only) | ✅ | `"3.2 MB"` |
| `url` | Path to file | ✅ | `"documents/user-manual-v3.pdf"` |
| `duration` | Video length (videos only) | ✅ | `"4:15"` |

## 📤 Deployment Steps

### Using Git Command Line
```bash
# 1. Add your new files
git add documents/your-new-file.pdf
git add documents.json

# 2. Commit changes
git commit -m "Add new document: Your Document Title"

# 3. Push to GitHub
git push origin main

# 4. Wait 2-5 minutes for GitHub Pages to rebuild
```

### Using GitHub Web Interface
1. **Upload files**: Go to your repository → Upload files → Drag your PDFs/videos
2. **Edit documents.json**: Click the file → Edit (pencil icon) → Make changes
3. **Commit**: Scroll down → Write commit message → Commit changes
4. **Wait**: GitHub Pages will rebuild automatically (2-5 minutes)

## ✅ Testing Your Changes

1. **Wait for deployment**: Check GitHub Actions tab for green checkmark
2. **Clear cache**: Visit your site → Use "Force Refresh" button
3. **Verify content**: New documents should appear in the app
4. **Test download**: Try downloading your new content
5. **Test offline**: Go offline and verify cached content works

## 🚨 Troubleshooting

### Document Not Appearing
- ✅ Check that the filename in `documents.json` exactly matches the uploaded file
- ✅ Ensure the JSON syntax is valid (use a JSON validator)
- ✅ Verify the file was uploaded to the correct folder (`documents/` or `videos/`)

### JSON Syntax Errors
- ✅ Every opening `{` needs a closing `}`
- ✅ Every opening `[` needs a closing `]`
- ✅ Strings must be in quotes: `"title"`
- ✅ Don't forget commas between objects
- ✅ No trailing commas after the last item

### Cache Issues
- ✅ Use the "Force Refresh" button in the app
- ✅ Try incognito/private browsing mode
- ✅ Clear browser cache manually
- ✅ Wait longer (up to 10 minutes for CDN updates)

## 📱 Best Practices

### File Naming
- ✅ Use descriptive names: `security-guidelines-2025.pdf`
- ✅ Include version numbers: `user-manual-v2.1.pdf`
- ✅ Use lowercase and hyphens: `installation-guide.pdf`
- ❌ Avoid spaces and special characters

### File Sizes
- 📄 **Documents**: Keep under 10MB for better performance
- 🎥 **Videos**: Keep under 50MB, compress if needed
- 💡 **Tip**: Use PDF optimization tools to reduce file sizes

### Organization
- 📁 Group related documents with consistent naming
- 📝 Write clear, descriptive titles and descriptions
- 🏷️ Use logical ID patterns: `doc1`, `doc2`, `vid1`, `vid2`

## 🎯 Advanced Features

### Metadata Tracking
Update the `metadata` section to track changes:

```json
"metadata": {
  "lastUpdated": "2025-01-15",
  "version": "1.2",
  "totalDocuments": 5,
  "totalVideos": 3
}
```

### Content Categories
Add a `category` field for future filtering:

```json
{
  "id": "doc1",
  "title": "Security Guide",
  "category": "security",
  "description": "...",
  // ... other fields
}
```

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Validate your JSON at [jsonlint.com](https://jsonlint.com)
3. Test your changes locally before deploying
4. Review the GitHub Actions logs for deployment errors

---

🎉 **That's it!** You can now easily manage your document library without touching any code.