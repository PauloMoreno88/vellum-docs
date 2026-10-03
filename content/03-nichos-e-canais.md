---
title: Nichos e canais
description: Como nichos, perfil do nicho e canais se organizam no app e o que cada um muda no vídeo.
group: Usar o Vellum
---

## Nicho

O nicho é o assunto. Cada nicho tem um **código fixo** (sem acento: "Saúde Mental" vira `saude-mental`), uma **galeria** de imagens e um **perfil**. Imagens de nichos diferentes nunca se misturam: um vídeo de Nutrição só enxerga as imagens de Nutrição.

Renomear o nicho no app não muda o código nem a pasta das imagens.

## Perfil do nicho

O perfil é o que ensina o sistema sobre o assunto. Sem ele, o diretor só sabe o que está no roteiro e as imagens pedidas saem genéricas. Por isso a tela de canais mostra um aviso enquanto o nicho não tem perfil.

Abra com o botão **Perfil do Nicho**. Ele tem quatro partes:

| Parte | O que escrever | Para que serve |
|---|---|---|
| **Assunto** | Do que o canal fala, para quem, em que tom e quais situações e objetos aparecem. | O diretor entende o vocabulário e o público. |
| **Estilo das imagens** | Paleta (4 ou 5 cores e o papel de cada uma), aparência, e regras para objetos, personagens e metáforas. Uma regra por linha. | Entra em todo prompt de imagem do nicho. |
| **Pessoas recorrentes** | Quem aparece em vários vídeos: nome, idade aproximada, aparência e figurino. | Mantém a mesma pessoa em todas as imagens novas. |
| **Conceitos extras** | Ideias do assunto que viram ícone (ex.: "ciclo da fome"). | Somam-se aos conceitos que todo nicho tem (dinheiro, tempo, alerta...). |

:::passo Gerar rascunho com IA
O botão **Gerar rascunho com IA** escreve um perfil completo a partir do nome do nicho. Com **Com roteiro de exemplo…** ele fica mais específico. Revise cada campo antes de salvar: o diretor segue o perfil em todo vídeo do nicho.
:::

:::trava Mudar o perfil refaz a análise
O perfil faz parte das instruções do diretor. Salvar um perfil diferente faz o próximo vídeo do nicho pagar uma análise nova do roteiro.
:::

O perfil é salvo em `assets/nichos/<código>/nicho.md`. O formato está em [Multi-nicho](multi-nicho.html#o-arquivo-nicho-md).

## Canal

O canal pertence a um nicho e guarda os padrões de produção: **idioma**, **voz** e **estilo do vídeo**. Ao abrir um canal, o estúdio já vem configurado com esses padrões e com a galeria do nicho.

## Estilos de vídeo

| Estilo | Ritmo e densidade |
|---|---|
| **Explicativo / Didático** | Páginas de 20 a 34 s, até 6 desenhos e 3 setas por página, microtextos ligados. O padrão. |
| **Reflexivo / Narrativo** | Páginas de 18 a 30 s, até 4 desenhos, sem microtextos. Imagens expressivas e metáforas. |
| **Alerta / Impacto / Vendas** | Páginas de 14 a 26 s, até 5 desenhos. Números em destaque e frases curtas. |
| **Comparativo / Versus** | Até 3 desenhos por página, em colunas de comparação. |

O estilo muda o ritmo das páginas **e** a orientação do diretor (o que mostrar). Trocar de estilo pede uma análise nova.
