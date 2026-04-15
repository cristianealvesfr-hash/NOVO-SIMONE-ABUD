// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionBody = accordionItem.querySelector('.accordion-body');
            const isActive = accordionItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-body').style.maxHeight = null;
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                accordionItem.classList.add('active');
                accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
            }
        });
    });

    // Initialize first accordion body height
    const firstAccordionItem = document.querySelector('.accordion-item.active');
    if(firstAccordionItem) {
        const body = firstAccordionItem.querySelector('.accordion-body');
        body.style.maxHeight = body.scrollHeight + "px";
    }

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // 4. Header Scroll Effect (Sticky Header)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // 5. LGPD Banner Logic
    const lgpdBanner = document.getElementById('lgpd-banner');
    const lgpdAccept = document.getElementById('lgpd-accept');

    if (lgpdBanner && lgpdAccept) {
        // Check if user already accepted
        if (!localStorage.getItem('lgpdConsent')) {
            // Delay to show explicitly
            setTimeout(() => {
                lgpdBanner.classList.add('show');
            }, 500);
        }

        lgpdAccept.addEventListener('click', () => {
            localStorage.setItem('lgpdConsent', 'true');
            // Hide smoothly
            lgpdBanner.style.opacity = '0';
            lgpdBanner.style.transform = 'translateY(100%)';
            setTimeout(() => {
                lgpdBanner.style.display = 'none';
            }, 500);
        });
    }

});
