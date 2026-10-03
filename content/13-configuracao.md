---
title: Configuração
description: Variáveis de ambiente do motor e o que cada uma muda.
group: Referência
---

Todas são opcionais. Podem ficar no terminal ou no arquivo `.env` da raiz do motor (fora do git; o modelo é `.env.example`). O valor do terminal tem prioridade.

## Idioma, nicho e estilo

| Variável | Efeito | Padrão |
|---|---|---|
| `AVE_LANG` | Idioma ativo (`pt`, `en`, `es`, `fr`). Normalmente definido por `with-lang.mjs`. | `pt` |
| `AVE_NICHE` | Código do nicho ativo. Só a galeria e o perfil desse nicho entram na análise e no render. | `automotivo` |
| `AVE_VIDEO_STYLE` | Estilo do vídeo: `explicativo`, `reflexivo`, `impacto`, `comparativo`. | `explicativo` |

## Diretor semântico

| Variável | Efeito | Padrão |
|---|---|---|
| `SEMANTIC_DIRECTOR_MODE` | Provedor: `codex`, `claude`, `openai` ou `gemini-manual`. | `codex` |
| `SEMANTIC_AI_MODEL` | Modelo usado. | o padrão do provedor |
| `SEMANTIC_AI_REASONING` | Esforço de raciocínio. | `low` |
| `SEMANTIC_AI_REFRESH` | `1` ignora o cache e força uma análise nova (paga). | desligado |
| `SEMANTIC_AI` | `off` desliga a análise por IA. O vídeo sai básico; só para depuração. | ligado |
| `OPENAI_API_KEY` | Chave da API no modo `openai`. | — |
| `CODEX_BIN`, `CLAUDE_BIN` | Caminho dos executáveis, se não estiverem no PATH. | — |

:::trava Não desligue a IA para contornar um problema
`SEMANTIC_AI=off` e `SEMANTIC_AI_REFRESH=1` são escolhas conscientes. Sem a IA o vídeo não tem direção; refresh sem motivo só gasta.
:::

## Reconhecimento de fala

| Variável | Efeito | Padrão |
|---|---|---|
| `WHISPER_MODEL` | Modelo do faster-whisper. | `small` |
| `WHISPER_DEVICE` | `auto`, `cpu` ou `cuda`. `auto` usa a GPU NVIDIA quando disponível (cerca de 5× mais rápido). | `auto` |
| `WHISPER_COMPUTE_TYPE` | Tipo de computação. | automático |
| `AVE_PYTHON` | Python do sistema usado para criar o ambiente (3.11 a 3.13). | procura sozinho |

Trocar CPU por GPU reaproveita a transcrição. Trocar modelo ou parâmetros refaz a transcrição.

## Narração gerada

| Variável | Efeito | Padrão |
|---|---|---|
| `AVE_NARRACAO` | `gerada` faz o pipeline preferir a narração gerada à gravada. | gravada primeiro |
| `AVE_VOZ` | Voz da biblioteca (nome do arquivo em `assets/voice/<idioma>/`). | voz padrão do idioma |
| `AVE_TTS_DEVICE` | `cuda` ou `cpu`. | GPU se houver |
| `AVE_TTS_PYTHON` | Python do ambiente da narração. | `.venv-tts` |
| `HF_HOME` | Cache dos modelos de voz. | padrão do Hugging Face |

## Saída e ferramentas

| Variável | Efeito | Padrão |
|---|---|---|
| `AVE_OUTPUT_DIR` | Pasta raiz dos vídeos. | `output/` |
| `AVE_TMP_DIR` | Temporário dos renders (vários GB num vídeo longo). | `.tmp/` |
| `AVE_FFMPEG`, `AVE_FFPROBE` | ffmpeg e ffprobe usados pelo motor. | os do Remotion no Windows |
| `AVE_RENDER_GL` | Backend gráfico do render (`vulkan` no Linux com NVIDIA). | padrão do Remotion |
| `AVE_COVERAGE_LIMIT_SECONDS` | Limita a cobertura ao trecho do formato (60 na prévia). | vídeo inteiro |
