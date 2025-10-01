// Google Analytics Event Tracking for Twin Wicks Digital Solutions
// This script adds comprehensive tracking for buttons, forms, and user interactions

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTracking);
    } else {
        initializeTracking();
    }
    
    function initializeTracking() {
        // Check if gtag is available
        if (typeof gtag === 'undefined') {
            console.warn('Google Analytics gtag not found. Event tracking disabled.');
            return;
        }
        
        console.log('Initializing Google Analytics event tracking...');
        
        // Track all important buttons and links
        trackButtons();
        trackFormInteractions();
        trackScrollDepth();
        trackPhoneClicks();
        trackEmailClicks();
        trackNavigationClicks();
    }
    
    // Track button clicks
    function trackButtons() {
        // Hero section buttons
        const getStartedBtn = document.querySelector('a[href="#contact"].btn-primary');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', function() {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': 'Hero Get Started',
                    'event_action': 'click'
                });
                console.log('Tracked: Hero Get Started button click');
            });
        }
        
        const viewWorkBtn = document.querySelector('a[href="#portfolio"].btn-secondary');
        if (viewWorkBtn) {
            viewWorkBtn.addEventListener('click', function() {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': 'Hero View Work',
                    'event_action': 'click'
                });
                console.log('Tracked: Hero View Work button click');
            });
        }
        
        // Portfolio CTA button
        const portfolioCTA = document.querySelector('.portfolio-cta .btn-primary');
        if (portfolioCTA) {
            portfolioCTA.addEventListener('click', function() {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': 'Portfolio View All Projects',
                    'event_action': 'click'
                });
                console.log('Tracked: Portfolio View All Projects button click');
            });
        }
        
        // Contact form submit button (tracked separately in form handler)
        const contactSubmit = document.querySelector('#contactForm button[type="submit"]');
        if (contactSubmit) {
            contactSubmit.addEventListener('click', function() {
                gtag('event', 'click', {
                    'event_category': 'Form',
                    'event_label': 'Contact Form Submit Button',
                    'event_action': 'click'
                });
                console.log('Tracked: Contact form submit button click');
            });
        }
    }
    
    // Track form interactions
    function trackFormInteractions() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        // Track form start (when user first interacts with form)
        let formStarted = false;
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                if (!formStarted) {
                    formStarted = true;
                    gtag('event', 'form_start', {
                        'event_category': 'Form',
                        'event_label': 'Contact Form',
                        'form_name': 'contact_form'
                    });
                    console.log('Tracked: Contact form started');
                }
            });
        });
        
        // Track service selection
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', function() {
                gtag('event', 'select_content', {
                    'event_category': 'Form',
                    'event_label': 'Service Selected',
                    'content_type': 'service',
                    'item_id': this.value
                });
                console.log('Tracked: Service selected -', this.value);
            });
        }
        
        // Track form abandonment (user leaves without submitting)
        let formAbandoned = false;
        window.addEventListener('beforeunload', function() {
            if (formStarted && !formAbandoned && !isFormComplete()) {
                gtag('event', 'form_abandon', {
                    'event_category': 'Form',
                    'event_label': 'Contact Form',
                    'form_name': 'contact_form'
                });
                console.log('Tracked: Contact form abandoned');
            }
        });
        
        // Track successful form submission (this is handled in the existing ContactFormHandler)
        // We're adding a backup tracker here
        contactForm.addEventListener('submit', function() {
            formAbandoned = false; // Prevent abandonment tracking
            // The main form submission tracking is in the ContactFormHandler
        });
    }
    
    // Check if form is complete
    function isFormComplete() {
        const form = document.getElementById('contactForm');
        if (!form) return false;
        
        const requiredFields = form.querySelectorAll('[required]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                return false;
            }
        }
        return true;
    }
    
    // Track scroll depth
    function trackScrollDepth() {
        let scrollDepths = [25, 50, 75, 100];
        let trackedDepths = [];
        
        window.addEventListener('scroll', throttle(function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            scrollDepths.forEach(function(depth) {
                if (scrollPercent >= depth && trackedDepths.indexOf(depth) === -1) {
                    trackedDepths.push(depth);
                    gtag('event', 'scroll', {
                        'event_category': 'Engagement',
                        'event_label': 'Scroll Depth',
                        'value': depth,
                        'custom_parameter_1': depth + '%'
                    });
                    console.log('Tracked: Scroll depth -', depth + '%');
                }
            });
        }, 250));
    }
    
    // Track phone number clicks
    function trackPhoneClicks() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"], .footer-contact p');
        phoneLinks.forEach(function(link) {
            if (link.textContent.includes('+1 (847) 732-7324')) {
                link.addEventListener('click', function() {
                    gtag('event', 'click', {
                        'event_category': 'Contact',
                        'event_label': 'Phone Number',
                        'event_action': 'click'
                    });
                    console.log('Tracked: Phone number click');
                });
            }
        });
    }
    
    // Track email clicks
    function trackEmailClicks() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"], .footer-contact p');
        emailLinks.forEach(function(link) {
            if (link.textContent.includes('support@twin-wicks.com')) {
                link.addEventListener('click', function() {
                    gtag('event', 'click', {
                        'event_category': 'Contact',
                        'event_label': 'Email Address',
                        'event_action': 'click'
                    });
                    console.log('Tracked: Email address click');
                });
            }
        });
    }
    
    // Track navigation clicks
    function trackNavigationClicks() {
        const navLinks = document.querySelectorAll('nav a, .nav-links a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                const linkText = this.textContent.trim();
                const href = this.getAttribute('href');
                
                gtag('event', 'click', {
                    'event_category': 'Navigation',
                    'event_label': linkText,
                    'event_action': 'click',
                    'page_location': href
                });
                console.log('Tracked: Navigation click -', linkText);
            });
        });
    }
    
    // Utility function to throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Track page view with additional context
    gtag('event', 'page_view', {
        'event_category': 'Engagement',
        'event_label': 'Page Load',
        'page_title': document.title,
        'page_location': window.location.href
    });
    console.log('Tracked: Page view');
    
})();

// Enhanced Contact Form Handler with better analytics integration
// This enhances the existing ContactFormHandler
document.addEventListener('DOMContentLoaded', function() {
    // Find the existing contact form
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Override the existing form submission to add more detailed tracking
    const originalSubmitHandler = contactForm.onsubmit;
    
    contactForm.addEventListener('submit', function(e) {
        // Track form submission attempt
        const formData = new FormData(this);
        const serviceSelected = formData.get('service');
        
        gtag('event', 'form_submit_attempt', {
            'event_category': 'Form',
            'event_label': 'Contact Form',
            'service_type': serviceSelected,
            'form_name': 'contact_form'
        });
        
        console.log('Tracked: Contact form submission attempt');
    });
});

// Track intake form button clicks (if present)
document.addEventListener('DOMContentLoaded', function() {
    // Look for intake form links/buttons
    const intakeLinks = document.querySelectorAll('a[href*="intake"]');
    intakeLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            gtag('event', 'click', {
                'event_category': 'CTA',
                'event_label': 'Intake Form Link',
                'event_action': 'click'
            });
            console.log('Tracked: Intake form link click');
        });
    });
});

