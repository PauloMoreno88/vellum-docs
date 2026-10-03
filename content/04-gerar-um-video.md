---
title: Gerar um vídeo
description: Do roteiro ao arquivo final no app, incluindo o que fazer quando a geração para.
group: Usar o Vellum
---

## O que você precisa

- **Roteiro** em texto. É a fonte de tudo que aparece escrito.
- **Narração**: um áudio gravado (mp3, wav, m4a ou ogg) **ou** uma voz da biblioteca, se a narração gerada estiver instalada.

O áudio precisa ter o mesmo conteúdo do roteiro. Áudio cortado ou de outra versão do texto faz a geração parar no alinhamento.

## Passo a passo

:::passo No estúdio do canal
1. Escolha o roteiro e, se tiver, o áudio. Sem áudio, o app pede a voz.
2. Confira idioma, nicho e estilo (vêm do canal).
3. Escolha o formato: **Prévia de 60 s** ou **Vídeo completo**.
4. Clique em **Buscar imagens** para saber antes o que falta, ou direto em **Gerar vídeo**.
:::

A prévia de 60 s prepara o vídeo inteiro (as decisões são as mesmas) e só desenha o primeiro minuto. Ela também só exige as imagens que aparecem nesse minuto.

## As fases que o app mostra

```etapas
Preparando | Efeitos sonoros e conferência do ambiente.
Narrando o roteiro | Só quando a narração é gerada pela voz escolhida.
Ouvindo a narração | O reconhecimento de fala marca o tempo de cada palavra.
Planejando as cenas | O diretor semântico lê o roteiro e o motor monta as páginas.
Conferindo | Alinhamento, imagens obrigatórias e regras de qualidade.
Desenhando o vídeo | O render final, quadro a quadro.
```

O app estima o tempo de cada fase pela última geração do mesmo idioma e formato.

## Quando a geração para

O sistema prefere parar a entregar um vídeo errado. As paradas mais comuns:

| O que aparece | Por quê | O que fazer |
|---|---|---|
| Faltam imagens | O roteiro precisa de imagens que a galeria não tem. | Abra **Ver imagens que faltam**, gere as imagens com os prompts e importe a pasta. Veja [Galeria e imagens](galeria-e-imagens.html). |
| Alinhamento abaixo de 90% | O áudio não corresponde ao roteiro. | Confira se o áudio está completo e se é da mesma versão do roteiro. |
| Erro do relatório de edição | Algum problema de layout ou texto que chegaria ao vídeo. | Veja [Regras de qualidade](regras-de-qualidade.html). |
| Análise do roteiro falhou | A IA não respondeu ou não cobriu as cenas. | Confira a conexão do provedor em Ajustes e tente de novo. |

:::regra Nada é gerado pela metade
Nenhum desenho genérico substitui uma imagem que falta e nenhum vídeo sai com a narração fora de sincronia.
:::

## Onde o vídeo fica

Ao terminar, o vídeo vai para a pasta do canal com o nome `<roteiro> - <formato> - <data>.mp4` e entra no **Histórico** do canal, de onde dá para abrir, mostrar na pasta ou apagar.
