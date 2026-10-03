---
title: Regras de qualidade
description: As travas que impedem um vídeo ruim de ser gerado e as métricas que precisam ficar em zero.
group: Como funciona
---

## Travas do pipeline

Cada trava para a geração na própria etapa:

| Trava | Etapa | Limite |
|---|---|---|
| Alinhamento áudio × roteiro | Alinhamento | Pelo menos 90% |
| Cobertura do diretor | Diretor semântico | Pelo menos 85% das cenas com decisão válida (meta: 100%) |
| Imagens obrigatórias | Cobertura de imagens | Nenhuma faltando no trecho do formato |
| Relatório de edição | Relatório de edição | Nenhum erro bloqueante |

## Erros bloqueantes do relatório de edição

:::trava Bloqueiam o render
- Seta com desvio excessivo.
- Setas encostando uma na outra.
- Citação incompleta.
- Texto maior que a própria caixa.
- Valor narrado sem elemento na tela.
- Moeda em formato inválido.
- Pessoa na tela que o diretor não escolheu para a cena.
- Imagem repetida na mesma página.
- Microtexto inseguro ou que termina no meio de uma oração.
- Conflito com a faixa do título.
- Interrupção curta demais.
:::

## Métricas que precisam ficar em zero

| Métrica | O que mede |
|---|---|
| `relationCollisionCount` | Setas que esbarram em desenhos ou textos |
| `relationOverlapCount` | Setas encostando uma na outra |
| `excessiveRelationDetourCount` | Setas com desvio exagerado |
| `nodeOverlapCount` | Desenhos sobrepostos |
| `duplicateBoardAssetCount` | Mesma imagem duas vezes na página |
| `semanticLabelNodeCollisionCount` | Microtexto sobre desenho |
| `titleLaneConflictCount` | Elemento invadindo a faixa do título |
| `truncatedTextCount`, `textOverflowCount` | Texto cortado ou maior que a caixa |
| `incompleteSemanticLabelCount` | Microtexto incompleto |
| `invalidCurrencyNodeCount` | Moeda mal formatada |

E duas que precisam ficar em 100%: **cobertura numérica** (todo valor dito aparece) e **direção semântica** (toda cena com decisão).

## Avisos

Colisão de seta, sobreposição, fadiga de assets, ocupação baixa do quadro e lacunas de informação aparecem como **avisos**. Eles não param a geração, mas a meta continua sendo zero: aviso pede inspeção visual.

Nichos com pessoas recorrentes no perfil também recebem aviso quando menos de **50% das páginas** têm uma pessoa.

## Os primeiros 3 minutos

Os 3 primeiros minutos decidem se o espectador continua. Neles o vídeo deve ser dominado por imagens e pessoas, quase sem ícones de conceito. O diretor segue essa regra (meta B do prompt) e a composição garante na página a pessoa escolhida.
