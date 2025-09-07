/**
 * Northside Framing Gallery Module
 * Provides accessible image gallery functionality with keyboard navigation
 * and screen reader support following WCAG 2.1 AA guidelines
 */
(function() {
    'use strict';
    
    /**
     * Gallery configuration and state management
     */
    const Gallery = {
        // Gallery images array with actual photos
        images: [
            {
                src: 'photos/1.jpg',
                alt: 'Custom framing work sample showcasing professional matting and frame selection',
                title: 'Professional Custom Framing Sample 1'
            },
            {
                src: 'photos/2.jpg', 
                alt: 'Art restoration and framing project showing expert craftsmanship',
                title: 'Expert Framing and Restoration Work'
            },
            {
                src: 'photos/3.jpg',
                alt: 'Detailed view of custom framing techniques and materials',
                title: 'Custom Framing Techniques'
            },
            {
                src: 'photos/4.jpg',
                alt: 'Gallery display of completed framing projects',
                title: 'Completed Framing Projects'
            },
            {
                src: 'photos/5.jpg',
                alt: 'Professional framing work showcasing attention to detail',
                title: 'Quality Framing Craftsmanship'
            },
            {
                src: 'photos/6.jpg',
                alt: 'Custom frame designs and restoration examples',
                title: 'Custom Design and Restoration'
            },
            {
                src: 'photos/7.jpg',
                alt: 'Additional custom framing work demonstrating professional quality',
                title: 'Professional Framing Sample 7'
            },
            {
                src: 'photos/8.jpg',
                alt: 'Custom framing project showcasing artistic presentation',
                title: 'Artistic Framing Display 8'
            },
            {
                src: 'photos/9.jpg',
                alt: 'Expert craftsmanship in frame selection and matting',
                title: 'Expert Framing Craftsmanship 9'
            },
            {
                src: 'photos/10.jpg',
                alt: 'Professional framing work with detailed attention to presentation',
                title: 'Professional Framing Sample 10'
            },
            {
                src: 'photos/11.jpg',
                alt: 'Custom framing techniques demonstrating quality workmanship',
                title: 'Quality Custom Framing 11'
            },
            {
                src: 'photos/12.jpg',
                alt: 'Artistic framing project with professional finishing',
                title: 'Artistic Framing Project 12'
            },
            {
                src: 'photos/13.jpg',
                alt: 'Custom frame design showcasing attention to detail',
                title: 'Custom Frame Design 13'
            },
            {
                src: 'photos/14.jpg',
                alt: 'Professional framing work with expert matting selection',
                title: 'Expert Matting and Framing 14'
            },
            {
                src: 'photos/15.jpg',
                alt: 'Quality framing project demonstrating skilled craftsmanship',
                title: 'Skilled Framing Craftsmanship 15'
            },
            {
                src: 'photos/16.jpg',
                alt: 'Custom framing work with professional presentation techniques',
                title: 'Professional Presentation 16'
            },
            {
                src: 'photos/17.jpg',
                alt: 'Artistic framing project showcasing creative design solutions',
                title: 'Creative Framing Solutions 17'
            },
            {
                src: 'photos/18.jpg',
                alt: 'Expert framing work demonstrating quality materials and techniques',
                title: 'Quality Materials and Techniques 18'
            },
            {
                src: 'photos/19.jpg',
                alt: 'Professional custom framing with detailed craftsmanship',
                title: 'Detailed Custom Framing 19'
            },
            {
                src: 'photos/20.jpg',
                alt: 'Custom framing project showing expert attention to detail',
                title: 'Expert Detail Work 20'
            },
            {
                src: 'photos/21.jpg',
                alt: 'Professional framing work with artistic presentation',
                title: 'Artistic Professional Framing 21'
            },
            {
                src: 'photos/22.jpg',
                alt: 'Custom framing sample demonstrating quality workmanship and design',
                title: 'Quality Workmanship and Design 22'
            }
        ],
        
        currentIndex: 0,
        modal: null,
        image: null,
        closeBtn: null,
        prevBtn: null,
        nextBtn: null,
        trigger: null,
        startX: null,
        startY: null,
        
        /**
         * Initialize gallery functionality
         * Sets up event listeners and DOM references
         */
        init: function() {
            this.cacheElements();
            this.bindEvents();
            this.setupKeyboardNavigation();
            this.setupTouchNavigation();
        },
        
        /**
         * Cache DOM elements for performance
         */
        cacheElements: function() {
            this.modal = document.getElementById('gallery-modal');
            this.image = document.getElementById('gallery-image');
            this.closeBtn = document.getElementById('gallery-close');
            this.prevBtn = document.getElementById('gallery-prev');
            this.nextBtn = document.getElementById('gallery-next');
            this.trigger = document.getElementById('gallery-trigger');
        },
        
        /**
         * Bind click events to gallery controls
         */
        bindEvents: function() {
            if (this.trigger) {
                this.trigger.addEventListener('click', this.open.bind(this));
            }
            
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', this.close.bind(this));
            }
            
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', this.previous.bind(this));
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', this.next.bind(this));
            }
            
            // Close modal when clicking outside content
            if (this.modal) {
                this.modal.addEventListener('click', function(e) {
                    if (e.target === this.modal) {
                        this.close();
                    }
                }.bind(this));
            }
        },
        
        /**
         * Setup keyboard navigation for accessibility
         * Handles Escape, Arrow keys, and Tab management
         */
        setupKeyboardNavigation: function() {
            document.addEventListener('keydown', function(e) {
                if (!this.modal.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previous();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.next();
                        break;
                    case 'Tab':
                        this.handleTabKey(e);
                        break;
                }
            }.bind(this));
        },
        
        /**
         * Handle tab key navigation within modal
         * Implements focus trapping for accessibility
         * @param {KeyboardEvent} e - The keyboard event
         */
        handleTabKey: function(e) {
            const focusableElements = this.modal.querySelectorAll(
                'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        },
        
        /**
         * Open gallery modal and display first image
         * @param {Event} e - The click event
         */
        open: function(e) {
            e.preventDefault();
            this.currentIndex = 0;
            this.updateImage();
            this.modal.classList.add('active');
            
            // Set focus to close button for accessibility
            this.closeBtn.focus();
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            
            // Announce to screen readers
            this.announceToScreenReader('Gallery opened. Use arrow keys to navigate images.');
        },
        
        /**
         * Close gallery modal
         */
        close: function() {
            this.modal.classList.remove('active');
            
            // Return focus to trigger element
            if (this.trigger) {
                this.trigger.focus();
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Announce to screen readers
            this.announceToScreenReader('Gallery closed.');
        },
        
        /**
         * Navigate to previous image
         */
        previous: function() {
            this.currentIndex = this.currentIndex > 0 ? 
                this.currentIndex - 1 : 
                this.images.length - 1;
            this.updateImage();
            this.announceImageChange();
        },
        
        /**
         * Navigate to next image
         */
        next: function() {
            this.currentIndex = this.currentIndex < this.images.length - 1 ? 
                this.currentIndex + 1 : 
                0;
            this.updateImage();
            this.announceImageChange();
        },
        
        /**
         * Update displayed image and accessibility attributes
         */
        updateImage: function() {
            const currentImage = this.images[this.currentIndex];
            
            if (currentImage && this.image) {
                this.image.src = currentImage.src;
                this.image.alt = currentImage.alt;
                this.image.title = currentImage.title;
                
                // Update image loading state for better UX
                this.image.style.opacity = '0.5';
                
                this.image.onload = function() {
                    this.style.opacity = '1';
                };
                
                this.image.onerror = function() {
                    this.alt = 'Image could not be loaded. Please try again later.';
                    this.style.opacity = '1';
                };
            }
        },
        
        /**
         * Announce image change to screen readers
         */
        announceImageChange: function() {
            const currentImage = this.images[this.currentIndex];
            const announcement = `Image ${this.currentIndex + 1} of ${this.images.length}: ${currentImage.title}`;
            this.announceToScreenReader(announcement);
        },
        
        /**
         * Create live region announcement for screen readers
         * @param {string} message - Message to announce
         */
        announceToScreenReader: function(message) {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'visually-hidden';
            announcement.textContent = message;
            
            document.body.appendChild(announcement);
            
            // Remove after announcement
            setTimeout(function() {
                document.body.removeChild(announcement);
            }, 1000);
        },

        /**
         * Setup touch navigation for mobile devices
         * Implements swipe gestures for gallery navigation
         */
        setupTouchNavigation: function() {
            if (!this.modal) return;

            this.modal.addEventListener('touchstart', function(e) {
                this.startX = e.touches[0].clientX;
                this.startY = e.touches[0].clientY;
            }.bind(this), { passive: true });

            this.modal.addEventListener('touchend', function(e) {
                if (!this.startX || !this.startY) return;
                if (!this.modal.classList.contains('active')) return;

                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = this.startX - endX;
                const diffY = this.startY - endY;

                // Check if horizontal swipe is more significant than vertical
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    // Minimum swipe distance threshold
                    if (Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            // Swipe left - next image
                            this.next();
                        } else {
                            // Swipe right - previous image
                            this.previous();
                        }
                    }
                }

                // Reset touch coordinates
                this.startX = null;
                this.startY = null;
            }.bind(this), { passive: true });
        }
    };
    
    /**
     * Initialize gallery when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', Gallery.init.bind(Gallery));
    } else {
        Gallery.init();
    }
    
    // Expose Gallery object for potential external use
    window.NorthsideFramingGallery = Gallery;
    
})();