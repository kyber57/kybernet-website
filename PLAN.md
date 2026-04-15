# Kybernet Website — Plano de Ação

## Diretrizes

| Tema | Decisão |
|------|---------|
| Escopo | Institucional simples |
| Idioma | Bilíngue PT/EN |
| Referência visual | [kyberinet_hero.html](kyberinet_hero.html) é a fonte da verdade |
| Stack | Multi-página estática |
| Deploy | Cloudflare Pages |

---

## Escopo atual

- Apenas a **hero section** está funcional.
- **Roots** — overlay fullscreen com autômato celular (Brian's Brain) animado em canvas. Já implementado.
- **Surprise** — overlay fullscreen com mensagem irreverente + formulário de captura de e-mail. Já implementado.
- Seções Kyberlab, Engineering, Staff permanecem **lockadas** (sem conteúdo definido).

---

## System Design

```
Website/
├── index.html                  # Hero + Registration + overlays (Roots, Surprise)
├── kyberlab/
│   └── index.html              # 🔒 Stub — aguarda conteúdo
├── engineering/
│   └── index.html              # 🔒 Stub — aguarda conteúdo
├── staff/
│   └── index.html              # 🔒 Stub — aguarda conteúdo
├── assets/
│   ├── css/
│   │   ├── base.css            # Reset e body
│   │   ├── nav.css             # Navegação e logo
│   │   ├── hero.css            # Hero section, animações, efeitos glow
│   │   ├── registration.css    # Seção de cadastro
│   │   ├── overlays.css        # Overlays Surprise e Roots
│   │   └── components.css      # Email form, back-link (compartilhados)
│   ├── js/
│   │   ├── main.js             # Animações de palavras, smooth scroll, forms
│   │   ├── overlays.js         # Show/hide Surprise e Roots
│   │   └── automata.js         # Brian's Brain (autômato celular)
│   └── svg/
│       └── logo.svg            # SVG do logo ʞyberиet
└── kyberinet_hero.html         # Original (será aposentado)
```

---

## Plano de execução

### 1. Modularizar o código atual
- [x] Extrair CSS em `assets/css/` (6 arquivos).
- [x] Extrair JS em `assets/js/` (3 arquivos).
- [x] Extrair SVG do logo para `assets/svg/logo.svg`.
- [x] Criar `index.html` referenciando os assets extraídos.

### 2. Migrar para multi-página estática
- [x] Estruturar o projeto em múltiplos arquivos HTML.
- [x] Criar stubs para Kyberlab, Engineering e Staff (prontos para receber conteúdo).
- [x] Overlays Roots e Surprise mantidos no `index.html` sem alteração.

### 3. Internacionalização PT/EN
- [x] Estratégia: JS toggle com `localStorage` (padrão pt-BR).
- [x] `assets/js/i18n.js` — traduções PT/EN + `setLanguage()` + `toggleLanguage()`.
- [x] Atributos `data-i18n` e `data-i18n-placeholder` em todos os textos do `index.html`.
- [x] Botão PT/EN na nav.
- [x] `lang` do `<html>` atualizado dinamicamente pelo `setLanguage()`.

### 4. Deploy no Cloudflare Pages
- Conectar repositório ao Cloudflare Pages.
- Configurar domínio customizado.

---

## Backlog

- Responsividade & acessibilidade (breakpoints, contraste, `prefers-reduced-motion`, teclado).
- Metadados & SEO (favicon, OG tags, título/descrição, `lang`).
- Conteúdo e desbloqueio das seções: Roots, Kyberlab, Engineering, Staff.
- Fila de frases do taunt (rodar as 10 sem repetição imediata) — lógica comentada em `assets/js/main.js`.
