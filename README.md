# CyberCheck 🔐
### Diagnóstico educativo de segurança digital para pequenos empreendedores

[![Status](https://img.shields.io/badge/status-MVP%20publicado-success)](https://cybercheckapp.lovable.app)
[![Idioma](https://img.shields.io/badge/idioma-PT--BR-blue)](https://github.com/sunmilyoliveira/cybercheckapp)

O **CyberCheck** é uma aplicação web que ajuda MEIs, trabalhadores autônomos e pequenos empreendedores a identificar hábitos digitais que podem representar riscos à segurança de seus negócios.

Por meio de um questionário simples, a plataforma apresenta uma pontuação educativa e recomendações práticas para melhorar a proteção de contas, dispositivos e informações comerciais.

🌐 **Aplicação:** https://cybercheckapp.lovable.app

📂 **Repositório:** https://github.com/sunmilyoliveira/cybercheckapp

---

## 1. O problema

Pequenos empreendedores utilizam ferramentas digitais como WhatsApp, Instagram, e-mail e aplicativos financeiros para divulgar produtos, atender clientes e administrar seus negócios.

Entretanto, nem todos possuem conhecimentos técnicos ou orientação adequada sobre segurança digital.

Hábitos como reutilizar senhas, não habilitar autenticação em dois fatores, deixar dispositivos desatualizados e não realizar backups podem aumentar a exposição a riscos.

O problema identificado é a dificuldade de acesso a orientações simples e acessíveis sobre segurança digital para pessoas que não possuem uma equipe de tecnologia.

## 2. A solução

O CyberCheck propõe um diagnóstico educativo que transforma práticas básicas de segurança digital em perguntas simples e recomendações compreensíveis.

A plataforma permite que o empreendedor:

- Avalie hábitos de segurança digital.
- Identifique pontos que precisam de atenção.
- Visualize uma pontuação geral e por categoria.
- Receba recomendações personalizadas.
- Demonstre interesse em um relatório avançado.

## 3. Público-alvo

- Microempreendedores individuais (MEIs).
- Trabalhadores autônomos.
- Pequenos empreendedores.
- Negócios que utilizam WhatsApp e Instagram como ferramentas de trabalho.

O público inicial considerado no projeto está em Manaus e região, com possibilidade de expansão para outras localidades.

## 4. Pesquisa de mercado e dimensionamento

A pesquisa secundária identificou um mercado potencial expressivo.

Segundo levantamento divulgado pelo Sebrae em junho de 2026, o Brasil possuía aproximadamente **24 milhões de pequenos negócios ativos**. Esse universo representa o mercado potencial amplo, mas não significa que todos sejam clientes do CyberCheck.

Fonte: [Sebrae — Pequenos negócios somam 24 milhões de empresas ativas](https://agenciasebrae.com.br/dados/pequenos-negocios-somam-24-milhoes-de-empresas-ativas/).

### TAM, SAM e SOM

| Indicador | Estimativa inicial |
|---|---:|
| TAM | 24 milhões de pequenos negócios |
| SAM | 1,2 milhão de negócios (hipótese de 5% do TAM) |
| SOM | 100 clientes como meta inicial hipotética |

**Observação metodológica:** o SAM de 1,2 milhão é uma hipótese de segmentação, não um levantamento comprovado do número de negócios que utilizam os canais digitais considerados. O SOM de 100 clientes representa uma meta inicial, não uma participação de mercado já conquistada.

Essas estimativas deverão ser refinadas com pesquisas e dados específicos do público-alvo.

## 5. Validação da ideia

A validação inicial foi realizada por meio de:

- Pesquisa secundária sobre o mercado de pequenos negócios.
- Análise do problema e do público-alvo.
- Estruturação das hipóteses de negócio com apoio do ChatGPT.
- Construção e testes funcionais do protótipo.

Não foram realizadas entrevistas com empreendedores nesta etapa. Portanto, a disposição do público para pagar pelo relatório avançado permanece uma hipótese a ser validada.

### Hipótese central

MEIs e pequenos empreendedores que dependem de ferramentas digitais precisam de uma maneira simples e acessível de identificar hábitos que podem comprometer a segurança de seus negócios.

### Hipóteses comerciais

- O público reconhece a importância da segurança digital.
- Um questionário simples facilita a identificação de pontos de melhoria.
- Recomendações práticas podem gerar valor percebido.
- Parte dos usuários poderá demonstrar interesse em um relatório mais detalhado.

Essas hipóteses ainda precisam de validação com usuários reais.

## 6. Business Model Canvas

| Bloco | Definição |
|---|---|
| Segmentos de clientes | MEIs, autônomos e pequenos empreendedores |
| Proposta de valor | Diagnóstico educativo e recomendações simples de segurança digital |
| Canais | Aplicação web, Instagram, WhatsApp e comunidades empreendedoras |
| Relacionamento | Diagnóstico automatizado e orientações práticas |
| Fontes de receita | Relatório avançado e possível orientação individual |
| Recursos principais | Plataforma, questionário e base de recomendações |
| Atividades principais | Desenvolvimento, manutenção e atualização do conteúdo |
| Parcerias principais | Comunidades de empreendedores e profissionais de tecnologia |
| Estrutura de custos | Hospedagem, ferramentas de desenvolvimento, manutenção e divulgação |

### Modelo comercial experimental

- Diagnóstico básico: gratuito.
- Relatório avançado: preço experimental de R$ 29,90.
- Orientação individual: possibilidade futura.

O MVP não possui integração com pagamentos. As solicitações de interesse são registradas para contato posterior.

## 7. Funcionalidades do MVP

### Página inicial
Apresentação do CyberCheck, seus objetivos e acesso ao diagnóstico.

### Questionário
- 10 perguntas.
- 5 categorias de segurança digital.
- Navegação por etapas.
- Validação de respostas obrigatórias.

### Resultado
- Pontuação geral de 0 a 100.
- Pontuação por categoria.
- Classificação educativa.
- Recomendações personalizadas.

### Relatório avançado
Apresentação da oferta experimental e formulário para registrar interesse.

### Painel administrativo
- Visualização de diagnósticos.
- Consulta de solicitações.
- Acompanhamento de status.
- Acesso à conversa pelo WhatsApp.

## 8. Regra de pontuação

O cálculo é determinístico e não utiliza inteligência artificial.

Cada resposta recebe uma pontuação:

- 100 pontos: prática adequada.
- 50 pontos: prática parcialmente adequada.
- 0 pontos: prática que precisa de melhoria.

A pontuação de cada categoria corresponde à média das duas perguntas relacionadas a ela.

A pontuação geral corresponde à média das cinco categorias.

### Classificação educativa

| Pontuação | Classificação |
|---|---|
| 0–39 | Precisa de atenção |
| 40–69 | Proteção intermediária |
| 70–100 | Boas práticas identificadas |

Respostas abaixo da pontuação máxima geram recomendações. As respostas com pontuação zero recebem prioridade alta.

## 9. Tecnologias utilizadas

O projeto foi desenvolvido com auxílio do Lovable.

Tecnologias e ferramentas identificadas no projeto:

- React
- TypeScript
- TanStack Start
- Vite
- Tailwind CSS
- Supabase Client
- Lovable Cloud
- Vitest

O Lovable Cloud é utilizado para os recursos de autenticação e persistência da aplicação.

## 10. Segurança e privacidade

O projeto considera princípios básicos de proteção de dados:

- Acesso administrativo protegido por autenticação.
- Restrição de acesso aos registros administrativos.
- Armazenamento apenas de informações necessárias ao funcionamento.
- Não solicitação de senhas ou códigos de autenticação.
- Não solicitação de dados bancários ou documentos pessoais.

O painel administrativo possui acesso restrito. As permissões devem ser aplicadas e verificadas no backend, não apenas na interface.

## 11. Testes realizados

Os seguintes testes funcionais foram realizados em dispositivo móvel:

| Teste | Resultado |
|---|---|
| Validação de perguntas obrigatórias | Aprovado |
| Preenchimento das 10 perguntas | Aprovado |
| Cálculo da pontuação | Aprovado |
| Exibição das recomendações | Aprovado |
| Registro de diagnóstico | Aprovado |
| Registro de interesse no relatório | Aprovado |
| Restrição de acesso para usuários não autenticados | Aprovado |
| Acesso ao painel administrativo | Testado após criação da conta administrativa |

Também foram implementados testes automatizados para verificar o cálculo da pontuação e as faixas de classificação.

## 12. Mega prompt e desenvolvimento com IA

O desenvolvimento utilizou um mega prompt estruturado com as seguintes etapas:

1. **Planejamento:** definição do problema, público-alvo, páginas, funcionalidades e regras de negócio.
2. **Construção:** desenvolvimento da aplicação, questionário, cálculo de pontuação, recomendações e painel administrativo.
3. **Verificação:** revisão de navegação, validações, persistência, responsividade e controle de acesso.

### Diretrizes principais do prompt

- Desenvolver uma aplicação em português brasileiro.
- Criar uma identidade visual profissional e responsiva.
- Manter o escopo restrito ao MVP.
- Utilizar Lovable Cloud.
- Não integrar APIs externas ou inteligência artificial.
- Não implementar pagamentos automáticos.
- Implementar cálculo determinístico.
- Verificar funcionalidades antes da finalização.

O prompt priorizou uma implementação concentrada para reduzir retrabalho e consumo de créditos.

## 13. Limitações e melhorias futuras

O CyberCheck é um MVP educativo, não uma ferramenta de auditoria técnica.

Possíveis evoluções:

- Validação da proposta com empreendedores reais.
- Refinamento das perguntas e recomendações.
- Geração de relatório em PDF.
- Implementação de pagamento integrado.
- Ampliação da base de conteúdos educativos.
- Novas funcionalidades de acompanhamento de boas práticas.

## 14. Capturas de tela

As imagens abaixo podem ser adicionadas à pasta `screenshots/` do repositório:

| Tela | Arquivo |
|---|---|
| Página inicial | `screenshots/home.png` |
| Questionário | `screenshots/questionario.png` |
| Resultado | `screenshots/resultado.png` |
| Painel administrativo | `screenshots/admin.png` |

*Substitua os nomes pelos arquivos reais das capturas de tela adicionadas ao projeto.*

## 15. Acesso ao projeto

- **Aplicação publicada:** https://cybercheckapp.lovable.app
- **Código-fonte:** https://github.com/sunmilyoliveira/cybercheckapp

---

## Aviso

O CyberCheck possui finalidade educativa e informativa. Sua pontuação não representa auditoria técnica, teste de invasão, certificação ou garantia de segurança digital.

---

**Desenvolvido como projeto prático do desafio da DIO.**
