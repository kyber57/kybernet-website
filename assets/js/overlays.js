// Surprise overlay
document.getElementById('surpriseLink').addEventListener('click', () => {
    document.getElementById('surpriseSection').classList.add('active');
});

document.getElementById('backToHome').addEventListener('click', () => {
    document.getElementById('surpriseSection').classList.remove('active');
});

// Roots overlay
document.querySelectorAll('a[href="#roots"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('rootsSection').classList.add('active');
        initAutomata();
    });
});

document.getElementById('backFromRoots').addEventListener('click', () => {
    document.getElementById('rootsSection').classList.remove('active');
    stopAutomata();
});
