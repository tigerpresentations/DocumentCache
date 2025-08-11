# ⚙️ Configuration Guide

This guide covers customizing the PWA for your organization's specific needs.

## 📝 Content Configuration

### Adding Your Documents

1. **Upload PDFs** to the `documents/` folder
2. **Edit** `index.html` and find the `documents` array (around line 158):

```javascript
documents: [
    {
        id: 'doc1',                                    // Unique identifier
        title: 'Employee Handbook',                   // Display title
        description: 'Complete guide to company policies and procedures',
        filename: 'employee-handbook.pdf',           // Actual filename
        size: '2.8 MB',                             // File size (for display)
        url: 'documents/employee-handbook.pdf'       // Path to file
    },
    {
        id: 'doc2',
        title: 'Safety Procedures Manual',
        description: 'Essential safety guidelines and emergency procedures',
        filename: 'safety-manual.pdf',
        size: '1.9 MB',
        url: 'documents/safety-manual.pdf'
    }
    // Add more documents as needed
]
```

### Adding Your Videos

1. **Upload MP4 files** to the `videos/` folder
2. **Edit** `index.html` and find the `videos` array (around line 174):

```javascript
videos: [
    {
        id: 'vid1',                                   // Unique identifier
        title: 'New Employee Orientation',           // Display title
        description: 'Welcome video covering company culture and basics',
        filename: 'orientation.mp4',                 // Actual filename
        duration: '5:30',                            // Video duration
        size: '35 MB',                              // File size
        url: 'videos/orientation.mp4'               // Path to file
    },
    {
        id: 'vid2',
        title: 'Equipment Training',
        description: 'Proper use and maintenance of company equipment',
        filename: 'equipment-training.mp4',
        duration: '8:15',
        size: '52 MB',
        url: 'videos/equipment-training.mp4'
    }
    // Add more videos as needed
]
```

## 🎨 Branding Configuration

### App Name and Title

**Edit `manifest.json`:**
```json
{
  "name": "Acme Corp Training Hub",
  "short_name": "AcmeTraining",
  "description": "Access Acme Corporation training materials offline"
}
```

**Edit `index.html` (line 69):**
```html
<h1 class="app-title">🏢 Acme Corp Training</h1>
```

### Color Scheme

**Edit CSS variables in `index.html` (lines 15-25):**
```css
:root {
    --primary-blue: #1a365d;        /* Your primary brand color */
    --secondary-blue: #2d3748;      /* Your secondary brand color */
    --text-dark: #1f2937;           /* Dark text color */
    --text-light: #6b7280;          /* Light text color */
    --bg-light: #f9fafb;            /* Background color */
    --border: #e5e7eb;              /* Border color */
    --success: #10b981;             /* Success/cached color */
    --error: #ef4444;               /* Error/offline color */
    --warning: #f59e0b;             /* Warning color */
}
```

### Custom Logo/Icon

Replace the emoji in the header with your logo:
```html
<!-- Instead of: -->
<h1 class="app-title">📚 Training Hub</h1>

<!-- Use: -->
<h1 class="app-title">
    <img src="icons/logo.svg" alt="Company Logo" style="height: 32px; vertical-align: middle;">
    Your Company Training
</h1>
```

## 📱 PWA Settings

### App Behavior

**Edit `manifest.json` for app behavior:**
```json
{
  "display": "standalone",           // How app appears (standalone, minimal-ui, browser)
  "orientation": "portrait-primary", // Preferred orientation
  "theme_color": "#2563eb",         // Browser theme color
  "background_color": "#f9fafb"     // Splash screen background
}
```

### App Shortcuts

**Add quick actions to `manifest.json`:**
```json
{
  "shortcuts": [
    {
      "name": "Emergency Procedures",
      "short_name": "Emergency",
      "description": "Quick access to emergency procedures",
      "url": "/?emergency=true",
      "icons": [{"src": "icons/emergency-icon.png", "sizes": "96x96"}]
    }
  ]
}
```

## 🔧 Technical Configuration

### Cache Settings

**Edit `service-worker.js` cache names:**
```javascript
const CACHE_NAME = 'your-company-training-v1';
const CONTENT_CACHE = 'your-company-content-v1';
```

### Storage Limits

**Monitor storage usage in your app:**
```javascript
// Add to index.html JavaScript section
async function checkStorageQuota() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        const usage = (estimate.usage / 1024 / 1024).toFixed(2);
        const quota = (estimate.quota / 1024 / 1024).toFixed(2);
        console.log(`Storage: ${usage}MB used of ${quota}MB available`);
    }
}
```

## 🔒 Access Control

### Content Visibility

For sensitive content, consider:

1. **Private Repository**: Upgrade to GitHub Pro for private repos
2. **Authentication**: Add login before content access
3. **Enterprise Hosting**: Use internal servers for confidential materials

### User Restrictions

**Add simple access control:**
```javascript
// Add to app initialization
function checkAccess() {
    const allowedEmails = ['employee@company.com', 'trainer@company.com'];
    const userEmail = prompt('Enter your company email:');
    
    if (!allowedEmails.includes(userEmail)) {
        alert('Access denied. Contact IT for help.');
        return false;
    }
    return true;
}

// Call before loading content
if (!checkAccess()) {
    document.body.innerHTML = '<div style="text-align: center; padding: 50px;">Access Denied</div>';
}
```

## 📊 Analytics Configuration

### Basic Usage Tracking

**Add Google Analytics (optional):**
```html
<!-- Add to index.html head section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Event Tracking

**Track PWA-specific events:**
```javascript
// Track content downloads
function trackDownload(contentType, contentId) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'content_download', {
            'content_type': contentType,
            'content_id': contentId
        });
    }
}

// Track offline usage
if (!navigator.onLine) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'offline_usage');
    }
}
```

## 🌐 Multi-Language Support

### Basic Internationalization

**Add language switcher:**
```javascript
const translations = {
    en: {
        title: 'Training Hub',
        downloadAll: 'Download All Content',
        search: 'Search documents and videos...'
    },
    es: {
        title: 'Centro de Entrenamiento',
        downloadAll: 'Descargar Todo el Contenido',
        search: 'Buscar documentos y videos...'
    }
};

function setLanguage(lang) {
    const t = translations[lang];
    document.querySelector('.app-title').textContent = `📚 ${t.title}`;
    document.getElementById('downloadAllBtn').textContent = `📥 ${t.downloadAll}`;
    document.getElementById('searchInput').placeholder = `🔍 ${t.search}`;
}
```

## 🚀 Performance Optimization

### File Size Recommendations

- **PDFs**: Keep under 5MB each
- **Videos**: Compress to 720p, aim for under 50MB
- **Total Content**: Monitor browser storage limits (~50-100MB)

### Content Optimization

**Compress videos with FFmpeg:**
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 -crf 28 -preset fast output.mp4
```

**Optimize PDFs:**
- Use "Save as Optimized PDF" in Adobe Acrobat
- Reduce image quality in PDFs
- Remove unnecessary metadata

## 🔄 Update Management

### Version Control

**Update version numbers when changing content:**
```javascript
// In service-worker.js
const CACHE_NAME = 'training-hub-v2';  // Increment version
const CONTENT_CACHE = 'content-cache-v2';
```

### Automatic Updates

**Force update when new version available:**
```javascript
// Add to index.html
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(registration => {
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New version available
                    if (confirm('New content available. Update now?')) {
                        window.location.reload();
                    }
                }
            });
        });
    });
}
```

---

## 📞 Need Help?

- **Configuration Issues**: Check browser console for errors
- **Content Problems**: Verify file paths match exactly
- **Performance**: Use browser DevTools → Lighthouse for analysis
- **PWA Features**: Test in DevTools → Application tab

For additional support, create an issue in the GitHub repository.