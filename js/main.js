// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Scroll header effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
        
        // Close other open items
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.parentElement.classList.remove('active');
            }
        });
    });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Pricing Toggle
const pricingToggle = document.getElementById('pricingToggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');

pricingToggle.addEventListener('change', () => {
    if (pricingToggle.checked) {
        monthlyPrices.forEach(price => price.style.display = 'none');
        annualPrices.forEach(price => price.style.display = 'inline');
    } else {
        monthlyPrices.forEach(price => price.style.display = 'inline');
        annualPrices.forEach(price => price.style.display = 'none');
    }
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial Slider
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let slider = document.querySelector('.testimonial-slider');

slider.addEventListener('mousedown', dragStart);
slider.addEventListener('touchstart', dragStart);
slider.addEventListener('mouseup', dragEnd);
slider.addEventListener('mouseleave', dragEnd);
slider.addEventListener('touchend', dragEnd);
slider.addEventListener('mousemove', drag);
slider.addEventListener('touchmove', drag);

function dragStart(e) {
    if (e.type === 'touchstart') {
        startPos = e.touches[0].clientX;
    } else {
        startPos = e.clientX;
        e.preventDefault();
    }
    
    isDragging = true;
    slider.style.cursor = 'grabbing';
    slider.style.scrollBehavior = 'auto';
}

function drag(e) {
    if (!isDragging) return;
    
    let currentPosition;
    if (e.type === 'touchmove') {
        currentPosition = e.touches[0].clientX;
    } else {
        currentPosition = e.clientX;
    }
    
    const diff = currentPosition - startPos;
    slider.scrollLeft = slider.scrollLeft - diff;
    startPos = currentPosition;
}

function dragEnd() {
    isDragging = false;
    slider.style.cursor = 'grab';
    slider.style.scrollBehavior = 'smooth';
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log({ name, email, subject, message });
        
        // Show success message
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        
        // Reset form
        contactForm.reset();
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input').value;
        
        // Here you would typically send the email to a server
        console.log('Subscribed email:', email);
        
        // Show success message
        alert('¡Gracias por suscribirte a nuestro boletín!');
        
        // Reset form
        this.querySelector('input').value = '';
    });
}