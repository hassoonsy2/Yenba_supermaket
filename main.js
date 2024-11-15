// Import Three.js (if using modules)
import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Change Navbar Styling on Scroll
window.addEventListener('scroll', function () {
    const navigation = document.querySelector('.navigation-wrap');
    if (window.scrollY > 50) {
        navigation.classList.add('scroll-on');
    } else {
        navigation.classList.remove('scroll-on');
    }
});

// FAQ Accordion Interaction
document.querySelectorAll('.faq-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});

// Top Banner Video Background
function createVideoBackground(videoUrl) {
    const banner = document.querySelector('.top-banner');
    const video = document.createElement('video');
    video.src = videoUrl;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.zIndex = '-1';
    banner.appendChild(video);
}
createVideoBackground('assets/images/simitbaking.mp4');

// Back-to-Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Scroll-triggered Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    const triggerPoint = window.innerHeight * 0.8;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerPoint) {
            element.classList.add('animated');
        }
    });
};
window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Function to Initialize 3D Model Viewer
function initialize3DModelViewer(containerId, modelPath) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`3D container '${containerId}' not found.`);
        return;
    }

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load GLTF Model
    const loader = new THREE.GLTFLoader();
    loader.load(
        modelPath,
        function (gltf) {
            const model = gltf.scene;
            model.scale.set(2, 2, 2); // Adjust scale if needed
            model.position.set(0, -1, 0); // Adjust position if needed
            scene.add(model);

            // Animation loop to render the scene
            function animate() {
                requestAnimationFrame(animate);
                model.rotation.y += 0.01; // Rotate the model for a visual effect
                renderer.render(scene, camera);
            }
            animate();
        },
        undefined,
        function (error) {
            console.error(`An error occurred while loading the model from '${modelPath}':`, error);
        }
    );

    // Set the Camera Position
    camera.position.set(0, 1, 5);

    // Adjust renderer on window resize
    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
}

// Initialize 3D Model Viewers for Both Containers
initialize3DModelViewer('simit-3d-container', 'assets/images/Turkish_simit_1115163756_refine.glb');
initialize3DModelViewer('simit-3d-order-container', 'assets/images/pizza.glb');
