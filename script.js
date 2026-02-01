// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeFloatingHearts();
    setupEventListeners();
    setupMusicPlayer();
});

// ========================================
// FLOATING HEARTS BACKGROUND
// ========================================
function initializeFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['💖', '💕', '💗', '💓', '💝', '❤️', '🌹'];

    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        createFloatingHeart(heartsContainer, heartSymbols);
    }

    // Continuously create hearts
    setInterval(() => {
        createFloatingHeart(heartsContainer, heartSymbols);
    }, 800);
}

function createFloatingHeart(container, symbols) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';

    container.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Start button
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            transitionToScreen('journeyScreen1');
        });
    }

    // Journey navigation buttons
    const nextBtn1 = document.getElementById('nextBtn1');
    if (nextBtn1) {
        nextBtn1.addEventListener('click', () => {
            transitionToScreen('journeyScreen2');
        });
    }

    const nextBtn2 = document.getElementById('nextBtn2');
    if (nextBtn2) {
        nextBtn2.addEventListener('click', () => {
            transitionToScreen('questionScreen');
        });
    }

    // Yes/No buttons
    const yesBtn = document.getElementById('yesBtn');
    if (yesBtn) {
        yesBtn.addEventListener('click', handleYesClick);
    }

    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.addEventListener('click', handleNoClick);
    }
}

// ========================================
// SCREEN TRANSITIONS
// ========================================
function transitionToScreen(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(screenId);

    if (currentScreen) {
        currentScreen.classList.remove('active');
    }

    if (nextScreen) {
        setTimeout(() => {
            nextScreen.classList.add('active');
        }, 300);
    }
}

// ========================================
// BUTTON HANDLERS
// ========================================
function handleYesClick() {
    // Add extra celebration effect
    createSparkles();

    // Transition to success screen
    setTimeout(() => {
        transitionToScreen('successScreen');
        createConfetti();
    }, 500);
}

function handleNoClick() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');

    // Make "No" button shrink and move away
    const moveAmount = Math.random() * 200 - 100;
    noBtn.style.transform = `translateX(${moveAmount}px) scale(0.9)`;

    // Make "Yes" button grow and more attractive
    yesBtn.style.transform = 'scale(1.1)';

    // Change "No" button text
    const noTexts = [
        'Are you sure?',
        'Think again!',
        'Really? 🥺',
        'Give it a chance!',
        'Please? 💖'
    ];

    const randomText = noTexts[Math.floor(Math.random() * noTexts.length)];
    noBtn.querySelector('span').textContent = randomText;

    // Reset after a moment
    setTimeout(() => {
        noBtn.style.transform = '';
        yesBtn.style.transform = '';
    }, 1000);
}

// ========================================
// VISUAL EFFECTS
// ========================================
function createSparkles() {
    const yesBtn = document.getElementById('yesBtn');
    const sparklesContainer = yesBtn.querySelector('.sparkles');

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.background = 'white';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';

        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        sparkle.style.left = '50%';
        sparkle.style.top = '50%';
        sparkle.style.animation = `sparkleOut 0.8s ease-out forwards`;
        sparkle.style.transform = `translate(${tx}px, ${ty}px)`;
        sparkle.style.opacity = '0';

        sparklesContainer.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 800);
    }
}

function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#ffc1e3', '#c44569', '#a29bfe', '#f8b195'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() + 's';

            // Random shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }

            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// ========================================
// ADDITIONAL ANIMATIONS
// ========================================
// Add sparkle animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleOut {
        from {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
        }
    }
    
    .sparkles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// ========================================
// MUSIC PLAYER
// ========================================
function setupMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;

    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.querySelector('.music-text').textContent = 'Play Music';
                isPlaying = false;
            } else {
                // Play music with user interaction
                backgroundMusic.play().catch(error => {
                    console.log('Music playback requires user interaction:', error);
                });
                musicToggle.classList.add('playing');
                musicToggle.querySelector('.music-text').textContent = 'Now Playing';
                isPlaying = true;
            }
        });
    }
}
