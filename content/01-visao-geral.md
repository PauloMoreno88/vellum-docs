---
title: Visão geral
description: As partes do sistema, como elas conversam e as palavras que você vai ver no resto da documentação.
group: Começo
---

## As três partes

| Parte | O que é | Onde vive |
|---|---|---|
| **App Vellum** | O programa de desktop (Windows) que a equipe usa: nichos, canais, galeria, vozes, gerar vídeo, histórico. | `desktop-app/` |
| **Motor** | Os scripts que analisam o roteiro, planejam as páginas e renderizam o vídeo. O app roda o motor por baixo. No código ele se chama *Automotive Video Engine*. | `scripts/` e `src/` |
| **Acervo** | As imagens (PNG com fundo transparente) de cada nicho, mais o perfil do nicho. | `assets/nichos/<nicho>/` |

O app não depende de Node, Python ou do repositório na máquina do usuário: o instalador leva o motor, e o reconhecimento de fala é baixado na primeira execução.

## Como uma geração acontece

1. No app, você escolhe um **canal** (que pertence a um **nicho**), o roteiro, o áudio ou uma voz, o formato e o estilo.
2. O app chama o motor com esse nicho, idioma e estilo.
3. O motor transcreve o áudio, alinha com o roteiro, consulta o diretor semântico e monta o **plano do vídeo**.
4. Antes de desenhar, o motor confere: alinhamento de pelo menos 90%, nenhuma imagem faltando e nenhum erro de layout.
5. O vídeo é renderizado e o app guarda no histórico do canal.

O detalhe de cada etapa está em [Pipeline](pipeline.html).

## Palavras que se repetem

| Termo | Significado |
|---|---|
| **Nicho** | O assunto de um conjunto de canais (Automotivo, Nutrição, Espiritualidade...). Cada nicho tem as próprias imagens e o próprio perfil. |
| **Canal** | Um canal de vídeo dentro de um nicho, com idioma, voz e estilo padrão. |
| **Perfil do nicho** | O texto que diz do que o nicho fala, o estilo das imagens, as pessoas recorrentes e os conceitos extras. Arquivo `nicho.md`. |
| **Galeria** | Todas as imagens do nicho. Personagens também são imagens da galeria. |
| **Diretor semântico** | A IA que lê o roteiro inteiro e decide o que mostrar em cada cena. |
| **Cena** | Um trecho curto do roteiro (uma ou poucas frases). |
| **Página** | Uma tela de quadro branco que junta algumas cenas do mesmo assunto. |
| **Plano do vídeo** | O arquivo com todas as decisões (páginas, desenhos, tempos, setas). O render só segue o plano. |
| **Cobertura** | A lista de imagens que o roteiro precisa e que ainda não existem. |

O [Glossário](glossario.html) tem a lista completa.

## Idiomas

O sistema trabalha em **português, inglês, espanhol e francês**. Cada idioma tem entrada, cache e saída próprios. Nenhuma regra do motor depende de texto fixo em português: os textos de tela vêm do roteiro, do diretor ou de arquivos de tradução.
