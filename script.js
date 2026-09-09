// script.js
/* ============================================
   CAMPAIGN CONFIGURATION
   ============================================ */
const CAMPAIGN_CONFIG = {
  donationId: "ylone665-2@okhdfcbank",
  campaignUrl: window.location.href,
  whatsappMessage: "Please help support Yusra Fatima's liver transplant journey. Every contribution counts. " + window.location.href,
  facebookShareUrl: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href),
};

// Donation ID element references
const donationIdDisplay = document.getElementById('donationIdDisplay');
const copyDonationIdBtn = document.getElementById('copyDonationIdBtn');
const copyBtnText = document.getElementById('copyBtnText');

// Set donation ID display
if (donationIdDisplay) {
  donationIdDisplay.textContent = CAMPAIGN_CONFIG.donationId;
}

/* ============================================
   STICKY HEADER
   ============================================ */
const siteHeader = document.getElementById('siteHeader');
let lastScrollY = 0;

function handleScroll() {
  const currentScrollY = window.scrollY;
  
  // Add scrolled class
  if (currentScrollY > 40) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
  
  // Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (currentScrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
  
  // Active nav state
  updateActiveNav(currentScrollY);
}

window.addEventListener('scroll', handleScroll, { passive: true });

/* ============================================
   MOBILE NAVIGATION
   ============================================ */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburgerBtn.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.mobile-link, .btn-mobile-donate').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
    mobileNav.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================
   ACTIVE NAV STATE
   ============================================ */
function updateActiveNav(scrollY) {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   COPY DONATION ID
   ============================================ */
copyDonationIdBtn.addEventListener('click', async () => {
  const donationId = CAMPAIGN_CONFIG.donationId;
  
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(donationId);
      showToast('Donation ID copied to clipboard!');
    } else {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = donationId;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Donation ID copied to clipboard!');
    }
    
    // Change button text
    copyBtnText.textContent = 'COPIED!';
    copyDonationIdBtn.style.backgroundColor = '#10b981';
    
    // Reset after 2.5 seconds
    setTimeout(() => {
      copyBtnText.textContent = 'Copy Donation ID';
      copyDonationIdBtn.style.backgroundColor = '';
    }, 2500);
    
  } catch (err) {
    showToast('Failed to copy. Please copy manually.');
  }
});

/* ============================================
   TOAST NOTIFICATION
   ============================================ */
const toast = document.getElementById('toast');
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ============================================
   PHOTO GALLERY - HORIZONTAL SCROLL
   ============================================ */
const galleryScroll = document.getElementById('galleryScroll');
const galleryImages = document.querySelectorAll('.gallery-img');

// Keyboard navigation for gallery
if (galleryScroll) {
  galleryScroll.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      galleryScroll.scrollBy({ left: 250, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      galleryScroll.scrollBy({ left: -250, behavior: 'smooth' });
    }
  });
}

/* ============================================
   LIGHTBOX
   ============================================ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let currentImageList = [];

function openLightbox(imageSrc, index, imageList) {
  lightboxImg.src = imageSrc;
  lightboxImg.alt = imageList[index]?.alt || 'Lightbox image';
  currentImageIndex = index;
  currentImageList = imageList;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImageList.length;
  lightboxImg.src = currentImageList[currentImageIndex].src;
  lightboxImg.alt = currentImageList[currentImageIndex].alt;
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
  lightboxImg.src = currentImageList[currentImageIndex].src;
  lightboxImg.alt = currentImageList[currentImageIndex].alt;
}

// Gallery image click
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    const allGalleryImages = Array.from(document.querySelectorAll('.gallery-img'));
    openLightbox(img.src, index, allGalleryImages);
  });
  
  // Keyboard accessibility
  img.setAttribute('tabindex', '0');
  img.setAttribute('role', 'button');
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const allGalleryImages = Array.from(document.querySelectorAll('.gallery-img'));
      openLightbox(img.src, index, allGalleryImages);
    }
  });
});

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    showNextImage();
  } else if (e.key === 'ArrowLeft') {
    showPrevImage();
  }
});

// Touch swipe for lightbox
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const swipeDistance = touchStartX - touchEndX;
  
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0) {
      showNextImage();
    } else {
      showPrevImage();
    }
  }
});

/* ============================================
   DOCUMENT VIEWER
   ============================================ */
const documentImage = document.getElementById('documentImage');
const docCounter = document.getElementById('docCounter');
const docThumbnails = document.querySelectorAll('.doc-thumb');
const prevDocBtn = document.getElementById('prevDocBtn');
const nextDocBtn = document.getElementById('nextDocBtn');
const docFullscreenBtn = document.getElementById('docFullscreenBtn');

const documentSources = [
  'doc1.jpg',
  'doc2.jpg',
  'doc3.jpg',
];

let currentDocIndex = 0;

function updateDocument(index) {
  if (index < 0) index = documentSources.length - 1;
  if (index >= documentSources.length) index = 0;
  
  currentDocIndex = index;
  documentImage.src = documentSources[index];
  documentImage.alt = `Medical document ${index + 1}`;
  docCounter.textContent = `Document ${index + 1} of ${documentSources.length}`;
  
  // Update thumbnails
  docThumbnails.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Document navigation
prevDocBtn.addEventListener('click', () => updateDocument(currentDocIndex - 1));
nextDocBtn.addEventListener('click', () => updateDocument(currentDocIndex + 1));

// Thumbnail clicks
docThumbnails.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const index = parseInt(thumb.getAttribute('data-index'));
    updateDocument(index);
  });
});

// Keyboard navigation for documents
document.querySelector('.document-viewer').addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    updateDocument(currentDocIndex + 1);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    updateDocument(currentDocIndex - 1);
  }
});

// Document fullscreen
docFullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.querySelector('.document-main').requestFullscreen().catch(err => {
      showToast('Fullscreen not available');
    });
  } else {
    document.exitFullscreen();
  }
});

// Document zoom on click (simple toggle)
documentImage.addEventListener('click', () => {
  if (documentImage.style.transform === 'scale(1.5)') {
    documentImage.style.transform = 'scale(1)';
    documentImage.style.cursor = 'zoom-in';
  } else {
    documentImage.style.transform = 'scale(1.5)';
    documentImage.style.cursor = 'zoom-out';
  }
});

/* ============================================
   SHARE BUTTONS
   ============================================ */
const whatsappShareBtn = document.getElementById('whatsappShareBtn');
const facebookShareBtn = document.getElementById('facebookShareBtn');
const copyLinkBtn = document.getElementById('copyLinkBtn');

// WhatsApp share
whatsappShareBtn.addEventListener('click', () => {
  const message = encodeURIComponent(CAMPAIGN_CONFIG.whatsappMessage);
  const whatsappUrl = `https://wa.me/?text=${message}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

// Facebook share
facebookShareBtn.addEventListener('click', () => {
  window.open(CAMPAIGN_CONFIG.facebookShareUrl, '_blank', 'noopener,noreferrer');
});

// Copy link
copyLinkBtn.addEventListener('click', async () => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(CAMPAIGN_CONFIG.campaignUrl);
      showToast('Campaign link copied!');
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = CAMPAIGN_CONFIG.campaignUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Campaign link copied!');
    }
  } catch (err) {
    showToast('Failed to copy link');
  }
});

/* ============================================
   BACK TO TOP
   ============================================ */
const backToTopBtn = document.getElementById('backToTopBtn');

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -20px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ============================================
   DONATE NOW BUTTONS
   ============================================ */
document.querySelectorAll('.btn-donate, #donateNowMain').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const donateSection = document.getElementById('donate');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================
   INITIAL SETUP
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize document viewer
  updateDocument(0);
  
  // Initial active nav state
  updateActiveNav(window.scrollY);
  
  // Ensure all images have proper loading
  console.log('Yusra fundraiser website initialized');
});

// Handle resize events for any adjustments
window.addEventListener('resize', () => {
  // No heavy operations needed, but kept for future use
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.backgroundColor = '#e5e7eb';
    img.style.minHeight = '100px';
    img.alt = 'Image not available';
  });
});

// script.js - ADD THESE AT THE END OF THE FILE

/* ============================================
   DOCUMENT FULLSCREEN VIEWER
   ============================================ */
const documentFullscreenOverlay = document.createElement('div');
documentFullscreenOverlay.className = 'document-fullscreen-overlay';
documentFullscreenOverlay.innerHTML = `
  <button class="document-fullscreen-close" aria-label="Close fullscreen document viewer">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <img class="document-fullscreen-image" src="" alt="Fullscreen document view">
  <span class="document-fullscreen-zoom-hint">Click to zoom • Scroll to zoom • Esc to close</span>
`;
document.body.appendChild(documentFullscreenOverlay);

const fullscreenDocImage = documentFullscreenOverlay.querySelector('.document-fullscreen-image');
const fullscreenDocClose = documentFullscreenOverlay.querySelector('.document-fullscreen-close');
const fullscreenZoomHint = documentFullscreenOverlay.querySelector('.document-fullscreen-zoom-hint');

let fullscreenZoomLevel = 1;
let isFullscreenDocOpen = false;

function openDocumentFullscreen() {
  fullscreenDocImage.src = documentImage.src;
  fullscreenDocImage.alt = documentImage.alt;
  fullscreenDocImage.style.transform = 'scale(1)';
  fullscreenZoomLevel = 1;
  fullscreenDocImage.classList.remove('zoomed');
  documentFullscreenOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  isFullscreenDocOpen = true;
  fullscreenDocClose.focus();
}

function closeDocumentFullscreen() {
  documentFullscreenOverlay.classList.remove('open');
  document.body.style.overflow = '';
  isFullscreenDocOpen = false;
  fullscreenDocImage.style.transform = 'scale(1)';
  fullscreenZoomLevel = 1;
  fullscreenDocImage.classList.remove('zoomed');
}

// Make document image clickable to open fullscreen
documentImage.addEventListener('click', openDocumentFullscreen);
documentImage.style.cursor = 'zoom-in';
documentImage.setAttribute('title', 'Click to view fullscreen');

// Fullscreen document close
fullscreenDocClose.addEventListener('click', closeDocumentFullscreen);

// Click on overlay background to close
documentFullscreenOverlay.addEventListener('click', (e) => {
  if (e.target === documentFullscreenOverlay) {
    closeDocumentFullscreen();
  }
});

// Zoom functionality in fullscreen
fullscreenDocImage.addEventListener('click', () => {
  if (fullscreenZoomLevel === 1) {
    fullscreenZoomLevel = 2;
    fullscreenDocImage.style.transform = 'scale(2)';
    fullscreenDocImage.classList.add('zoomed');
    fullscreenDocImage.style.cursor = 'zoom-out';
  } else {
    fullscreenZoomLevel = 1;
    fullscreenDocImage.style.transform = 'scale(1)';
    fullscreenDocImage.classList.remove('zoomed');
    fullscreenDocImage.style.cursor = 'zoom-in';
  }
});

// Mouse wheel zoom in fullscreen
fullscreenDocImage.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    // Zoom in
    fullscreenZoomLevel = Math.min(fullscreenZoomLevel + 0.2, 3);
  } else {
    // Zoom out
    fullscreenZoomLevel = Math.max(fullscreenZoomLevel - 0.2, 0.5);
  }
  fullscreenDocImage.style.transform = `scale(${fullscreenZoomLevel})`;
  
  if (fullscreenZoomLevel > 1) {
    fullscreenDocImage.classList.add('zoomed');
    fullscreenDocImage.style.cursor = 'zoom-out';
  } else {
    fullscreenDocImage.classList.remove('zoomed');
    fullscreenDocImage.style.cursor = 'zoom-in';
  }
});

// Keyboard navigation for fullscreen document
document.addEventListener('keydown', (e) => {
  if (!isFullscreenDocOpen) return;
  
  if (e.key === 'Escape') {
    closeDocumentFullscreen();
  }
});

// Prevent the old document fullscreen button from conflicting
docFullscreenBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openDocumentFullscreen();
});

// Update the old fullscreen button title
docFullscreenBtn.setAttribute('title', 'View document fullscreen');
docFullscreenBtn.setAttribute('aria-label', 'View document in fullscreen');