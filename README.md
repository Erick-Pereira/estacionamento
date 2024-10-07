# Projeto Estacionamento

Este projeto é um sistema de gerenciamento de estacionamento desenvolvido com **Next.js**. Ele permite a gestão de veículos, reservas, pagamentos e vagas disponíveis.

## Índice

- [Projeto Estacionamento](#projeto-estacionamento)
  - [Índice](#índice)
  - [Recursos](#recursos)
  - [Tecnologias](#tecnologias)
  - [Instalação](#instalação)
  - [Estrutura de Dados](#estrutura-de-dados)

## Recursos

- Cadastro e gerenciamento de veículos
- Reserva de vagas de estacionamento
- Processamento de pagamentos
- Consulta de vagas disponíveis e ocupadas
  
## Tecnologias

- **Next.js**: Framework React para construção de aplicações web.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar dados do sistema.
- **Prisma**: ORM para facilitar a interação com o banco de dados.
- **Tailwind CSS**: Estilização do frontend.

## Instalação

Siga as instruções abaixo para configurar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Erick-Pereira/estacionamento.git
   cd estacionamento
   ```
2. **Instale as dependências:**
```bash
npm install
```
3. **Configurar o banco de dados:**
- Crie um banco de dados PostgreSQL.
- Configure as variáveis de ambiente em um arquivo .env.local:
```bash
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
```
4. **Executar as migrações do banco de dados:**
```bash
npx prisma migrate dev --name init
```
5. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```
6. **Acesse a aplicação:**
Abra seu navegador e acesse http://localhost:3000

## Estrutura de Dados

O projeto utiliza um modelo de dados para gerenciar as seguintes entidades:

- Veículos
- Reservas
- Pagamentos
- Vagas
- Vagas Ocupadas

As tabelas são definidas com as seguintes colunas e relacionamentos.

![alt text](<imagem.png>)

**codigos e consultas**

```bash
-- Tabela de Veículos
CREATE TABLE Veiculos (
    id_veiculo SERIAL PRIMARY KEY,
    placa VARCHAR(7) NOT NULL UNIQUE,
    modelo VARCHAR(50),
    marca VARCHAR(50),
    ano INT CHECK (ano >= 1886 AND ano <= EXTRACT(YEAR FROM CURRENT_DATE)), -- O ano deve ser realista
    cor VARCHAR(30)
);

-- Tabela de Reservas
CREATE TABLE Reservas (
    id_reserva SERIAL PRIMARY KEY,
    id_veiculo INT,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL,
    status VARCHAR(20) CHECK (status IN ('ativa', 'cancelada', 'concluída')) DEFAULT 'ativa',
    FOREIGN KEY (id_veiculo) REFERENCES Veiculos(id_veiculo) ON DELETE CASCADE
);

-- Tabela de Pagamentos
CREATE TABLE Pagamentos (
    id_pagamento SERIAL PRIMARY KEY,
    id_reserva INT,
    valor DECIMAL(10, 2) NOT NULL,
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pagamento VARCHAR(20) CHECK (metodo_pagamento IN ('cartão de crédito', 'dinheiro', 'outro')),
    FOREIGN KEY (id_reserva) REFERENCES Reservas(id_reserva) ON DELETE CASCADE
);

-- Tabela de Vagas
CREATE TABLE Vagas (
    id_vaga SERIAL PRIMARY KEY,
    numero INT NOT NULL UNIQUE,
    status VARCHAR(20) CHECK (status IN ('disponível', 'ocupada', 'reservada')) DEFAULT 'disponível'
);

-- Tabela de Vagas Ocupadas
CREATE TABLE Vagas_Ocupadas (
    id_vaga_ocupada SERIAL PRIMARY KEY,
    id_vaga INT,
    id_veiculo INT,
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_saida TIMESTAMP,
    FOREIGN KEY (id_vaga) REFERENCES Vagas(id_vaga) ON DELETE CASCADE,
    FOREIGN KEY (id_veiculo) REFERENCES Veiculos(id_veiculo) ON DELETE SET NULL
);

INSERT INTO Veiculos (placa, modelo, marca, ano, cor)
VALUES ('ABC1234', 'Fusca', 'Volkswagen', 1975, 'azul');

INSERT INTO Reservas (id_veiculo, data_inicio, data_fim)
VALUES (1, '2024-10-10 10:00:00', '2024-10-10 12:00:00');

INSERT INTO Pagamentos (id_reserva, valor, metodo_pagamento)
VALUES (1, 20.00, 'dinheiro');

INSERT INTO Vagas (numero, status)
VALUES (1, 'disponível');

INSERT INTO Vagas_Ocupadas (id_vaga, id_veiculo, data_entrada)
VALUES (1, 1, '2024-10-10 10:00:00');

SELECT * FROM Veiculos;

SELECT r.id_reserva, v.placa, v.modelo, r.data_inicio, r.data_fim, r.status
FROM Reservas r
JOIN Veiculos v ON r.id_veiculo = v.id_veiculo;

SELECT p.*
FROM Pagamentos p
JOIN Reservas r ON p.id_reserva = r.id_reserva
WHERE r.id_reserva = 1;

SELECT vo.id_vaga_ocupada, v.numero, ve.placa, vo.data_entrada
FROM Vagas_Ocupadas vo
JOIN Vagas v ON vo.id_vaga = v.id_vaga
JOIN Veiculos ve ON vo.id_veiculo = ve.id_veiculo;

UPDATE Reservas
SET status = 'concluída'
WHERE id_reserva = 1;

UPDATE Vagas
SET status = 'ocupada'
WHERE id_vaga = 1;

DELETE FROM Reservas
WHERE id_reserva = 1;

DELETE FROM Veiculos
WHERE id_veiculo = 1;

SELECT SUM(valor) AS total_pagamentos
FROM Pagamentos;

SELECT COUNT(*) AS vagas_disponiveis
FROM Vagas
WHERE status = 'disponível';

```