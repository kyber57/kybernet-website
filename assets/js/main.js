// Sequential word animation on load
window.addEventListener('load', () => {
    const words = document.querySelectorAll('.word');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    words.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('animate');
        }, index * 800);
    });

    const totalAnimationTime = (words.length - 1) * 800 + 1200;
    setTimeout(() => {
        scrollIndicator.classList.add('visible');
    }, totalAnimationTime);
});

// Smooth scroll utility
function smoothScrollTo(target) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start = null;

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Scroll indicator click
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    smoothScrollTo(document.getElementById('register'));
});

// Smooth scroll for anchor nav links (non-overlay)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            smoothScrollTo(target);
        }
    });
});

// Matches a complete, valid email address
const COMPLETE_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function shufflePhrases() {
    const list = [...getPhrases()];
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

// Email taunt + submit — scoped per form container so they share the phrase queue
document.querySelectorAll('.email-form-container').forEach(container => {
    const input = container.querySelector('.email-input');
    const taunt = container.querySelector('.email-taunt');
    const form  = container.querySelector('.email-form');
    if (!input || !taunt || !form) return;

    let queue   = [];
    let current = '';

    function advance() {
        if (queue.length === 0) queue = shufflePhrases();
        current = queue.shift();
    }

    advance(); // initialise with first phrase

    input.addEventListener('input', () => {
        const val = input.value;

        if (val.length === 0) {
            taunt.textContent = '';
            return;
        }

        if (COMPLETE_EMAIL_RE.test(val)) {
            // Email complete — show full phrase and pre-load next for next session
            taunt.textContent = current;
            advance();
        } else {
            // Still typing — letter by letter
            if (val.length > current.length) advance();
            taunt.textContent = current.slice(0, val.length);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        btn.classList.add('submit-error');
        document.body.classList.add('shake');

        setTimeout(() => {
            document.body.classList.remove('shake');
            btn.classList.remove('submit-error');
            form.reset();
            taunt.textContent = '';
            advance(); // fresh phrase for next session
        }, 700);
    });
});
