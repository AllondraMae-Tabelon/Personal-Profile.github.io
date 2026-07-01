// ===== TYPED TEXT EFFECT =====
const typedText = document.getElementById('typed-text');
const words = [
    'Computer Science Student',
    'Full-Stack Developer',
    'Problem Solver',
    'Tech Enthusiast'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const message = document.getElementById('senderMessage').value;
    const sendBtn = document.getElementById('sendBtn');
    const statusDiv = document.getElementById('messageStatus');
    
    // Disable button and show loading
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    statusDiv.style.display = 'block';
    statusDiv.className = 'status-loading';
    statusDiv.textContent = 'Sending your message...';
    
    try {
        // Save to Firebase
        await messagesCollection.add({
            name: name,
            email: email,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            read: false
        });
        
        // Success
        statusDiv.className = 'status-success';
        statusDiv.textContent = '✅ Message sent successfully! I will get back to you soon.';
        document.getElementById('contactForm').reset();
        
    } catch (error) {
        console.error('Error sending message:', error);
        statusDiv.className = 'status-error';
        statusDiv.textContent = '❌ Failed to send message. Please try again later.';
    }
    
    // Re-enable button
    sendBtn.disabled = false;
    sendBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    
    // Auto-hide status after 5 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);
});

// ===== LOAD DATA FROM FIREBASE =====
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load Trainings
        const trainingsSnapshot = await trainingsCollection.orderBy('year', 'desc').get();
        const trainingGrid = document.getElementById('trainingGrid');
        
        if (trainingsSnapshot.empty) {
            // If no data in Firebase, show static data
            trainingGrid.innerHTML = `
                <div class="training-card">
                    <div class="training-icon"><i class="fas fa-database"></i></div>
                    <h3>Data Science Essential with Python</h3>
                    <p>Comprehensive training covering data analysis, visualization, machine learning fundamentals, and Python programming for data science applications.</p>
                    <div class="training-meta">
                        <span><i class="fas fa-calendar-alt"></i> 2025</span>
                        <span><i class="fas fa-certificate"></i> Certificate</span>
                    </div>
                </div>
                <div class="training-card">
                    <div class="training-icon"><i class="fas fa-robot"></i></div>
                    <h3>Introduction to Natural Language Processing</h3>
                    <p>In-depth exploration of NLP techniques including tokenization, sentiment analysis, language modeling, and practical applications using modern libraries.</p>
                    <div class="training-meta">
                        <span><i class="fas fa-calendar-alt"></i> 2025</span>
                        <span><i class="fas fa-certificate"></i> Certificate</span>
                    </div>
                </div>
                <div class="training-card">
                    <div class="training-icon"><i class="fas fa-tasks"></i></div>
                    <h3>Scrum Foundation Professional Certification</h3>
                    <p>Professional certification covering agile methodologies, Scrum framework, sprint planning, and effective team collaboration in software development.</p>
                    <div class="training-meta">
                        <span><i class="fas fa-calendar-alt"></i> 2026</span>
                        <span><i class="fas fa-certificate"></i> Certified</span>
                    </div>
                </div>
            `;
        } else {
            trainingGrid.innerHTML = '';
            trainingsSnapshot.forEach(doc => {
                const data = doc.data();
                trainingGrid.innerHTML += `
                    <div class="training-card">
                        <div class="training-icon">
                            <i class="fas ${data.icon || 'fa-certificate'}"></i>
                        </div>
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                        <div class="training-meta">
                            <span><i class="fas fa-calendar-alt"></i> ${data.year}</span>
                            <span><i class="fas fa-certificate"></i> ${data.status || 'Certificate'}</span>
                        </div>
                    </div>
                `;
            });
        }

        // Load Projects
        const projectsSnapshot = await projectsCollection.orderBy('createdAt', 'desc').get();
        const projectGrid = document.getElementById('projectGrid');
        
        if (projectsSnapshot.empty) {
            // If no data in Firebase, show static project
            projectGrid.innerHTML = `
                <div class="project-card" style="max-width: 700px; margin: 0 auto;">
                    <div class="project-icon"><i class="fas fa-rocket"></i></div>
                    <h3>TheFolio - Personal Portfolio Builder</h3>
                    <p>A modern portfolio website builder designed for developers and creatives. This project showcases responsive design, smooth animations, and professional UI/UX principles. Built with modern web technologies and best practices.</p>
                    <div class="project-tags">
                        <span>HTML5</span>
                        <span>CSS3</span>
                        <span>JavaScript</span>
                        <span>Responsive</span>
                    </div>
                    <a href="http://thefolio-fayk.vercel.app/?authuser=0" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i> View Live Project
                    </a>
                </div>
            `;
        } else {
            projectGrid.innerHTML = '';
            projectsSnapshot.forEach(doc => {
                const data = doc.data();
                projectGrid.innerHTML += `
                    <div class="project-card" style="max-width: 700px; margin: 0 auto;">
                        <div class="project-icon">
                            <i class="fas ${data.icon || 'fa-rocket'}"></i>
                        </div>
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                        <div class="project-tags">
                            ${data.tags ? data.tags.map(tag => `<span>${tag}</span>`).join('') : ''}
                        </div>
                        <a href="${data.link}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i> View Live Project
                        </a>
                    </div>
                `;
            });
        }

        // Update statistics
        document.getElementById('statProjects').textContent = projectsSnapshot.size || 1;
        document.getElementById('statTrainings').textContent = trainingsSnapshot.size || 3;

    } catch (error) {
        console.error('Error loading data:', error);
        // Show fallback content if Firebase fails
        showFallbackContent();
    }
});

// ===== FALLBACK CONTENT (if Firebase fails) =====
function showFallbackContent() {
    const trainingGrid = document.getElementById('trainingGrid');
    trainingGrid.innerHTML = `
        <div class="training-card">
            <div class="training-icon"><i class="fas fa-database"></i></div>
            <h3>Data Science Essential with Python</h3>
            <p>Comprehensive training covering data analysis, visualization, machine learning fundamentals, and Python programming for data science applications.</p>
            <div class="training-meta">
                <span><i class="fas fa-calendar-alt"></i> 2025</span>
                <span><i class="fas fa-certificate"></i> Certificate</span>
            </div>
        </div>
        <div class="training-card">
            <div class="training-icon"><i class="fas fa-robot"></i></div>
            <h3>Introduction to Natural Language Processing</h3>
            <p>In-depth exploration of NLP techniques including tokenization, sentiment analysis, language modeling, and practical applications using modern libraries.</p>
            <div class="training-meta">
                <span><i class="fas fa-calendar-alt"></i> 2025</span>
                <span><i class="fas fa-certificate"></i> Certificate</span>
            </div>
        </div>
        <div class="training-card">
            <div class="training-icon"><i class="fas fa-tasks"></i></div>
            <h3>Scrum Foundation Professional Certification</h3>
            <p>Professional certification covering agile methodologies, Scrum framework, sprint planning, and effective team collaboration in software development.</p>
            <div class="training-meta">
                <span><i class="fas fa-calendar-alt"></i> 2026</span>
                <span><i class="fas fa-certificate"></i> Certified</span>
            </div>
        </div>
    `;

    const projectGrid = document.getElementById('projectGrid');
    projectGrid.innerHTML = `
        <div class="project-card" style="max-width: 700px; margin: 0 auto;">
            <div class="project-icon"><i class="fas fa-rocket"></i></div>
            <h3>TheFolio - Personal Portfolio Builder</h3>
            <p>A modern portfolio website builder designed for developers and creatives. This project showcases responsive design, smooth animations, and professional UI/UX principles. Built with modern web technologies and best practices.</p>
            <div class="project-tags">
                <span>HTML5</span>
                <span>CSS3</span>
                <span>JavaScript</span>
                <span>Responsive</span>
            </div>
            <a href="http://thefolio-fayk.vercel.app/?authuser=0" target="_blank" class="project-link">
                <i class="fas fa-external-link-alt"></i> View Live Project
            </a>
        </div>
    `;
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const message = document.getElementById('senderMessage').value;
    const sendBtn = document.getElementById('sendBtn');
    const statusDiv = document.getElementById('messageStatus');
    
    // Disable button and show loading
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    statusDiv.style.display = 'block';
    statusDiv.className = 'status-loading';
    statusDiv.textContent = 'Sending your message...';
    
    try {
        // Save to Firebase
        await messagesCollection.add({
            name: name,
            email: email,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            read: false
        });
        
        // Success
        statusDiv.className = 'status-success';
        statusDiv.textContent = '✅ Message sent successfully! I will get back to you soon.';
        document.getElementById('contactForm').reset();
        
    } catch (error) {
        console.error('Error sending message:', error);
        statusDiv.className = 'status-error';
        statusDiv.textContent = '❌ Failed to send message. Please try again later.';
    }
    
    // Re-enable button
    sendBtn.disabled = false;
    sendBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    
    // Auto-hide status after 5 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
