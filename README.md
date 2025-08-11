# 📚 Offline Training Hub PWA

A Progressive Web App (PWA) designed for offline access to training documents and videos. Perfect for organizations that need reliable access to instructional content without internet connectivity.

![PWA Status](https://img.shields.io/badge/PWA-Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Offline](https://img.shields.io/badge/Works-Offline-orange)

## ✨ Features

- **🔄 Offline-First Design**: Access all content without internet connection after initial caching
- **📱 Cross-Platform**: Works on desktop, tablet, and mobile devices
- **📥 Smart Caching**: Download all content with one click for offline access
- **🔍 Search Functionality**: Find content quickly with real-time search
- **📊 Cache Management**: Monitor storage status and manage cached content
- **🎨 Modern Interface**: Clean, professional design with intuitive navigation
- **⚡ Fast Performance**: Optimized loading and smooth user experience
- **🔒 Secure**: Requires HTTPS for enhanced security

## 🚀 Live Demo

Visit the live demo: [https://tigerpresentations.github.io/training-hub-pwa](https://tigerpresentations.github.io/training-hub-pwa)

## 📱 Installation

### Install as App
1. Visit the website in Chrome, Edge, or Safari
2. Look for "Install" or "Add to Home Screen" prompt
3. Click install to add to your device
4. Launch from home screen like a native app

### Browser Usage
Simply visit the URL - no installation required for basic usage.

## 🎯 Use Cases

- **Corporate Training**: Deploy training materials for field workers
- **Educational Content**: Provide offline access to course materials
- **Technical Documentation**: Ensure critical manuals are always accessible
- **Remote Work**: Access resources without reliable internet connectivity
- **Emergency Procedures**: Critical information available during outages

## 📂 Content Types Supported

### Documents
- **PDF Files**: Training manuals, guides, procedures
- **File Size**: Optimized for documents up to 5MB each
- **Viewing**: Opens in new tab with browser's built-in PDF viewer

### Videos
- **MP4 Format**: Training videos, tutorials, demonstrations
- **Duration**: Optimized for videos 2-5 minutes in length
- **Playback**: Inline video player with native browser controls

## 🛠️ Technical Specifications

### PWA Requirements
- ✅ Web App Manifest
- ✅ Service Worker
- ✅ HTTPS Required
- ✅ Responsive Design
- ✅ Offline Functionality

### Browser Support
- Chrome 67+
- Firefox 79+
- Safari 14+
- Edge 79+

### Storage Requirements
- **App Shell**: ~500KB
- **Sample Content**: ~60MB total
- **Custom Content**: Varies based on your files

## 📋 Quick Start

### For End Users
1. **Visit Website**: Navigate to the PWA URL
2. **Download Content**: Click "Download All Content" 
3. **Go Offline**: Disconnect internet to test offline access
4. **Install App**: Use browser's install prompt for app-like experience

### For Administrators
1. **Replace Content**: Upload your PDFs to `/documents/` folder
2. **Update Videos**: Add your MP4 files to `/videos/` folder  
3. **Modify Metadata**: Edit content descriptions in `index.html`
4. **Deploy**: Push changes to GitHub Pages

## 🔧 Customization

### Content Management
Update the content arrays in `index.html`:

```javascript
const resources = {
  documents: [
    {
      id: 'doc1',
      title: 'Your Document Title',
      description: 'Description of the document content',
      filename: 'your-document.pdf',
      size: '3.2 MB',
      url: 'documents/your-document.pdf'
    }
  ],
  videos: [
    {
      id: 'vid1', 
      title: 'Your Video Title',
      description: 'Description of the video content',
      filename: 'your-video.mp4',
      duration: '3:45',
      size: '25 MB',
      url: 'videos/your-video.mp4'
    }
  ]
};
```

### Branding
- **App Name**: Update in `manifest.json` and `index.html`
- **Colors**: Modify CSS variables in `index.html` (lines 15-25)
- **Icons**: Replace files in `/icons/` directory
- **Logo**: Update header title and emoji

### Configuration
- **Cache Settings**: Modify cache names in `service-worker.js`
- **Storage Limits**: Adjust based on your content size
- **Update Frequency**: Configure cache refresh intervals

## 🔒 Security Features

- **HTTPS Only**: Service workers require secure connections
- **Same-Origin Policy**: Content served from same domain
- **No External Dependencies**: All resources self-contained
- **Content Security**: Cached content validated before storage

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 95+  
- **Best Practices**: 95+
- **SEO**: 90+
- **PWA**: 100

### Loading Times
- **First Load**: 1-2 seconds (depending on connection)
- **Cached Load**: < 500ms
- **Offline Load**: < 200ms

## 🐛 Troubleshooting

### Common Issues

**PWA Not Installing**
- Ensure HTTPS is enabled
- Check manifest.json for errors
- Verify service worker registration

**Content Not Caching**
- Check browser console for errors
- Verify file paths are correct
- Ensure sufficient storage space

**Offline Mode Not Working**
- Clear browser cache and reload
- Check service worker status in DevTools
- Verify cached content in Application tab

### Debug Mode
Open browser DevTools → Application tab to monitor:
- Service worker status
- Cache storage contents
- Manifest validation
- PWA installability

## 📞 Support

### Getting Help
1. **Check Issues**: Review existing GitHub issues
2. **Browser DevTools**: Use Application tab for debugging
3. **Network Tab**: Monitor requests and responses
4. **Console Logs**: Check for error messages

### Reporting Bugs
When reporting issues, include:
- Browser version and OS
- Steps to reproduce
- Error messages from console
- Network conditions (online/offline)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web standards
- Inspired by offline-first design principles
- Optimized for real-world deployment scenarios

---

**Ready to deploy?** Check out [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions.

**Need help?** Open an issue or check the troubleshooting section above.