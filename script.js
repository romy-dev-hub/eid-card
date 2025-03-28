//code here 

// Star creation for both card and background
function createStars(containerId, countMultiplier = 1) {
    const starsContainer = document.getElementById(containerId);
    const baseCount = window.innerWidth < 768 ? 40 : 50;
    const starCount = Math.floor(baseCount * countMultiplier);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 1.5}s`;
        star.style.opacity = `${0.1 + Math.random() * 0.9}`;
        
        if (containerId === 'emojiBackground' && Math.random() > 0.9) {
            star.classList.add('shooting-star');
            star.style.animationDelay = `${Math.random() * 10}s`;
        }
        
        starsContainer.appendChild(star);
    }
}

// Particle effects for card flip
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 20 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `particle ${0.5 + Math.random() * 1}s ease-out forwards`;
        particlesContainer.appendChild(particle);
    }
}

// Card flip animation
function flipCard() {
    const card = document.querySelector('.card-container');
    const message = document.getElementById('message');
    
    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        createParticles();
        setTimeout(() => message.classList.add('show'), 500);
    }
}

// Floating emojis for background
function createFloatingEmojis() {
    const emojiContainer = document.getElementById('emojiBackground');
    const emojis = ['🌙', '🌟', '✨', '🕌', '☪️', '🕋', '🪔'];
    const emojiCount = window.innerWidth < 768 ? 15 : 25;

    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = `${Math.random() * 100}%`;
        emoji.style.setProperty('--duration', `${10 + Math.random() * 20}s`);
        emoji.style.setProperty('--scale', `${0.5 + Math.random() * 1}`);
        emoji.style.animationDelay = `${Math.random() * 5}s`;
        emojiContainer.appendChild(emoji);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    createStars('stars', 1);
    createStars('emojiBackground', 3);
    createFloatingEmojis();
});

// Touch support
document.querySelector('.card-container').addEventListener('touchstart', function(e) {
    e.preventDefault();
    flipCard();
}, { passive: false });

const wishes = [
    "Blessed Eid!",
    "Eid Mubarak! 🌙",
    "May Allah bless you!",
    "Joyous Celebration!",
    "Peace & Happiness!",
    "Eid Kareem! ✨"
];

function createLantern(x, y) {
    const container = document.getElementById('lanternContainer');
    
    // Create lantern
    const lantern = document.createElement('div');
    lantern.className = 'lantern';
    lantern.innerHTML = '🪔';
    lantern.style.left = `${x}px`;
    lantern.style.top = `${y}px`;
    
    // Create message
    const message = document.createElement('div');
    message.className = 'lantern-message';
    message.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    message.style.left = `${x + 20}px`;
    message.style.top = `${y - 30}px`;
    
    container.appendChild(lantern);
    container.appendChild(message);
    
    // Start animations
    setTimeout(() => {
        lantern.style.opacity = '1';
        message.style.opacity = '1';
    }, 50);

    // Remove elements after animation
    setTimeout(() => {
        lantern.remove();
        message.remove();
    }, 15000);
}

// Add click/touch handler
document.querySelector('.card-back').addEventListener('click', (e) => {
    if (!document.querySelector('.card-container').classList.contains('flipped')) return;
    
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createLantern(x, y);
});

// Add mobile touch support
let touchTimer;
document.querySelector('.card-back').addEventListener('touchstart', (e) => {
    touchTimer = setTimeout(() => {
        const touch = e.touches[0];
        const rect = e.target.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        createLantern(x, y);
    }, 100);
});

document.querySelector('.card-back').addEventListener('touchend', () => {
    clearTimeout(touchTimer);
});