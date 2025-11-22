## 🚀 Passo a Passo rápido para rodar o projeto
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Inicie o projeto: `npx expo start`
4. Baixe o app Expo Go para Android ou IOS.
5. Caso tenha problemas de rede, utilize o modo túnel: `npx expo start --tunnel`

### ▶️ Vídeo Explicativo
Link para o vídeo: (https://youtu.be/u3xOb1Ls8JQ?si=LkNa_fhB4G9ypdvJ)

## 📌 Integrantes
- Eduardo Gomes Pinho Junior - 97919
- Gustavo Ferreira Lopes - 98887
- Enzo de Oliveira Cunha - 550985
---
# 🚀 Future Tasks - Global Solution 2025

> **Tema:** O Futuro do Trabalho
> **Disciplina:** Mobile Development & IoT (3ESA/3ESR)

![Badge](https://img.shields.io/badge/Status-Concluído-green)
![Badge](https://img.shields.io/badge/Tecnologia-React_Native-blue)

## 📖 Sobre o Projeto

O **Future Tasks** é uma aplicação móvel desenvolvida para atender aos desafios do trabalho moderno e híbrido. A solução propõe uma gestão de tarefas inteligente onde a tecnologia atua como parceira do ser humano.

O app foca na organização pessoal e profissional, utilizando uma **IA Simulada** para oferecer dicas de melhoria na execução das tarefas ("Human in the Loop"), priorização de riscos e persistência local de dados, garantindo produtividade mesmo offline.

### 🎯 Funcionalidades Principais

* **Login Simulado:** Personalização da experiência do usuário ("Olá, [Nome]").
* **Gestão de Tarefas (CRUD):** Criar, Listar, Detalhar e Excluir tarefas.
* **IA Partner:** Um algoritmo que analisa o título/descrição da tarefa e sugere melhorias ou alertas de risco (ex: sugerir testes automatizados para tarefas de QA).
* **Priorização Visual:** Classificação de tarefas por nível de risco (Baixa, Média, Alta) com indicadores visuais.
* **Dashboard de Progresso:** Barra de progresso motivacional baseada nas tarefas concluídas.
* **Persistência de Dados:** Uso do `AsyncStorage` para salvar todas as informações localmente no dispositivo.

### 👁️ Visão Computacional (Integração Roboflow)

O app conecta o mundo físico ao digital através de um modelo de detecção de objetos treinado no **Roboflow**.

* O maior desafio do trabalho híbrido é a desconexão entre o escritório físico e as ferramentas digitais.
* O Problema: Equipes fazem reuniões presenciais incríveis, enchem o quadro branco de ideias, mas depois alguém perde horas digitando tudo isso no sistema.
* Solução: Criamos uma "ponte automática". O que é desenhado no físico vira dado no digital instantaneamente. Isso é a definição de preparar organizações para novos tempos e ambientes híbridos.

* **Digitalização de Quadros:** Tire uma foto de um quadro branco com post-its ou desenhos.
* **Lógica Visual:** O sistema identifica cores para definir atributos automaticamente:
    * 🔴 **Vermelho:** Prioridade Alta (A Fazer)
    * 🔵 **Azul:** Prioridade Média (Em Andamento)
    * 🟢 **Verde:** Tarefa Concluída (Done)
* **Evidência:** A foto original é salva e anexada aos detalhes da tarefa para rastreabilidade.

* ### ▶️ Vídeo Explicativo para matéria de IOT
Link para o vídeo: (https://youtu.be/u3xOb1Ls8JQ?si=LkNa_fhB4G9ypdvJ)

---

## 🛠️ Tecnologias Utilizadas

* **React Native (Expo):** Framework principal.
* **AsyncStorage:** Para persistência de dados local.
* **React Navigation:** Para navegação entre telas (Stack).
* **Expo Vector Icons:** Ícones da interface.

---

## 📦 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (versão LTS recomendada).
* [Git](https://git-scm.com).
* Aplicativo **Expo Go** instalado no seu celular (Android ou iOS) ou um emulador configurado.

---


