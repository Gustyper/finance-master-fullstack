Este é um projeto de estudo desenvolvido para consolidar conhecimentos em desenvolvimento **Full Stack** utilizando a stack **MERN** (MongoDB, Express, React, Node.js). A aplicação oferece uma interface para controle de finanças pessoais e gestão básica de ativos (Ações e FIIs).
O foco principal foi o aprendizado de arquitetura de software, explorando a comunicação entre o frontend e o backend, gerenciamento de estado global com **Context API** e persistência de dados em banco de dados NoSQL.

### **Frontend**
- **React (Vite)**: Construção da interface declarativa.
- **Context API**: Gerenciamento de estado global (substituindo o prop drilling).
- **Recharts**: Visualização de dados por meio de gráficos de barras dinâmicos.
- **Axios**: Cliente HTTP para comunicação com a API.
- **Hooks Customizados**: Extração de lógica matemática e cálculos de saldo.

### **Backend**
- **Node.js & Express**: Criação da API REST e roteamento.
- **MongoDB & Mongoose**: Banco de dados NoSQL e modelagem de dados via Schemas.
- **Dotenv**: Segurança no gerenciamento de variáveis de ambiente.


## 📂 Estrutura do Projeto
```text
├── client/          # Frontend (React)
│   ├── src/
│   │   ├── components/  # Componentes de UI
│   │   ├── contexts/    # Estado global (FinanceContext)
│   │   ├── hooks/       # Lógica de resumo (useSummary)
│   │   └── services/    # Configuração do Axios
└── server/          # Backend (Node.js)
    ├── src/
    │   ├── models/      # Definição do Schema do MongoDB
    │   └── routes/      # Endpoints (GET, POST, DELETE)
