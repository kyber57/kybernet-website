const translations = {
    'pt-BR': {
        'scroll-text':       'Role para baixo',
        'reg-line-1':        'CURIOSIDADE',
        'reg-line-2':        'É IMPORTANTE.',
        'reg-line-3':        'MAS NÃO É',
        'reg-line-4':        'SUFICIENTE.',
        'form-label':        'Registre-se para mais...',
        'email-placeholder': 'seu@email.com',
        'surprise-line-1':   'PENSOU MESMO',
        'surprise-line-2':   'QUE TERIA UMA',
        'surprise-line-3':   'SURPRESA?',
        'surprise-line-4':   'VOCÊ PRECISA MERECER.',
        'surprise-label':    'Registre-se para mais...',
        'back-home':         'Voltar ao início',
        'lang-toggle':       'EN',
    },
    'en': {
        'scroll-text':       'Scroll down',
        'reg-line-1':        'CURIOSITY',
        'reg-line-2':        'IS IMPORTANT.',
        'reg-line-3':        'BUT IS NOT',
        'reg-line-4':        'ENOUGH.',
        'form-label':        'Register for more...',
        'email-placeholder': 'your@email.com',
        'surprise-line-1':   'REALLY THOUGHT',
        'surprise-line-2':   "YOU'D GET A",
        'surprise-line-3':   'SURPRISE?',
        'surprise-line-4':   'YOU GOTTA EARN IT.',
        'surprise-label':    'Register for more...',
        'back-home':         'Back to home',
        'lang-toggle':       'PT',
    }
};

const phrases = {
    'pt-BR': [
        "Tá apressadinho né?",
        "Calma cara, ainda estamos trabalhando.",
        "Peraí, o backend tá dormindo...",
        "Esse e-mail vai pro /dev/null por enquanto.",
        "Você sabia que persistência é uma virtude?",
        "Enquanto isso, conte até dez.",
        "Spoiler: ninguém vai te responder ainda.",
        "Aqui funciona na base da vontade.",
        "Você é o visitante número... sabe lá.",
        "Segura essa expectativa aí."
    ],
    'en': [
        "In a hurry, huh?",
        "Easy there, we're still building.",
        "Hold on, the backend is napping...",
        "This email goes to /dev/null for now.",
        "Did you know patience is a virtue?",
        "Meanwhile, count to ten.",
        "Spoiler: nobody's replying just yet.",
        "This runs on pure willpower.",
        "You're visitor number... who knows.",
        "Keep those expectations in check."
    ]
};

function getPhrases() {
    return phrases[getStoredLang()] || phrases['pt-BR'];
}

const DEFAULT_LANG = 'pt-BR';

function getStoredLang() {
    return localStorage.getItem('kybernet-lang') || DEFAULT_LANG;
}

function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // innerHTML elements (may contain spans)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (t[key] !== undefined) el.placeholder = t[key];
    });

    document.documentElement.lang = lang;
    localStorage.setItem('kybernet-lang', lang);
}

function toggleLanguage() {
    const current = getStoredLang();
    setLanguage(current === 'pt-BR' ? 'en' : 'pt-BR');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(getStoredLang());

    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', toggleLanguage);
});
