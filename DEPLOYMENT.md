# 🚀 Deployment Guide: GitHub Pages

Complete step-by-step instructions for deploying the Offline Training Hub PWA to GitHub Pages.

## 📋 Prerequisites

- GitHub account (free)
- Your training content files (PDFs and MP4s)
- Basic familiarity with file uploads

## 🎯 Quick Deployment (5 Minutes)

### Step 1: Create GitHub Repository

1. **Sign in** to [GitHub.com](https://github.com)
2. **Click** the green "New" button (or visit [github.com/new](https://github.com/new))
3. **Configure repository**:
   - **Repository name**: `training-hub-pwa` (or your preferred name)
   - **Description**: "Offline Training Hub PWA for our organization"
   - **Visibility**: ✅ Public (required for free GitHub Pages)
   - **Initialize**: ✅ Check "Add a README file"
4. **Click** "Create repository"

### Step 2: Upload PWA Files

#### Option A: Drag & Drop (Recommended)
1. **Click** "uploading an existing file" link in your new repository
2. **Drag and drop** all files from this project:
   ```
   index.html
   manifest.json  
   service-worker.js
   documents/ (entire folder)
   videos/ (entire folder)
   icons/ (entire folder)
   README.md
   DEPLOYMENT.md
   ```
3. **Scroll down** and add commit message: "Deploy PWA to GitHub Pages"
4. **Click** "Commit changes"

#### Option B: Individual File Upload
1. **Click** "Add file" → "Upload files" 
2. **Upload files one by one** (GitHub will maintain folder structure)
3. **Commit** after each upload or batch upload

### Step 3: Enable GitHub Pages

1. **Go to** repository Settings tab (top navigation)
2. **Scroll down** to "Pages" in left sidebar
3. **Configure deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or `master` if that's your default)
   - **Folder**: `/ (root)`
4. **Click** "Save"
5. **Wait** 2-5 minutes for deployment

### Step 4: Access Your PWA

Your PWA will be live at:
```
https://YOUR_USERNAME.github.io/REPOSITORY_NAME
```

Example: `https://johndoe.github.io/training-hub-pwa`

## 🔧 Customization Before Deployment

### Replace Sample Content

#### Documents
1. **Delete** existing files in `/documents/` folder:
   - `product-guide-1.pdf`
   - `product-guide-2.pdf`
2. **Upload** your PDF files to `/documents/` folder
3. **Edit** `index.html` file (lines 158-172) to match your content:

```javascript
documents: [
    {
        id: 'doc1',
        title: 'Your First Document Title',
        description: 'Brief description of what this document covers',
        filename: 'your-actual-filename.pdf',
        size: '2.8 MB', // Check actual file size
        url: 'documents/your-actual-filename.pdf'
    },
    {
        id: 'doc2', 
        title: 'Your Second Document Title',
        description: 'Brief description of the second document',
        filename: 'your-second-file.pdf',
        size: '4.1 MB',
        url: 'documents/your-second-file.pdf'
    }
]
```

#### Videos
1. **Delete** existing files in `/videos/` folder:
   - `setup-tutorial.mp4`
   - `troubleshooting.mp4` 
   - `maintenance.mp4`
2. **Upload** your MP4 files to `/videos/` folder
3. **Edit** `index.html` file (lines 174-202) to match your videos:

```javascript
videos: [
    {
        id: 'vid1',
        title: 'Your Video Title',
        description: 'What this video teaches or demonstrates',
        filename: 'your-video.mp4',
        duration: '4:22', // Actual duration
        size: '28 MB', // Actual file size  
        url: 'videos/your-video.mp4'
    }
]
```

### Update Branding

#### App Name and Title
1. **Edit** `manifest.json`:
```json
{
  "name": "Your Organization Training Hub",
  "short_name": "YourTraining"
}
```

2. **Edit** `index.html` (line 69):
```html
<h1 class="app-title">📚 Your Organization Training</h1>
```

#### Colors (Optional)
**Edit** CSS variables in `index.html` (lines 15-25):
```css
:root {
    --primary-blue: #1a365d;      /* Your primary color */
    --secondary-blue: #2d3748;    /* Your secondary color */
    /* ... */
}
```

## 🌐 Custom Domain Setup (Optional)

### Using Your Own Domain

1. **In repository** → Settings → Pages
2. **Add custom domain**: `training.yourcompany.com`
3. **With your domain provider**, create DNS record:
   ```
   Type: CNAME
   Name: training
   Value: YOUR_USERNAME.github.io
   ```
4. **Wait** for DNS propagation (up to 24 hours)
5. **Enable** "Enforce HTTPS" checkbox once available

### Subdomain Examples
- `training.yourcompany.com`
- `docs.yourcompany.com`  
- `hub.yourcompany.com`
- `learn.yourcompany.com`

## 📱 Testing Your Deployment

### Immediate Testing
1. **Visit** your GitHub Pages URL
2. **Check** that content loads correctly
3. **Test** search functionality
4. **Click** "Download All Content" button
5. **Verify** offline functionality:
   - Open browser DevTools → Network tab
   - Select "Offline" from throttling dropdown
   - Reload page - should still work

### PWA Installation Testing
1. **Chrome/Edge**: Look for install icon in address bar
2. **Mobile Safari**: Share → Add to Home Screen
3. **Desktop**: Click install prompt when it appears
4. **Verify** app launches from home screen/desktop

### Performance Testing
1. **Open** Chrome DevTools 
2. **Go to** Lighthouse tab
3. **Run** audit for PWA category
4. **Should score** 90+ for PWA compliance

## 🔄 Making Updates

### Quick Content Updates
1. **Navigate** to file in GitHub repository
2. **Click** pencil icon (Edit this file)
3. **Make changes** directly in browser
4. **Scroll down** and commit changes
5. **Wait** ~2 minutes for automatic deployment

### Batch Updates
1. **Clone** repository to local computer
2. **Make changes** to multiple files
3. **Commit and push** changes
4. **GitHub automatically** redeploys

## 🐛 Troubleshooting

### Common Issues

**❌ PWA Not Installing**
- Verify your site uses HTTPS (GitHub Pages provides this)
- Check browser console for manifest errors
- Ensure service worker is registered successfully

**❌ Files Not Loading**
- Check file paths in `index.html` match uploaded files exactly
- Verify files are in correct folders (`documents/`, `videos/`)
- File names are case-sensitive

**❌ Offline Mode Not Working** 
- Clear browser cache and reload
- Check DevTools → Application → Service Workers
- Verify cache storage contains your files

**❌ GitHub Pages Not Building**
- Check repository Actions tab for build errors
- Ensure all files are properly uploaded
- Wait full 10 minutes for initial deployment

### Debug Checklist
- [ ] Repository is public
- [ ] GitHub Pages is enabled  
- [ ] All files uploaded successfully
- [ ] File paths in code match actual file locations
- [ ] Browser cache cleared
- [ ] HTTPS working (GitHub provides automatically)

## 📊 Monitoring Usage

### GitHub Insights
- Repository → Insights → Traffic
- View visitor statistics
- Monitor popular content

### Browser Analytics (Optional)
Add Google Analytics or similar to track:
- PWA installations
- Offline usage patterns  
- Most accessed content
- User engagement metrics

## 🔒 Security Considerations

### Content Security
- **Public Repository**: Anyone can view your training content
- **Private Alternative**: Upgrade to GitHub Pro for private repos
- **Sensitive Content**: Consider alternative hosting for confidential materials

### Access Control
GitHub Pages is publicly accessible. For restricted access:
- Use private repositories (requires GitHub Pro)
- Consider authentication-enabled hosting alternatives
- Deploy to internal company servers

## 💡 Tips for Success

### Content Optimization
- **PDF Files**: Keep under 5MB each for faster loading
- **Videos**: Compress to 720p, keep under 3 minutes when possible
- **File Names**: Use descriptive, web-friendly names (no spaces)

### User Experience
- **Test on mobile**: Most users will access on phones/tablets
- **Monitor storage**: Large content collections may hit browser limits
- **Update regularly**: Keep content current and relevant

### Performance
- **Image optimization**: Compress any custom graphics
- **File organization**: Group related content logically
- **Cache strategy**: Service worker handles this automatically

## 📞 Getting Help

### Support Resources
1. **GitHub Pages Docs**: [docs.github.com/pages](https://docs.github.com/pages)
2. **PWA Documentation**: [web.dev/progressive-web-apps](https://web.dev/progressive-web-apps/)
3. **Repository Issues**: Create issue in this repository for PWA-specific help

### Community
- GitHub Pages community discussions
- PWA developer communities
- Stack Overflow for technical questions

---

## ✅ Deployment Complete!

Once deployed, your PWA will:
- ✅ Work offline after initial visit
- ✅ Be installable on devices  
- ✅ Update automatically when you change content
- ✅ Provide fast, app-like experience
- ✅ Work across all modern browsers

**Next Steps**: Share the URL with your team and test the offline functionality!