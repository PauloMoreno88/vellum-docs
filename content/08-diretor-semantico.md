---
title: Diretor semântico
description: A IA que decide o que mostrar em cada cena, o que ela recebe, o que devolve e como a resposta é validada.
group: Como funciona
---

## O papel

O diretor lê o roteiro inteiro e devolve, para cada cena, uma decisão verificável: qual imagem, qual pessoa, qual número, título, frases curtas e relação com a cena seguinte. É o único ponto do sistema que entende o assunto do nicho. O resto do motor só executa as decisões.

## O que ele recebe

| Entrada | Origem |
|---|---|
| Roteiro completo e as cenas | Roteiro do vídeo |
| Galeria do nicho (id, categoria, descrição de cada imagem, personagens incluídos) | Catálogo do nicho |
| Conceitos disponíveis | Conceitos universais + conceitos extras do perfil |
| Assunto e pessoas recorrentes | Perfil do nicho |
| Orientação do estilo do vídeo | Estilo escolhido no canal |
| Idioma de saída | Idioma do roteiro |

Todos os provedores (Codex, Claude, API da OpenAI, chat manual) recebem **exatamente o mesmo texto**. Muda só o transporte.

## O que faz um bom vídeo (as metas do prompt)

O prompt começa pelas metas de qualidade que ele segue em toda decisão:

- **A.** Cada cena precisa de uma imagem que mostre o que a frase diz: primeiro um asset que mostre o assunto, depois uma pessoa quando a cena fala de alguém, depois um **pedido de imagem nova** para algo concreto que não existe. Conceito é só para ideia abstrata.
- **B.** Nos 3 primeiros minutos, imagens acima de conceitos e uma pessoa em quase toda cena. Sem pessoa na galeria, ele pede a imagem de quem conduz o vídeo, sempre com a mesma descrição.
- **C.** Continuidade: voltar ao mesmo assunto repete o mesmo asset.
- **D.** O específico vence o genérico.
- **E.** Cenas seguidas sobre a mesma coisa pedem a mesma imagem nova, com a mesma descrição.
- **F.** As pessoas recorrentes do perfil são as mesmas em todo vídeo.

## O que ele devolve, por cena

| Campo | Para que serve |
|---|---|
| `primaryAssetId`, `secondaryAssetIds` | As imagens da galeria usadas na cena. |
| `conceptIds` | Conceitos abstratos, quando não há imagem concreta. |
| `missingAssetDescription`, `missingAssetKind` | Pedido de imagem nova e o tipo (pessoa, objeto, metáfora). |
| `anchorTerms` | 1 a 3 palavras literais da fala que nomeiam o que é desenhado. O desenho termina quando a narração diz esse termo. |
| `stateLabel` | Estado visível do objeto principal ("Baixo", "Gasta"), escrito sobre ele. |
| `title` | Título da página: pergunta, conclusão ou ação, de 3 a 8 palavras. |
| `microcopy` | Até 2 frases curtas e completas para escrever nas pausas. |
| `values` | Números com unidade ditos na cena. |
| `relationType` | Relação com a cena seguinte (causa, sequência, contraste...). Vira seta. |
| `evidence`, `confidence` | Trecho literal que justifica a decisão e o quanto ela é fiel à fala. |

## Como a resposta é validada

:::trava Nada passa sem evidência
- Cada decisão cita um trecho **literal** da própria cena. Sem evidência, a cena perde a direção.
- Decisões com confiança abaixo de 0,62 são descartadas.
- IDs de imagem que não existem na galeria são ignorados.
- Um **valor** só entra se o trecho citado tiver um número dito (em dígitos ou por extenso, nos 4 idiomas). "Semanas a meses" não vira número.
- `anchorTerms` que não estão na fala são descartados.
- Microtexto que termina em artigo, preposição ou conjunção é descartado.
- Texto de tela no idioma errado é descartado; se for mais de 20% das cenas, a análise inteira é recusada.
:::

A análise para se menos de **85%** das cenas tiverem decisão válida. A meta de entrega continua sendo 100%: cena descartada é problema a investigar.

## A escala de confiança

`confidence` mede o quanto a decisão é **fiel ao que a narração diz**, não a qualidade do acervo:

| Faixa | Quando |
|---|---|
| 0,90 a 1,00 | O texto da cena sustenta a decisão diretamente. |
| 0,75 a 0,89 | Interpretação razoável. |
| 0,50 a 0,74 | Dúvida real. |
| Abaixo de 0,50 | Chute. |

Cenas de transição ("agora vou te mostrar...") continuam o assunto vizinho e recebem nota alta quando a continuidade é bem fundamentada.

## Cache

A análise é guardada por um hash de tudo o que entra nela: roteiro, cenas, galeria, perfil do nicho, estilo, modelo, esforço de raciocínio, schema e o texto das instruções. Se nada mudou, o vídeo reaproveita a análise sem custo. Forçar uma análise nova é decisão consciente, nunca um atalho para testar layout.
