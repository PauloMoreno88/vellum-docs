---
title: Pipeline
description: As etapas que levam roteiro e narração até o vídeo, na ordem em que o motor as executa.
group: Como funciona
---

## As etapas

```etapas
Efeitos sonoros | Normaliza os efeitos sonoros usados na trilha.
Narração gerada | Só quando a geração pede voz sintética: gera o áudio a partir do roteiro.
Transcrição | O reconhecimento de fala (faster-whisper) marca o tempo de cada palavra ouvida.
Alinhamento | Casa o roteiro com as palavras ouvidas. Precisa cobrir pelo menos 90% do roteiro.
Cenas, beats e legendas | Divide o roteiro em cenas, subdivide em trechos de cerca de 4 s cortados nas pausas e monta as legendas.
Diretor semântico | A IA lê o roteiro inteiro e decide, cena a cena, o que mostrar. Resultado validado e guardado em cache.
Bíblia visual | Junta as decisões do diretor com a galeria do nicho e lista as imagens que faltam.
Narrativa | Agrupa cenas em páginas e decide os desenhos e as relações de cada página.
Composição | Decide posição, tamanho, tempo de desenho e as rotas das setas.
Contornos | Calcula o caminho que a mão percorre em cada imagem.
Cobertura de imagens | Lista o que falta. Imagem obrigatória faltando para a geração aqui.
Relatório de edição | Confere as regras de qualidade. Erro bloqueante para a geração aqui.
Render | Desenha o vídeo com o Remotion, seguindo o plano sem tomar decisões.
```

## O contrato: o plano do vídeo

Toda decisão criativa termina num único arquivo, `src/generated/video-plan.json`. O render só lê esse plano: ele não decide nada, não chama IA e funciona sem internet depois que as imagens e os caches existem.

:::regra Decisão no planner, nunca no render
Se algo está errado na tela, a correção é na etapa que decidiu aquilo (diretor, narrativa ou composição), não no componente que desenha.
:::

## Onde cada coisa é decidida

| Problema | Camada responsável |
|---|---|
| Mostrou a coisa errada | Diretor semântico ou galeria |
| Apareceu cedo ou tarde demais | Alinhamento, anchors ou planner |
| Posição, tamanho, repetição ou seta | Composição |
| Traço, mão, reveal da imagem | Render |
| Texto no idioma errado | Arquivos de tradução ou prompt do diretor |
| Imagem faltando | Galeria e cobertura |

## Entradas e saídas por idioma

| Tipo | Caminho |
|---|---|
| Entrada | `input/<idioma>/roteiro.txt` e `narracao.*` (ou `narracao-gerada.wav`) |
| Cache | `cache/<idioma>/` (transcrição, análise, relatórios) |
| Plano | `src/generated/video-plan.json` (sempre o **último** idioma preparado) |
| Vídeo | Pasta de saída, por idioma (no app, por nicho e canal) |

## Prévia de 60 segundos

A prévia prepara o plano completo e limita só o render ao primeiro minuto. Por isso métricas, decisões e problemas são os mesmos do vídeo completo, e a cobertura só exige as imagens que aparecem nesse minuto.

## Cache e custo

| O que muda | O que é refeito |
|---|---|
| Áudio, roteiro ou parâmetros do reconhecimento de fala | Transcrição |
| Roteiro, cenas, galeria, perfil do nicho, estilo do vídeo, modelo ou instruções do diretor | Análise do diretor (paga) |
| Só composição ou render | Nada pago: transcrição e análise vêm do cache |

Quando uma imagem pedida pelo diretor é importada com a descrição compatível, o motor tenta atualizar a decisão pendente sem pagar uma leitura completa do roteiro.
