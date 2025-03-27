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

// Universal share function 
function shareCard(e) {
    e.stopPropagation();
    
    // Always show the share options on mobile (bypass Web Share API)
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        showShareOptions();
    } 
    // Use Web Share API only on supported browsers (Desktop Chrome/Edge)
    else if (navigator.share) {
        navigator.share({
            title: 'Eid Mubarak Greetings',
            text: 'Wishing you a blessed Eid!',
            url: window.location.href
        }).catch(() => showShareOptions()); // Fallback if Web Share fails
    } else {
        showShareOptions(); // Fallback for unsupported browsers
    }
}

function showShareOptions() {
    // Create share dialog
    const shareDialog = document.createElement('div');
    shareDialog.style.position = 'fixed';
    shareDialog.style.top = '0';
    shareDialog.style.left = '0';
    shareDialog.style.width = '100%';
    shareDialog.style.height = '100%';
    shareDialog.style.backgroundColor = 'rgba(0,0,0,0.8)';
    shareDialog.style.zIndex = '1000';
    shareDialog.style.display = 'flex';
    shareDialog.style.flexDirection = 'column';
    shareDialog.style.justifyContent = 'center';
    shareDialog.style.alignItems = 'center';

    shareDialog.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; width: 80%; max-width: 300px;">
            <h3 style="color: #0a3d62; margin-bottom: 15px; font-size: 1.2rem;">Share Eid Greetings</h3>
            <button onclick="shareVia('whatsapp')" style="background: #25D366; color: white; border: none; padding: 12px; border-radius: 8px; margin: 8px 0; width: 100%; font-size: 1rem; cursor: pointer;">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </button>
            <button onclick="shareVia('messenger')" style="background: #006AFF; color: white; border: none; padding: 12px; border-radius: 8px; margin: 8px 0; width: 100%; font-size: 1rem; cursor: pointer;">
                <i class="fab fa-facebook-messenger"></i> Messenger
            </button>
            <button onclick="shareVia('facebook')" style="background: #4267B2; color: white; border: none; padding: 12px; border-radius: 8px; margin: 8px 0; width: 100%; font-size: 1rem; cursor: pointer;">
                <i class="fab fa-facebook"></i> Facebook
            </button>
            <button onclick="copyToClipboard()" style="background: #0a3d62; color: white; border: none; padding: 12px; border-radius: 8px; margin: 8px 0; width: 100%; font-size: 1rem; cursor: pointer;">
                <i class="fas fa-copy"></i> Copy Link
            </button>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #e74c3c; color: white; border: none; padding: 12px; border-radius: 8px; margin-top: 15px; width: 100%; font-size: 1rem; cursor: pointer;">
                Close
            </button>
        </div>
    `;

    document.body.appendChild(shareDialog);
}

function shareVia(platform) {
    const text = 'Eid Mubarak! 🌙 Wishing you a blessed Eid. Check this greeting card: ';
    const url = window.location.href;
    
    let shareUrl;
    switch(platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + url)}`;
            break;
        case 'messenger':
            shareUrl = `fb-messenger://share/?link=${encodeURIComponent(url)}`;
            // Fallback to Facebook if Messenger app not installed
            setTimeout(() => {
                if (!document.hidden) {
                    window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&redirect_uri=${encodeURIComponent(url)}`, '_blank');
                }
            }, 250);
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
    }

    window.open(shareUrl, '_blank');
    document.querySelector('div[style*="position: fixed; top: 0"]')?.remove();
}


function copyToClipboard() {
    const dummy = document.createElement('textarea');
    dummy.value = window.location.href;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    
    const toast = document.createElement('div');
    toast.textContent = 'Link copied to clipboard!';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#0a3d62';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '20px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
    document.querySelector('div[style*="position: fixed; top: 0"]')?.remove();
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