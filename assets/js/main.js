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

// Fixed taunt phrase per language — shown letter by letter while typing,
// revealed in full when email is complete.
const TAUNT_PHRASE = {
    'pt-BR': 'Esse e-mail vai pro /dev/null por enquanto.',
    'en':    'This email goes to /dev/null for now.',
};

document.querySelectorAll('.email-form-container').forEach(container => {
    const input = container.querySelector('.email-input');
    const taunt = container.querySelector('.email-taunt');
    const form  = container.querySelector('.email-form');
    if (!input || !taunt || !form) return;

    function phrase() {
        return TAUNT_PHRASE[getStoredLang()] || TAUNT_PHRASE['pt-BR'];
    }

    input.addEventListener('input', () => {
        const val = input.value;
        if (val.length === 0) { taunt.textContent = ''; return; }

        if (COMPLETE_EMAIL_RE.test(val)) {
            taunt.textContent = phrase();          // full phrase at once
        } else {
            taunt.textContent = phrase().slice(0, val.length); // letter by letter
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
        }, 700);
    });
});

/*
 * TODO: phrase queue (rotate through all 10 phrases without immediate repeats)
 *
 * function shufflePhrases() {
 *     const list = [...getPhrases()];
 *     for (let i = list.length - 1; i > 0; i--) {
 *         const j = Math.floor(Math.random() * (i + 1));
 *         [list[i], list[j]] = [list[j], list[i]];
 *     }
 *     return list;
 * }
 *
 * Per container:
 *   let queue = [], current = '';
 *   function advance() {
 *       if (queue.length === 0) queue = shufflePhrases();
 *       current = queue.shift();
 *   }
 *   advance();
 *   — call advance() on: init, email complete, after submit
 */
