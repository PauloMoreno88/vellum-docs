---
title: Estrutura do projeto
description: Onde fica cada coisa no repositório do motor e no app.
group: Referência
---

## Pastas

| Pasta | Conteúdo |
|---|---|
| `scripts/` | Etapas do pipeline e ferramentas de linha de comando. |
| `scripts/lib/` | Módulos do motor (análise, diretor, narrativa, composição, tipografia...). |
| `src/` | O render em Remotion (React) e os tipos do plano. |
| `src/generated/` | Saídas do prepare: plano, catálogo e contornos. Não editar à mão. |
| `assets/nichos/<nicho>/` | Galeria e perfil de cada nicho. |
| `assets/voice/` | Vozes e dicionários de pronúncia por idioma. |
| `input/<idioma>/` | Roteiro e narração (fora do git). |
| `cache/<idioma>/` | Transcrição, análise e relatórios (fora do git). |
| `bench/` | Roteiros e resultados do benchmark multi-nicho. |
| `desktop-app/` | O app Vellum (Electron + React). |
| `docs/` | Decisões, mapa de acoplamento e guia visual. |

## Pasta de um nicho

```text
assets/nichos/<código>/
├── nicho.md        perfil do nicho
├── oficial/        imagens da equipe (versionadas; vêm do pacote de acervo)
├── importadas/     imagens adicionadas neste computador
├── rotulos.json    rótulos curtos de tela por idioma
├── acervo.json     inventário da bíblia visual
└── pedidos/        listas do que falta (cobertura.md e .json)
```

Cada coleção é uma pasta com `manifest.json` (id, categoria, descrição, arquivo e dimensões de cada imagem). Com o mesmo id em duas coleções, vale a importada.

## Módulos principais

| Arquivo | Responsabilidade |
|---|---|
| `scripts/build-video.mjs` | Orquestra o pipeline completo com as travas. |
| `scripts/prepare.mjs` | Monta o plano a partir do roteiro, áudio e cache. |
| `scripts/lib/align.mjs` | Alinhamento roteiro × fala. |
| `scripts/lib/semantic-director.mjs` | Diretor semântico: prompt, chamada, validação e cache. |
| `scripts/lib/niche-profile.mjs` | Leitura e escrita do perfil do nicho. |
| `scripts/lib/niche-assets.mjs` | Regras de pasta de cada nicho e catálogo. |
| `scripts/lib/style-prompt.mjs` | Prompt de estilo das imagens (universal + nicho). |
| `scripts/lib/visual-bible.mjs` | Junta as decisões do diretor com a galeria e lista o que falta. |
| `scripts/lib/narrative.mjs` | Páginas e elementos de cada página. |
| `scripts/lib/composition.mjs` | Layout, tempo, setas e pessoas por página. |
| `scripts/lib/typography.mjs` | Medição e quebra de texto com as larguras reais da fonte. |
| `scripts/lib/knowledge.mjs` | Números por extenso, moeda, unidades e capítulos nos 4 idiomas. |
| `scripts/lib/hotwords.mjs` | Dicas de vocabulário do reconhecimento de fala, tiradas do roteiro. |
| `scripts/asset-coverage.mjs` | Lista de imagens pedidas e prompts. |
| `scripts/edit-report.mjs` | Relatório de qualidade e travas. |
| `src/whiteboard/SemanticBoard.tsx` | Render das páginas. |
| `src/whiteboard/Relations.tsx` | Desenho das setas. |
| `src/types/video-plan.ts` | Contrato do plano entre motor e render. |

## O app

| Parte | Onde |
|---|---|
| Telas (React) | `desktop-app/src/` |
| Processo principal, ponte com o motor | `desktop-app/electron/` |
| Fases mostradas durante a geração | `desktop-app/src/phases.ts` (ao criar ou renomear uma etapa do pipeline, confira esse mapa) |

O app roda o motor numa área de trabalho própria do usuário, separada do instalador, e guarda nichos, canais e histórico nos dados do app.
