---
title: Galeria e imagens
description: Tudo sobre as imagens de um nicho, como o vídeo pede imagens novas e como importá-las.
group: Usar o Vellum
---

## A Galeria

A **Galeria** (menu lateral, com um nicho aberto, ou botão **Galeria** na tela de canais) é o único lugar de imagens do app. Nela você:

- vê todas as imagens do nicho, com filtro por origem e busca;
- adiciona imagens em lote (**Adicionar imagens**);
- apaga imagens importadas;
- abre **Imagens pedidas**: o que o último roteiro do nicho precisa e ainda não existe.

Personagens também são imagens da galeria. Não existe um cadastro separado de elenco.

## Origem das imagens

| Origem | O que é | Pode apagar? |
|---|---|---|
| **Oficiais** | Imagens da equipe, que vêm do pacote de acervo. | Não pela galeria. |
| **Importadas** | Imagens adicionadas neste computador. | Sim. |

Se uma importada tiver o mesmo nome de uma oficial, vale a importada: é uma substituição. Apagar a importada traz a oficial de volta.

## Imagens pedidas

Quando o diretor precisa de uma imagem que não existe, ele descreve o que precisa e diz o tipo: **pessoa**, **objeto** ou **metáfora**. A lista **Imagens pedidas** mostra cada pedido com:

- o **nome do arquivo** que a imagem deve ter (ex.: `part-prato-equilibrado.png`, `char-nutricionista-explicando.png`);
- de que cena ele veio e quantas vezes aparece;
- o **prompt** pronto para gerar a imagem, já com as regras técnicas e o estilo do nicho. Pedido de pessoa leva também a aparência das pessoas recorrentes, para sair a mesma pessoa.

:::passo Preencher o que falta
1. Abra **Imagens pedidas**.
2. Copie o prompt de cada item e gere a imagem (no projeto de imagens do ChatGPT ou em outra ferramenta).
3. Salve cada PNG com o nome indicado, todos numa pasta.
4. Clique em **Importar pasta de imagens** (ou em **Adicionar imagens** na galeria).
5. Gere o vídeo de novo.
:::

### Completar um rascunho com as imagens aprovadas

Um vídeo que saiu como **rascunho** por falta de imagem não precisa ser gerado de novo. Não importa onde a imagem foi aprovada: na Galeria, no editor (gerada ou importada) ou na tela de progresso, depois que o render terminou. Ao abrir o editor daquele vídeo, cada imagem aprovada é colocada no lugar do aviso "Falta imagem" e vira uma correção pendente. Basta clicar em **Aplicar**.

- No quadro, a imagem aparece como "imagem nova, entra ao aplicar" só quando ela de fato vai entrar no vídeo.
- Se o editor não conseguir colocar a imagem (a página mudou, ou a imagem já está nela), o painel do elemento diz o motivo e oferece **Colocar no vídeo** ou **Usar outra do acervo**.
- Se você desfizer a troca, ela não volta sozinha.
- Enquanto só faltarem imagens, o botão do alto mostra **Faltam N imagens** e leva até a primeira, em vez de renderizar um vídeo igual.

## Regras de cada imagem

| Regra | Detalhe |
|---|---|
| Formato | PNG com **fundo transparente** (canal alpha). Imagem sem transparência é recusada. |
| Tamanho | Quadrado, de preferência 1254 × 1254 px. |
| Enquadramento | Um assunto completo, centralizado, ocupando 72 a 84% da tela, com margem de 10%. |
| Traço | Contorno preto limpo e contínuo: é por ele que a mão desenha. |
| Texto | Nenhum texto, legenda, seta ou valor na arte. O vídeo escreve isso por cima. |
| Marcas | Sem logotipos, marcas ou personagens protegidos. |

A fonte única dessas regras é o guia de estilo do projeto de imagens (as regras técnicas são iguais para todo nicho; a paleta e o assunto vêm do perfil).

## Como o nome do arquivo é usado

| Nome do arquivo | O que acontece ao importar |
|---|---|
| Igual a um pedido (`part-…`, `char-…`) | A imagem entra com a **descrição e a categoria do pedido**. É o melhor caminho: o diretor sabe quando usá-la. |
| Igual a uma imagem existente | Substitui a imagem, mantendo a descrição. |
| Qualquer outro nome | O nome do arquivo vira o ID e a descrição. Use nomes que digam o que a imagem mostra. |

Prefixos: `part-` para objetos e ilustrações, `char-` para pessoas, `illustration-` também é aceito.

:::trava Mudar a galeria refaz a análise
A lista de imagens faz parte do que o diretor lê. Adicionar ou apagar imagens faz o próximo vídeo do nicho pagar uma análise nova. Importe tudo de uma vez.
:::

## Personagens

Pessoas são imagens com categoria `characters` (nomes `char-…`). O diretor escolhe a pessoa pela descrição, como escolhe qualquer imagem, e a composição garante:

- no máximo **2 pessoas por página**;
- **nunca a mesma pessoa duas vezes** na página (a mesma pessoa em poses diferentes conta como uma).

Para o diretor reconhecer quem é quem, a descrição de cada imagem de pessoa começa pelo nome da pessoa e depois diz a ação, por exemplo: `Mecânico (homem de uns 42 anos, macacão grafite), lendo códigos com scanner`.

## Ícones de conceito

Conceitos são ideias abstratas (dinheiro, tempo, alerta, comparação). Eles também precisam de PNG, com o nome `part-concept-<conceito>`. O diretor usa conceito só quando a ideia não tem forma concreta; para pessoas, objetos e situações ele pede uma imagem de verdade.
