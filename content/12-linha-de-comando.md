---
title: Linha de comando
description: Os comandos npm do motor, para gerar vídeos, preparar imagens e inspecionar resultados sem o app.
group: Referência
---

Todos os comandos rodam na raiz do repositório do motor. Os comandos de vídeo aplicam todas as travas; os de render manual, não.

## Gerar vídeos

```bash
# Português
npm run video:60s
npm run video:completo

# Outros idiomas (en, es, fr)
npm run video:en:60s
npm run video:en

# Com narração gerada a partir do roteiro
npm run video:narrado:60s
npm run video:narrado
npm run video:en:narrado
```

Os comandos `*:narrado` geram a narração antes e salvam como `video-completo-narrado.mp4` ou `video-60s-narrado.mp4`, sem sobrescrever o vídeo da narração gravada.

| Opção do `build-video.mjs` | Efeito |
|---|---|
| `--so-imagens` | Roda até a cobertura de imagens e para. É o botão **Buscar imagens** do app. |
| `--narracao` | Gera a narração antes da transcrição. |

## Rodar uma ferramenta em outro idioma

```bash
node scripts/with-lang.mjs en prepare
node scripts/with-lang.mjs es edit:report
```

## Preparar e inspecionar

| Comando | O que faz |
|---|---|
| `npm run prepare` | Monta o plano do idioma ativo (transcrição e análise vêm do cache). |
| `npm run transcribe` | Só a transcrição. |
| `npm run edit:report` | Relatório de qualidade do plano atual. |
| `npm run assets:check` | Confere as imagens obrigatórias. |
| `npm run studio:fast` | Abre o Remotion Studio com o plano atual, para ver quadro a quadro. |
| `npm run typecheck` | Checagem de tipos do render. |

Para conferir um instante do vídeo sem renderizar tudo:

```bash
node scripts/run-with-tmp.mjs remotion still src/index.ts AutomotiveWhiteboard cache/qa-frame.png --frame=240
```

O frame é o tempo em segundos × 30.

## Imagens

| Comando | O que faz |
|---|---|
| `npm run assets:cobertura` | Prepara e gera a lista do que falta (`pedidos/cobertura.md`). Termina com erro se houver imagem obrigatória faltando. |
| `npm run assets:importar -- <pasta>` | Importa em lote os PNGs nomeados com os IDs pedidos. Valida tudo antes e não importa nada se um arquivo falhar. |
| `npm run assets:registrar -- --id <id> --file <png>` | Registra uma imagem avulsa (fora da fila, informe também `--category` e `--description`). |
| `npm run assets:icones` | Lista os ícones de conceito ainda sem PNG. |
| `npm run assets:contornos` | Recalcula os contornos das imagens. |
| `npm run assets:rotulos` | Gera os rótulos curtos de tela por idioma para imagens novas. |

O nicho ativo vem da variável `AVE_NICHE` (padrão: automotivo).

## Narração e vozes

| Comando | O que faz |
|---|---|
| `npm run alignment:setup` | Cria o ambiente do reconhecimento de fala (`.venv`). Os comandos de vídeo rodam isso sozinhos se faltar. |
| `npm run narracao:setup` | Cria o ambiente da narração gerada (`.venv-tts`), com GPU se houver placa NVIDIA. |
| `npm run narracao` | Gera `input/<idioma>/narracao-gerada.wav` a partir do roteiro. |
| `npm run voz:adicionar -- <arquivo> --nome <nome>` | Adiciona uma voz à biblioteca do idioma. |

## Perfil do nicho

```bash
node scripts/niche-profile-draft.mjs --nicho nutricao --nome "Nutrição" --roteiro exemplo.txt --salvar
```

Gera o rascunho do perfil com a mesma IA do diretor. Sem `--salvar`, só mostra o resultado.

## Outros

| Comando | O que faz |
|---|---|
| `npm run render:vertical` | Vídeo vertical completo. |
| `npm run shorts` | Um short vertical por capítulo. |
| `npm run sfx` | Normaliza os efeitos sonoros. |
