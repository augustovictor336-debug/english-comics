# English Comics

**Learn Words. Build Sentences. Speak English!**

Plataforma de estudo de inglês com visual de história em quadrinhos. O aluno aprende pelo menos 15 palavras por semana, vê como usar cada uma em frases e situações reais, monta frases, faz exercícios, revisa com repetição espaçada e conversa com um professor de IA.

## Páginas

- **Dashboard:** saudação, nível, progresso, sequência de dias, XP, plano da semana, meta diária, próximas atividades e palavras para revisar.
- **Vocabulário da semana:** 15 palavras por semana, com tradução, pronúncia para brasileiros, áudio, classe gramatical, significado, exemplos traduzidos, situações de uso e expressões relacionadas. Também tem banco de palavras com busca e favoritas.
- **Word in Action:** um verbo (get, take, make, have, look, keep, run, work) em 3 ou 4 situações ilustradas, com frases para completar.
- **Construção de frases:** 8 estruturas (afirmativa, negativa, pergunta, auxiliares, tempos verbais, pronomes, preposições), com montagem de frases por arrastar ou tocar.
- **Exercícios:** 10 modalidades com correção imediata e explicação em português.
- **Conversação com IA:** 8 situações reais, com correção e explicação em português (precisa de backend, veja abaixo).
- **Revisão inteligente:** flashcards com repetição espaçada (1, 3, 7, 14, 30 e 60 dias), palavras difíceis e erros recentes.
- **Meu progresso:** gráficos semanais e mensais, acertos por modalidade, histórico e relatório semanal.
- **Conquistas:** XP, níveis, personagem que evolui, medalhas, desafios diários, metas semanais e ranking pessoal.

## Como rodar

É um site estático, sem etapa de build. Abra o `index.html` ou publique a pasta no GitHub Pages.

```bash
python3 -m http.server 8000   # depois acesse http://localhost:8000
```

## O que funciona em cada lugar

| Recurso | GitHub Pages / navegador | Versão no claude.ai |
|---|---|---|
| Todas as páginas, exercícios, revisão e gamificação | ✅ | ✅ |
| Progresso salvo | Neste navegador (localStorage) | Na conta do claude.ai |
| Áudio de pronúncia | Voz do navegador | Voz do Claude |
| Microfone na conversa | Chrome e Edge | Chrome, Edge e app desktop |
| Professor de IA e correção de frases próprias | Pendente: precisa de backend | ✅ |
| Gerar novas semanas com IA após as 90 palavras | Pendente: precisa de backend | ✅ |

Sem a IA configurada, o site mostra "configuração pendente" e não simula respostas.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Layout e estilos |
| `data.js` | Conteúdo: 90 palavras (A1 a C1), Word in Action, estruturas, erros, diálogos, teste de nivelamento |
| `core.js` | Estado, armazenamento, IA, voz, XP e conquistas |
| `art.js` | Personagens SVG originais, ícones e gráficos |
| `session.js` | Geradores de questões e sessão de exercícios |
| `pages.js` | Páginas, navegação e inicialização |

## Próximo passo sugerido

Para ativar a IA fora do claude.ai: criar uma Edge Function (Supabase ou similar) que recebe o prompt, chama a API do modelo com a chave guardada no servidor e devolve o JSON. Depois, adaptar `AI.json()` em `core.js` para chamar esse endpoint.
