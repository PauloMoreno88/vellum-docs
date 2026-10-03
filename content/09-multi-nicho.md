---
title: Multi-nicho
description: Como o mesmo motor serve qualquer assunto com a mesma qualidade, e o formato do perfil do nicho.
group: Como funciona
---

## A regra

:::regra O nicho é dado, o diretor decide, o código executa
| Papel | Onde | Responsabilidade |
|---|---|---|
| Nicho = dados | `assets/nichos/<nicho>/` | Galeria de imagens e perfil `nicho.md`. |
| Diretor = decisões | Diretor semântico | Único que lê o perfil. Escolhe imagem, pessoa, textos e pede imagens novas. |
| Código = execução | Narrativa, composição, render | Geometria, tempo, setas e mão. Não sabe qual é o nicho. |
:::

Na prática:

- não existe `if` de nicho no código;
- não existe lista fixa de peças, personagens ou títulos de um assunto;
- regras de qualidade (pessoa nos primeiros minutos, meta de personagens por página) valem para todo nicho que tem pessoas recorrentes no perfil;
- um nicho novo só precisa de **perfil** e **imagens**.

## O arquivo nicho.md

O perfil é um Markdown com seções fixas. O app escreve esse arquivo pela tela **Perfil do Nicho**, mas ele pode ser editado à mão.

```markdown
# Nutrição

## Assunto

Canal sobre alimentação prática para adultos com rotina corrida...

## Estilo das imagens

- Paleta preferida: verde folha para vegetais, laranja para energia, ...
- Visual acolhedor e didático, com alimentos reconhecíveis

### Objetos

- Pratos mostram a proporção entre vegetais, proteína e carboidratos

### Personagens

- Roupas casuais do dia a dia

### Comparações e metáforas

- Gráficos de fome e glicose com formas simples

## Pessoas recorrentes

- Nutricionista: mulher de uns 35 anos, jaleco claro, prancheta
- Adulto apressado: homem de uns 30 anos, roupa de trabalho, mochila

## Conceitos extras

- hunger-cycle: ciclo de fome e compensação
```

| Seção | Limite | Usada por |
|---|---|---|
| Assunto | 1.500 caracteres | Prompt do diretor |
| Estilo das imagens | 12 regras por grupo | Prompts de imagem |
| Pessoas recorrentes | 16 pessoas | Prompt do diretor e pedidos de imagem de pessoa |
| Conceitos extras | 12 conceitos | Lista de conceitos do diretor |

Sem o arquivo, o nicho usa só as regras universais.

## Conceitos universais

Todo nicho tem estes conceitos; o perfil pode acrescentar outros e redefinir o significado de um deles.

`hidden` (problema oculto), `money` (custo ou economia), `hazard` (alerta), `broken` (falha ou desgaste), `check` (verificação ou solução), `clock` (tempo), `manual-check` (checklist), `person` (pessoa), `heat` (temperatura), `calendar` (datas), `map` (lugar), `compare` (comparação).

## Estilo das imagens em camadas

O prompt de toda imagem junta duas camadas, sem trocar palavras:

1. **Regras universais**: formato, transparência, enquadramento, contorno, sem texto. Iguais para todo nicho.
2. **Estilo do nicho**: a seção "Estilo das imagens" do perfil (paleta, aparência, regras por tipo).

## Teste de vazamento

Um teste automático monta as instruções do diretor e os prompts de imagem de cada nicho que não é o automotivo e falha se aparecer vocabulário de carro que não veio do próprio perfil daquele nicho. Ele roda sem chamar nenhuma IA.

## Medindo a qualidade entre nichos

Mudanças que afetam vários nichos são medidas com o benchmark multi-nicho: os mesmos roteiros curtos de vários nichos, preparados no commit de antes e no de depois, com métricas comparadas lado a lado (pessoas por página, imagens pedidas, ocupação do quadro, erros). Veja [Desenvolvimento](desenvolvimento.html#benchmark-multi-nicho).
