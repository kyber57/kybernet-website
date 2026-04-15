# Kybernet — Website

Documento base para orientar o desenvolvimento do site institucional da **ʞyberиet**.

## Visão geral

Site atualmente composto por um único arquivo: [kyberinet_hero.html](kyberinet_hero.html) (~937 linhas, HTML + CSS + JS inline). Contém apenas a **hero section** da landing page, com tema escuro, tipografia grande e efeitos visuais (glow/fog, fade-in nas palavras, caracteres espelhados).

**Tagline:** *We. Absorb. Complexity.*
**Idioma:** pt-BR (lang), conteúdo em inglês.

## Identidade visual

- **Logo:** `ʞyberиet` (SVG inline — k invertido + и cirílico) — composto por linhas brancas em viewBox 150×150.
- **Paleta:**
  - Fundo: gradiente `#0a0a0a → #1a1a1a`
  - Texto primário: `#ffffff`
  - Texto secundário / nav: `#888` / `#999`
  - Separadores: `#444`
- **Tipografia:** system stack (`-apple-system, BlinkMacSystemFont, Segoe UI`). Hero em `Arial`, `font-weight: 300`, `clamp(2rem, 8vw, 6rem)`.
- **Efeitos:** radial glow atrás do texto hero, blur de 60px, animação `fadeInUp` nas palavras, caracteres com `flip-v` / `flip-h` / `rotate-180`.

## Estrutura atual

```
Website/
└── kyberinet_hero.html    # hero único, tudo inline
```

### Navegação (estado atual)
| Link         | Estado    | Destino       |
|--------------|-----------|---------------|
| Roots        | ativo     | `#roots`      |
| Kyberlab     | 🔒 locked | `#kyberlab`   |
| Engineering  | 🔒 locked | `#engineering`|
| Staff        | 🔒 locked | `#staff`      |
| Surprise     | ativo     | JS (`surpriseLink`) |

Seções `Roots`, `Kyberlab`, `Engineering`, `Staff` ainda **não existem** — apenas âncoras.

## Próximos passos sugeridos

1. **Decidir stack.** Continuar como site estático single-file, migrar para multi-página estática, ou adotar framework (Next.js / Astro)?
2. **Modularizar.** Separar CSS e JS do HTML; extrair o SVG do logo para arquivo reutilizável.
3. **Construir seções ausentes:** Roots, Kyberlab, Engineering, Staff — definir conteúdo e desbloquear a nav.
4. **Implementar a interação "Surprise"** (handler JS ainda não inspecionado em detalhe).
5. **Responsividade & acessibilidade:** revisar breakpoints, contraste, `prefers-reduced-motion`, navegação por teclado nos links `locked`.
6. **Metadados & SEO:** favicon, OG tags, título/descrição definitivos, `lang` coerente com o conteúdo.
7. **Deploy:** definir hospedagem (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Perguntas em aberto

- Qual o escopo final do site — institucional simples, portfólio, ou produto/app com áreas logadas (sugerido pelos cadeados)?
- Conteúdo será bilíngue (PT/EN)?
- Existe design definitivo (Figma) ou o HTML atual é a referência visual?
