// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initSmoothScrolling();
  initAnimations();
  initMobileMenu();
  initScrollEffects();
  initImageLoading();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Intersection Observer for animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .screenshot"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  }
}

// Scroll effects
function initScrollEffects() {
  const heroSection = document.querySelector(".hero");
  const navbar = document.querySelector(".navbar");

  if (heroSection && navbar) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;

      // Subtle fade effect for hero section (optional)
      if (scrolled > 300) {
        heroSection.style.opacity = Math.max(0.7, 1 - scrolled / 2000);
      } else {
        heroSection.style.opacity = 1;
      }
    });
  }

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");

  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Image loading with fade-in effect
function initImageLoading() {
  const images = document.querySelectorAll("img");

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Create a new image to preload
          const preloadImg = new Image();

          preloadImg.onload = function () {
            img.src = this.src;
            img.classList.add("loaded");

            // Add loading animation
            img.style.transition = "opacity 0.6s ease, transform 0.6s ease";

            // Trigger hover effect after load
            setTimeout(() => {
              img.style.transform = "scale(1.02)";
              setTimeout(() => {
                img.style.transform = "scale(1)";
              }, 200);
            }, 100);
          };

          preloadImg.onerror = function () {
            // Handle image load error
            img.style.opacity = "0.5";
            img.style.filter = "grayscale(100%)";
          };

          preloadImg.src = img.src;

          // Stop observing this image
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.1,
    }
  );

  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Enhanced scroll performance
const debouncedScrollHandler = debounce(function () {
  // Any scroll-based calculations can go here
}, 16); // ~60fps

// Use passive scroll listener for better performance
window.addEventListener("scroll", debouncedScrollHandler, { passive: true });

// Track user interactions (for analytics)
function trackEvent(eventName, eventData = {}) {
  // This function can be used to track user interactions
  // You can integrate with Google Analytics, Mixpanel, or any other analytics service

  const event = {
    name: eventName,
    data: eventData,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  // Log to console for development
  console.log("Event tracked:", event);

  // Here you would typically send this data to your analytics service
  // Example: gtag('event', eventName, eventData);
}

// Track important user interactions
document.addEventListener("DOMContentLoaded", function () {
  // Track page view
  trackEvent("page_view", {
    page_title: document.title,
    page_url: window.location.href,
  });

  // Track download button clicks
  const downloadButtons = document.querySelectorAll(".download-btn");
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const store = this.classList.contains("app-store")
        ? "app_store"
        : "google_play";
      trackEvent("download_click", {
        store: store,
        button_text: this.textContent.trim(),
      });
    });
  });

  // Track feature card interactions
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("click", function () {
      const featureName = this.querySelector("h3").textContent;
      trackEvent("feature_click", {
        feature: featureName,
      });
    });
  });

  // Track screenshot interactions
  const screenshots = document.querySelectorAll(".screenshot img");
  screenshots.forEach((screenshot, index) => {
    screenshot.addEventListener("click", function () {
      trackEvent("screenshot_click", {
        screenshot_index: index + 1,
        screenshot_alt: this.alt || "Screenshot " + (index + 1),
      });
    });
  });
});

// Performance monitoring
window.addEventListener("load", function () {
  // Track page load performance
  const loadTime = performance.now();
  trackEvent("page_load", {
    load_time: Math.round(loadTime),
    dom_content_loaded:
      performance.getEntriesByType("navigation")[0]?.domContentLoadedEventEnd ||
      0,
  });
});

// Error tracking
window.addEventListener("error", function (e) {
  trackEvent("javascript_error", {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno,
  });
});

// Add some interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll(".btn, .download-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
  .btn, .download-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
