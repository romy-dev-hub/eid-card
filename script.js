//code here

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
        
        // 10% chance to be a shooting star (background only)
        if (containerId === 'emojiBackground' && Math.random() > 0.9) {
            star.classList.add('shooting-star');
            star.style.animationDelay = `${Math.random() * 10}s`;
        }
        
        starsContainer.appendChild(star);
    }
}

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

function flipCard() {
    const card = document.querySelector('.card-container');
    const message = document.getElementById('message');
    
    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        createParticles();
        setTimeout(() => message.classList.add('show'), 500);
    }
}

function shareCard(e) {
    e.stopPropagation();
    console.log("Share function triggered"); // Debug log
    
    if (navigator.share) {
        console.log("Web Share API supported");
        navigator.share({
            title: 'Eid Mubarak Greetings',
            text: 'Wishing you a blessed Eid!',
            url: window.location.href
        }).catch(err => {
            console.error('Error sharing:', err); // Log errors
            copyToClipboard(); // Fallback
        });
    } else {
        console.log("Web Share API not supported, using fallback");
        copyToClipboard(); // Fallback to clipboard
    }
}

function copyToClipboard() {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    
    alert('Link copied to clipboard! You can now share it.');
}

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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createStars('stars', 1); // Front card stars
    createStars('emojiBackground', 3); // Background stars (3x more)
    createFloatingEmojis();
});

// Add touch support
document.querySelector('.card-container').addEventListener('touchstart', function(e) {
    e.preventDefault();
    flipCard();
}, { passive: false });