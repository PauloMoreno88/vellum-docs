---
title: Composição e desenho
description: Como as páginas são montadas, como as setas são roteadas e como a mão desenha cada elemento.
group: Como funciona
---

## Páginas

Uma página junta cenas seguidas do mesmo assunto. Ela vira quando:

- passa do tempo máximo do estilo (34 s no explicativo) ou do número de cenas;
- muda o assunto (a imagem principal ou o termo que o diretor apontou) e a intenção, sem uma relação que continue a ideia;
- começa um capítulo ou o pedido final ao espectador.

Elementos anteriores continuam na página enquanto ajudam a entender a ideia. Uma imagem que já está na tela não é desenhada de novo: a nova menção vira um destaque sobre ela.

## Elementos

| Elemento | De onde vem |
|---|---|
| **Imagem** | Asset da galeria escolhido pelo diretor. |
| **Pessoa** | Imagem de personagem da galeria. No máximo 2 por página, nunca a mesma pessoa duas vezes. |
| **Número** | Valor dito na cena, sempre com elemento próprio. Moeda segue o idioma. |
| **Conceito** | Ícone de ideia abstrata (precisa de PNG). |
| **Citação** | Frase curta e completa da própria fala, quando a cena não tem imagem. |
| **Microtexto** | Frase curta do diretor escrita nas pausas entre desenhos. |
| **Estado** | Rótulo vermelho sobre a imagem principal da cena ("Gasta", "Baixo"). |

## Título

Aparece só quando a página abre um assunto novo, fica até o segundo desenho terminar (3 a 5 s) e some. Páginas que continuam o assunto não repetem título. Perguntas ganham a interrogação certa do idioma.

## Setas

:::regra Curtas, grossas e retas
As setas flutuam no vão entre dois desenhos e apontam de um para o outro. A cor diz a relação: **verde** sequência ou causa, **vermelho** queda ou consequência ruim, **azul** estrutura ou retorno.
:::

- A seta ocupa até 60% do vão, entre 96 e 190 px. Vão menor que 96 px ou maior que 900 px não recebe seta.
- Ela desvia de desenhos, textos, rótulos e outras setas, com respiro mínimo de 10 px.
- Sem um trecho livre, a relação sai da página. Se isso acontece muito, o problema é o layout, não o roteador.
- Uma relação só começa depois que os dois desenhos existem.

## A mão

- A ponta da caneta segue os contornos calculados de cada imagem.
- **Imagens e pessoas**: a caneta contorna primeiro (até metade do tempo) e depois pinta em zigue-zague de cima para baixo. A cor só aparece por onde o pincel passou.
- **Texto**: escrito letra a letra, cada letra com tempo proporcional à largura.
- **Setas**: contornadas e depois pintadas da cauda até a ponta.
- A mão nunca some nem se teletransporta: entre traços próximos ela viaja levantada; em pausas maiores sai pela borda de baixo e volta.
- Nada aparece por fade de opacidade.

:::trava Todo desenho termina dentro da própria página
Se a fila de desenhos passa do fim da página, ela é comprimida (mínimo de 18 frames por desenho) e setas sem espaço saem. Elemento agendado depois do fim nunca aparece.
:::

## Tempo de cada desenho

O desenho é ancorado na fala: ele termina no instante em que a narração diz o termo apontado pelo diretor (`anchorTerms`), em vez de começar no primeiro frame da cena. Assim a tinta chega junto com a palavra.

## Tipografia

O quadro usa uma única família, **Patrick Hand**, em caixa normal. O planner mede cada texto com a largura real da fonte e quebra as linhas antes do render; o render só posiciona. Números usam o separador de milhar do idioma e unidades abreviadas.

## Saídas

| Composição | Uso |
|---|---|
| `AutomotiveWhiteboard` | O quadro branco com mão. Saída dos vídeos. |
| `AutomotiveVertical` | O mesmo quadro em 1080 × 1920, para Shorts. |
| `AutomotiveVideo` | Estilo escuro antigo, uma cena por vez (legado). |
