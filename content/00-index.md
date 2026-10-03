---
title: Início
description: Documentação do Vellum, o sistema que transforma roteiro e narração em vídeo explicativo desenhado à mão.
group: Começo
---

<section class="hero">
<p class="hero-line">Do roteiro ao quadro desenhado.</p>
<svg class="hero-underline" viewBox="0 0 560 22" aria-hidden="true" preserveAspectRatio="none"><path d="M4 14 C 120 4, 260 20, 380 9 S 520 6, 556 12"/></svg>
<p class="hero-sub">O Vellum lê um roteiro, ouve a narração e monta sozinho um vídeo de quadro branco: cada imagem é desenhada pela mão no instante em que a narração fala dela.</p>
</section>

## Comece por aqui

- **Vai usar o app?** Leia [Primeiros passos](primeiros-passos.html) e depois [Gerar um vídeo](gerar-um-video.html).
- **Vai criar um nicho novo?** Leia [Nichos e canais](nichos-e-canais.html) e [Multi-nicho](multi-nicho.html).
- **Faltou imagem no vídeo?** Veja [Galeria e imagens](galeria-e-imagens.html).
- **Vai mexer no código?** Comece por [Visão geral](visao-geral.html), [Pipeline](pipeline.html) e [Desenvolvimento](desenvolvimento.html).

## O que o sistema faz

Você entrega dois arquivos: o **roteiro** (texto) e a **narração** (áudio). Se não tiver áudio, o Vellum gera a narração com uma voz da biblioteca.

A partir daí ele:

1. descobre o momento exato em que cada palavra é dita;
2. pede a uma IA (o **diretor semântico**) que decida o que mostrar em cada trecho: qual imagem, qual pessoa, qual número, que título e que frases curtas;
3. organiza tudo em páginas de quadro branco, com setas, números e textos;
4. desenha o vídeo com a mão traçando cada imagem, sincronizada com a fala.

O resultado é um vídeo em 1920 × 1080 (ou vertical, para Shorts), salvo na pasta do canal.

## Os princípios

:::regra O roteiro é o texto; a narração é o tempo
O que aparece escrito vem do roteiro. Quando aparece vem do áudio. Se os dois não batem, o vídeo não é gerado.
:::

:::regra O nicho é dado, o diretor decide, o código executa
Nada no código muda de comportamento por causa do assunto do canal. O que é específico de um nicho fica no perfil e nas imagens dele; quem decide o que mostrar é o diretor semântico.
:::

:::regra Imagem de verdade, nunca enfeite
Cada elemento na tela explica a frase dita naquele instante. Nenhum desenho genérico substitui uma imagem que falta: o vídeo só sai quando todas as imagens pedidas existem.
:::
