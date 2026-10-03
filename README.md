# Vellum · documentação

Documentação do Vellum, o sistema que transforma roteiro e narração em vídeo explicativo desenhado à mão.

Site: https://paulomoreno88.github.io/vellum-docs/

## Editar

As páginas são arquivos Markdown em `content/`. A ordem do menu é a ordem dos nomes (`01-`, `02-`...), e cada arquivo começa com:

```markdown
---
title: Título da página
description: Uma frase sobre a página
group: Grupo do menu
---
```

Caixas de destaque (a cor diz o tipo, como as setas do vídeo):

```markdown
:::regra Título      azul: regra do sistema
:::passo Título      verde: o que fazer
:::trava Título      vermelho: o que bloqueia
:::nota Título       neutra
```

Cada caixa fecha com `:::` numa linha sozinha. Lista de etapas numeradas: bloco de código com a linguagem `etapas` e uma linha `Nome | descrição` por etapa.

## Ver localmente

```bash
npm ci
npm run serve   # http://localhost:4173
```

## Publicar

Todo push na `main` gera o site e publica no GitHub Pages (`.github/workflows/pages.yml`). O andamento aparece na aba Actions do repositório.

Esta documentação é pública. Não coloque tokens, nomes de repositórios privados, URLs internas nem caminhos de máquinas.
