---
title: Desenvolvimento
description: Como trabalhar no motor sem quebrar o vídeo: diagnóstico, validação, benchmark, custo e git.
group: Referência
---

## Preparar o ambiente

- Node.js com `npm install` na raiz.
- Python 3.11 a 3.13. `npm run alignment:setup` cria o ambiente do reconhecimento de fala.
- Um provedor do diretor semântico conectado (Codex por padrão).

A primeira transcrição baixa o modelo de fala. Depois que transcrição, análise e contornos estão em cache, prepare e render funcionam offline.

## O fluxo de trabalho

```etapas
Diagnosticar | Idioma, comando, vídeo e instante exato. Leia os relatórios em cache/<idioma>/ e confira o elemento no plano.
Ver antes de mexer | Para problema visual, renderize stills antes, durante e depois do instante. Não conclua só lendo JSON.
Achar a camada | Entrada, alinhamento, diretor, narrativa, composição, imagem ou render. Corrija só nela.
Validar barato | node --check, typecheck, testes sem IA, prepare e edit:report do idioma.
Inspecionar | Stills dos frames afetados; depois a prévia de 60 s.
Relatar | Causa, arquivos, validações, métricas e o caminho do vídeo ou dos stills.
```

:::regra Não reescreva o motor
Preserve as abstrações e faça a menor mudança na camada responsável. Não edite o plano nem o arquivo de contornos à mão: corrija o planner e rode o prepare.
:::

## Validações

```bash
node --check scripts/arquivo-alterado.mjs
npm run typecheck
node scripts/test-apply-direction.mjs   # precedência das decisões do diretor (sem IA)
node scripts/test-niche-leak.mjs        # vocabulário de carro em nicho não automotivo (sem IA)
node scripts/with-lang.mjs <idioma> prepare
node scripts/with-lang.mjs <idioma> edit:report
```

No app, a checagem de tipos é `npx tsc -b` dentro de `desktop-app/`.

:::trava Critérios que não podem regredir
Alinhamento ≥ 90%, direção semântica 100%, nenhuma imagem obrigatória faltando, e zero em colisões e sobreposições de setas, sobreposição de desenhos, imagem repetida na página, conflitos de microtexto e título, textos cortados ou maiores que a caixa, moeda inválida e interrupções curtas demais.
:::

## Benchmark multi-nicho

Roteiros curtos de vários nichos ficam em `bench/roteiros/`. O benchmark prepara todos num commit qualquer, num worktree separado (sua pasta de trabalho não é tocada), com a mesma narração para todos os commits:

```bash
node scripts/bench-niches.mjs --ref <commit> --label antes
node scripts/bench-niches.mjs --ref HEAD --label depois
node scripts/bench-niches.mjs --compare antes,depois
```

A comparação sai em `bench/resultados/antes-x-depois.md`: elementos por tipo, páginas com pessoa, imagens pedidas, ocupação do quadro, erros e avisos, e vocabulário de outro nicho nos textos e pedidos. Use `--nichos a,b` para rodar só alguns e `--keep` para manter o worktree e renderizar stills.

## Custo e cache

- Não apague caches inteiros como primeira tentativa.
- Mudanças só em composição ou render reaproveitam transcrição e análise.
- Antes de forçar uma análise nova, explique por que o cache não representa mais a entrada.
- Mudar o prompt, o schema, o perfil, o estilo ou a galeria de um nicho faz todo vídeo desse nicho pagar uma análise nova.

## Idiomas

Todo texto de tela vem do roteiro, do diretor ou dos arquivos de tradução. Padrões de texto que ficaram no código (números por extenso, moeda, conectivos) cobrem português, inglês, espanhol e francês. Nunca acrescente regex de assunto: o assunto vem do diretor.

## Git

- Prefixo convencional nos commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.
- Plano gerado, cache, entradas e vídeos não entram em commits de código.
- Imagens aprovadas em `assets/nichos/**` e os manifestos são acervo e entram junto com o registro.
- Antes de juntar um branch grande, rode a revisão de PR (mede o efeito no vídeo, base × PR, sem pagar análise).

## Atualização do app

O app instalado se atualiza sozinho a partir de releases publicados pela equipe: verifica ao abrir e a cada 4 horas, baixa só o que mudou e pede para instalar antes de continuar. Nunca reinicia durante uma geração.

:::regra Cada push na main vira uma atualização
Um workflow do GitHub Actions roda a cada push na `main` do motor: aumenta o patch da versão do app, gera o instalador do Windows, publica a atualização e só então registra a versão nova na `main`. Commit que só muda documentação também gera atualização; junte as mudanças antes de enviar para a `main`.
:::
