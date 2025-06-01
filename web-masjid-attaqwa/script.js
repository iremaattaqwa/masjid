// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active Navigation Link Highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Automatic Prayer Times Update
async function getPrayerTimes() {
    try {
        // Koordinat Kecamatan Rawamerta, Karawang
        const latitude = -6.3847567;
        const longitude = 107.3647893;
        
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const response = await fetch(`https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=3`);
        const data = await response.json();

        if (data.code === 200) {
            const timings = data.data.timings;
            
            // Update waktu sholat di halaman
            document.querySelector('.time-box:nth-child(1) .prayer-time').textContent = timings.Fajr;
            document.querySelector('.time-box:nth-child(2) .prayer-time').textContent = timings.Sunrise;
            document.querySelector('.time-box:nth-child(3) .prayer-time').textContent = timings.Dhuhr;
            document.querySelector('.time-box:nth-child(4) .prayer-time').textContent = timings.Asr;
            document.querySelector('.time-box:nth-child(5) .prayer-time').textContent = timings.Maghrib;
            document.querySelector('.time-box:nth-child(6) .prayer-time').textContent = timings.Isha;

            // Tambahkan animasi update
            const timeBoxes = document.querySelectorAll('.time-box');
            timeBoxes.forEach(box => {
                box.style.animation = 'fadeIn 0.5s ease-in-out';
            });
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
    }
}

// Update jadwal sholat setiap 1 jam
getPrayerTimes(); // Initial call
setInterval(getPrayerTimes, 3600000); // Update every hour

// Prayer Times Animation
const timeBoxes = document.querySelectorAll('.time-box');

timeBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-10px)';
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateY(0)';
    });
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Add fade-in animation to elements as they enter viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-trigger').forEach(element => {
    observer.observe(element);
});