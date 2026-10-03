---
title: Primeiros passos
description: Instalar o Vellum, preparar o computador e deixar tudo pronto para o primeiro vídeo.
group: Usar o Vellum
---

## Instalar

O Vellum é instalado por usuário, sem precisar de administrador. Depois de instalado, ele se atualiza sozinho: quando há versão nova, o app pede para atualizar antes de continuar (você pode fechar e atualizar depois; durante uma geração ele espera terminar).

## O que é baixado na primeira vez

| Item | Obrigatório? | Onde fica no app |
|---|---|---|
| **Reconhecimento de fala** (Python + Whisper) | Sim. É o que descobre quando cada palavra é dita. | Instalado na primeira execução |
| **Narração gerada** (voz sintética, 2 a 6 GB) | Não. Só se você quiser gerar o áudio a partir do roteiro. | Ajustes → Narração |
| **Acervo oficial de imagens** | Não. Pacote de imagens da equipe para o nicho automotivo. | Ajustes → Imagens |

Sem a narração gerada, você sempre precisa enviar um áudio gravado junto com o roteiro.

## Escolher quem analisa o roteiro

Em **Ajustes → Análise do roteiro** você escolhe a IA que faz o papel de diretor semântico:

| Opção | Quando usar |
|---|---|
| **Neste computador** (Codex) | O modo usual. Precisa do Codex instalado e conectado. |
| **Com o Claude** | Precisa do Claude CLI instalado e conectado. |
| **Com chave OpenAI** | Envia o roteiro para a API da OpenAI com a sua chave. |
| **Colando no chat** | A geração pausa e mostra um pedido para você colar no chat de uma IA e devolver a resposta. |

Todas recebem exatamente as mesmas instruções. Muda só o caminho até a IA.

## Escolher a pasta dos vídeos

Em **Ajustes → Pastas** fica a pasta onde os vídeos são salvos. Dentro dela o app organiza por nicho, canal e idioma.

:::passo Antes do primeiro vídeo
1. Crie um nicho (ou abra o Automotivo).
2. Escreva o perfil do nicho: botão **Perfil do Nicho**, com **Gerar rascunho com IA** para começar.
3. Crie um canal nesse nicho.
4. Siga [Gerar um vídeo](gerar-um-video.html).
:::
