# PWA Offline Instructions Project

Create a Progressive Web App (PWA) that allows clients to cache and access instructional documents and videos offline. The app should handle 1-2 documents (~3MB each) and 2-3 short videos (~3 minutes each).

## Project Requirements

### Core Functionality
- **Offline-first design**: Content must be accessible without internet connection after initial caching
- **Document support**: Handle PDF documents (3MB each) for viewing
- **Video support**: Handle MP4 videos (3-minute duration each) with inline playback
- **Cache management**: Allow users to download, check status, and clear cached content
- **Search functionality**: Enable searching through cached content titles and descriptions
- **Responsive design**: Work seamlessly on desktop, tablet, and mobile devices

### Technical Specifications
- **PWA Requirements**: Service worker, web app manifest, installable
- **Storage**: Use Cache API for reliable offline storage
- **UI/UX**: Modern, intuitive interface with offline status indicators
- **Performance**: Fast loading, smooth transitions, progress indicators for downloads
- **Browser Support**: Chrome, Firefox, Safari, Edge (modern versions)

### File Structure
Create the following files:
- `index.html` - Main application interface
- `service-worker.js` - Handles caching and offline functionality
- `manifest.json` - PWA configuration
- `styles.css` - Application styling (can be inline or separate)
- `app.js` - Main application logic (can be inline or separate)

### Key Features to Implement

#### 1. Service Worker Caching
- Cache all static assets (HTML, CSS, JS)
- Cache document and video files for offline access
- Implement cache-first strategy for cached content
- Handle cache updates and versioning

#### 2. User Interface
- **Header**: App title, connection status indicator
- **Cache Controls**: Download all, check status, clear cache buttons with progress bars
- **Search Bar**: Filter content by title/description
- **Content Sections**: 
  - Documents section with PDF cards
  - Videos section with video cards
- **Resource Cards**: Show title, description, file size, cache status
- **Offline Banner**: Visible indicator when offline

#### 3. Cache Management
- Pre-cache essential files on service worker install
- Manual "Download All" function for user-initiated caching
- Cache status checking with file count and approximate size
- Cache clearing functionality
- Visual indicators for cached vs non-cached content

#### 4. Content Access
- PDF documents open in new tab/window
- Videos play in modal or new window with native controls
- Graceful fallback for unsupported formats
- Error handling for failed resource loading

#### 5. Offline Detection
- Monitor online/offline status
- Update UI indicators accordingly
- Show appropriate messaging for offline state
- Ensure all features work offline after initial caching

### Sample Content Structure
```
/documents/
  - product-guide-1.pdf (Quick Start Guide)
  - product-guide-2.pdf (Advanced Features Manual)

/videos/
  - setup-tutorial.mp4 (Initial Setup Tutorial - 3:45)
  - troubleshooting.mp4 (Common Issues & Solutions - 2:30) 
  - maintenance.mp4 (Maintenance & Care - 2:15)
```

### Design Guidelines
- **Color Scheme**: Professional blue gradient theme (#2563eb, #667eea)
- **Typography**: Modern system fonts (SF Pro, Segoe UI, Roboto)
- **Layout**: Card-based design, clean spacing, mobile-first responsive
- **Icons**: Use SVG icons for documents, videos, and status indicators
- **Animations**: Subtle hover effects, smooth transitions, loading states

### Technical Considerations
- Handle storage quota gracefully
- Implement proper error handling for network failures
- Ensure PWA installability (manifest, service worker, HTTPS)
- Optimize for performance (lazy loading, compression)
- Test offline functionality thoroughly

### Success Criteria
- App works completely offline after initial online visit
- Users can install PWA to home screen
- All content caches reliably within browser storage limits
- Search works on cached content
- Clear visual feedback for all user actions
- Responsive design works on all target devices

### Additional Notes
- Focus on reliability over advanced features
- Prioritize user experience and clear status communication
- Keep the interface simple and intuitive for non-technical users
- Ensure content remains accessible even with slow/unreliable connections

Generate a complete, production-ready PWA that meets all these requirements. Include detailed comments explaining the caching strategies and offline functionality.