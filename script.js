// 3D Rose Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#roseCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Load 3D Model
let rose;
const loader = new THREE.GLTFLoader();
loader.load('assets/rose-3d.glb', (gltf) => {
    rose = gltf.scene;
    scene.add(rose);
    rose.position.y = -1;
});

camera.position.z = 5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    if (rose) rose.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Music Toggle
const music = document.getElementById('backgroundMusic');
document.getElementById('musicToggle').addEventListener('click', () => {
    music.paused ? music.play() : music.pause();
});

// Save Message to Local Storage
document.getElementById('saveMessage').addEventListener('click', () => {
    const message = {
        name: document.getElementById('userName').value,
        text: document.getElementById('customMessage').value
    };
    localStorage.setItem('roseDayMessage', JSON.stringify(message));
    alert('Message saved! 💖');
});

// Confetti Effect
function shootConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Surprise Messages
const surprises = [
    "You are loved beyond measure! 🌹",
    "Your smile makes the world brighter! 💖",
    "Roses are red, violets are blue...",
    "Someone is thinking about you right now! 😊"
];

document.getElementById('surpriseBtn').addEventListener('click', () => {
    const randomMessage = surprises[Math.floor(Math.random() * surprises.length)];
    shootConfetti();
    alert(randomMessage);
});

// Social Sharing
document.getElementById('shareBtn').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Rose Day 2024',
            text: 'Celebrate love with this beautiful Rose Day experience! 🌹',
            url: window.location.href
        });
    } else {
        alert("Sharing isn't supported in your browser.");
    }
});

// Countdown Timer
const countdownDate = new Date('February 7, 2024 00:00:00').getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML = 
        `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').innerHTML = "Happy Rose Day! 🌹";
        shootConfetti();
    }
}

const timerInterval = setInterval(updateTimer, 1000);