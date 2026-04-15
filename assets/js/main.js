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

// Email taunt — letter by letter while typing; full phrase when email is complete
document.querySelectorAll('.email-form-container').forEach(container => {
    const input = container.querySelector('.email-input');
    const taunt = container.querySelector('.email-taunt');
    if (!input || !taunt) return;

    let currentPhrase = '';

    function pickPhrase() {
        const list = getPhrases();
        return list[Math.floor(Math.random() * list.length)];
    }

    input.addEventListener('focus', () => {
        if (!currentPhrase) currentPhrase = pickPhrase();
    });

    input.addEventListener('input', () => {
        const val = input.value;
        if (val.length === 0) {
            taunt.textContent = '';
            currentPhrase = pickPhrase();
            return;
        }
        if (COMPLETE_EMAIL_RE.test(val)) {
            // Email complete — reveal full phrase at once
            taunt.textContent = currentPhrase;
        } else {
            // Still typing — reveal letter by letter
            if (val.length > currentPhrase.length) currentPhrase = pickPhrase();
            taunt.textContent = currentPhrase.slice(0, val.length);
        }
    });
});

// Email form submissions — shake page + red button
document.querySelectorAll('.email-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn   = form.querySelector('.submit-btn');
        const taunt = form.closest('.email-form-container').querySelector('.email-taunt');

        // Red button
        btn.classList.add('submit-error');

        // Shake entire page
        document.body.classList.add('shake');

        setTimeout(() => {
            document.body.classList.remove('shake');
            btn.classList.remove('submit-error');
            form.reset();
            if (taunt) taunt.textContent = '';
        }, 700);
    });
});
