// Main JavaScript file for Gunjan Chimariya's Personal Homepage

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initTypewriter();
    initScrollReveal();
    initStatsCounter();
    initSkillsChart();
    initSkillBars();
    initCertificationCards();
    initSmoothScrolling();
    initTimelineAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Typewriter Effect for Hero Section
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'I secure digital infrastructures',
                'I protect against cyber threats',
                'I build robust security systems',
                'I solve complex IT challenges'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: false
        });
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all elements with section-reveal class
    document.querySelectorAll('.section-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Animated Statistics Counter
function initStatsCounter() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                anime({
                    targets: counter,
                    innerHTML: [0, target],
                    duration: 2000,
                    delay: 200,
                    round: 1,
                    easing: 'easeOutExpo'
                });
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Skills Radar Chart
function initSkillsChart() {
    const chartElement = document.getElementById('skills-chart');
    if (!chartElement) return;

    const chart = echarts.init(chartElement);
    
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: [
                { name: 'Cybersecurity', max: 100 },
                { name: 'Cloud Platforms', max: 100 },
                { name: 'Scripting', max: 100 },
                { name: 'Networking', max: 100 },
                { name: 'Databases', max: 100 },
                { name: 'System Admin', max: 100 }
            ],
            axisName: {
                color: '#8B949E',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: '#30363D'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#30363D'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: [85, 80, 75, 70, 65, 90],
                name: 'Skills Proficiency',
                areaStyle: {
                    color: 'rgba(88, 166, 255, 0.1)'
                },
                lineStyle: {
                    color: '#58A6FF',
                    width: 2
                },
                itemStyle: {
                    color: '#58A6FF'
                }
            }]
        }]
    };

    chart.setOption(option);
    
    // Make chart responsive
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                anime({
                    targets: bar,
                    width: width + '%',
                    duration: 1500,
                    delay: 300,
                    easing: 'easeOutExpo'
                });
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Certification Card Flip
function initCertificationCards() {
    const cards = document.querySelectorAll('.certification-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                
                anime({
                    targets: item.querySelector('.timeline-node'),
                    scale: [0, 1],
                    duration: 600,
                    easing: 'easeOutBack'
                });
                
                anime({
                    targets: item.querySelector('.bg-gray-800'),
                    translateX: [50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    delay: 200,
                    easing: 'easeOutExpo'
                });
                
                timelineObserver.unobserve(item);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Utility function for debouncing
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Reinitialize charts on resize
    const chartElement = document.getElementById('skills-chart');
    if (chartElement && echarts.getInstanceByDom(chartElement)) {
        echarts.getInstanceByDom(chartElement).resize();
    }
}, 250));

// Add loading animation
window.addEventListener('load', function() {
    // Fade in the page content
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuart'
    });
});

// Handle form submissions (for future contact form)
function handleFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
}

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    }
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({ entryTypes: ['navigation'] });
}