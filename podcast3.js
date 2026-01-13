// 1. Inspiration Auto Rotate
const galleryImg = document.getElementById('auto-gallery-img');
const images = [
    "images/13.jpg",
    "images/14.jpg",
    "images/12.jpg",
    "images/11.jpg"
];
let currentIndex = 0;
function autoRotate() {
    galleryImg.style.opacity = 0;
    setTimeout(() => { 
        currentIndex = (currentIndex + 1) % images.length;
        galleryImg.src = images[currentIndex];
        galleryImg.style.opacity = 1;
    }, 500);
}
setInterval(autoRotate, 3000);


// 2. Audio Player Logic
let updateInterval;

function togglePlay(vinylId, audioId, btn, event) {
    if(event) event.stopPropagation();

    const vinyl = document.getElementById(vinylId);
    const audio = document.getElementById(audioId);
    const controls = vinyl.querySelector('.audio-controls');
    const playBtn = vinyl.querySelector('.play-btn');
    
    const iconPause = controls.querySelector('.icon-pause');
    const iconPlay = controls.querySelector('.icon-play');
    
    document.querySelectorAll('audio').forEach(a => {
        if(a.id !== audioId) {
            a.pause();
            a.currentTime = 0;
            const v = a.closest('.vinyl-set');
            v.classList.remove('active');
            v.querySelector('.play-btn').style.display = 'inline-flex'; 
            v.querySelector('.audio-controls').style.display = 'none';
        }
    });

    if (audio.paused) {
        audio.play();
        vinyl.classList.add('active'); 
        playBtn.style.display = 'none';
        controls.style.display = 'flex';
        
        iconPause.style.display = 'block';
        iconPlay.style.display = 'none';
        
        updateInterval = setInterval(() => updateProgress(audio, controls), 500);
    } else {
        audio.pause();
        clearInterval(updateInterval);
        iconPause.style.display = 'none';
        iconPlay.style.display = 'block';
    }
}

function updateProgress(audio, controls) {
    const progressBar = controls.querySelector('.progress-bar');
    const timeDisplay = controls.querySelector('.time-display');
    const iconPause = controls.querySelector('.icon-pause');
    const iconPlay = controls.querySelector('.icon-play');
    
    if (!isNaN(audio.duration)) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        timeDisplay.textContent = formatTime(audio.currentTime); 
    }
    
    if(audio.ended) {
        clearInterval(updateInterval);
        iconPause.style.display = 'none';
        iconPlay.style.display = 'block';
        progressBar.value = 0;
    } else if (!audio.paused) {
        iconPause.style.display = 'block';
        iconPlay.style.display = 'none';
    }
}

function seekAudio(audioId, rangeInput) {
    const audio = document.getElementById(audioId);
    const seekTime = (rangeInput.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// 3. Vinyl Click Toggle
function toggleVinyl(id) {
    const element = document.getElementById(id);
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        document.querySelectorAll('.vinyl-set').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
    }
}

// 3. FAQ Toggle (Accordion Style)
function toggleFaq(element) {
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        element.classList.add('active');
    }
}
// 5. Contact Form
const contactForm = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactForm.style.opacity = '0';
    setTimeout(() => {
        contactForm.style.display = 'none';
        feedback.style.display = 'block';
    }, 500);
});

// 6. Scroll Reveal & Nav Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// 修改后的观察者列表，增加了 .trailer-header 和 .video-canvas-wrapper
document.querySelectorAll('.team-card, .vinyl-set, .text, .faq-item, .trailer-header, .video-canvas-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)'; // 稍微增加位移感
    el.style.transition = 'opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
    observer.observe(el);
});