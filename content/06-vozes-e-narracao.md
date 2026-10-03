---
title: Vozes e narração
description: Narração gravada ou gerada, biblioteca de vozes e como o áudio é conferido.
group: Usar o Vellum
---

## Gravada ou gerada

| | Narração gravada | Narração gerada |
|---|---|---|
| Como entra | Você envia o áudio junto com o roteiro. | O app gera o áudio a partir do roteiro com uma voz da biblioteca. |
| Precisa instalar | Nada além do reconhecimento de fala. | **Narração** em Ajustes (2 a 6 GB). |
| Quando o app usa | Sempre que houver áudio. | Quando você escolhe só o roteiro e uma voz. |

A narração gerada nunca sobrescreve uma gravada.

## Biblioteca de vozes

Cada idioma tem vozes próprias. No modal de vozes:

- ouça a **amostra** de cada voz;
- use **Adicionar voz** para criar uma a partir de qualquer áudio ou vídeo.

Ao adicionar, o sistema descarta o silêncio do começo, usa os primeiros **15 segundos de fala** (mínimo de 5), converte para mono e normaliza o volume. Uma voz existente nunca é sobrescrita.

:::regra A voz define o sotaque
A amostra define timbre **e** sotaque. Uma voz brasileira usada em francês sai com sotaque. Use um falante nativo por idioma, com autorização de uso da voz.
:::

## Como a narração gerada funciona

- O roteiro é dividido em blocos de até 260 caracteres dentro do parágrafo (frase a frase soava robotizado).
- Números, moedas, porcentagens, temperaturas e quilômetros são escritos por extenso antes de falar.
- Um dicionário de pronúncia por idioma diz como falar termos difíceis.
- **Cada bloco é conferido** pelo reconhecimento de fala e gerado de novo, até 3 vezes, se faltar palavra ou sobrar sílaba. Blocos que continuam fora ficam marcados no relatório para alguém ouvir.
- Editar uma frase regenera só o bloco dela.

## Alinhamento: o áudio precisa bater com o roteiro

Depois de pronto, o áudio (gravado ou gerado) passa pelo mesmo processo: o reconhecimento de fala marca o tempo de cada palavra ouvida e o sistema casa essas palavras com o roteiro.

:::trava Mínimo de 90%
Se menos de 90% do roteiro for encontrado no áudio, a geração para antes de desenhar. Não é um problema de modelo: quase sempre o áudio está cortado ou é de outra versão do texto.
:::

As dicas de vocabulário do reconhecimento de fala são tiradas **do próprio roteiro** (palavras longas e siglas). Assim nenhum nicho herda vocabulário de outro.
