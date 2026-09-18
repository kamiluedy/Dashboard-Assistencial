# Dashboard Assistencial

Painel de indicadores clinicos e ocupacao hospitalar, com filtros interativos por periodo (mes/ano) e por setor.

## Funcionalidades

- Indicadores (KPIs): pacientes internados, leitos da maternidade, altas concedidas, taxa de retorno, entradas no periodo e ocupacao geral
- Grafico de fluxo de pacientes (entradas, altas e retornos) por mes ou por dia
- Grafico de ocupacao por setor, com destaque de status (normal / atencao / critico)
- Filtro por mes e ano
- Clique nas barras do grafico de ocupacao para filtrar por setor
- Clique nos pontos do grafico de fluxo para filtrar por mes ou por dia
- Tabela com as movimentacoes recentes de pacientes

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) (graficos)
- [Lucide](https://lucide.dev/) (icones)

## Como rodar o projeto

Pre-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
# instalar as dependencias
npm install

# rodar em modo desenvolvimento
npm run dev
```

O projeto abre por padrao em `http://localhost:5173`.

### Outros comandos

```bash
npm run build    # gera a versao de producao
npm run preview  # visualiza a versao de producao localmente
npm run lint      # roda o linter
```

## Estrutura do projeto

```
src/
  components/   componentes de UI (cards, graficos, tabela, filtros)
  data/         dados de exemplo (mock)
  lib/          funcoes de calculo, agregacao e filtro
  types.ts      tipos compartilhados
```

## Dados

Os dados exibidos sao gerados automaticamente (mock) apenas para fins de demonstracao. Para usar dados reais, substitua o conteudo de `src/data/mockData.ts` por uma integracao com sua fonte de dados (API, planilha, banco de dados etc).
