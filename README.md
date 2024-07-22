**Descrição do Projeto**
Este projeto foi desenvolvido para demonstrar as melhores práticas de automação de testes utilizando Cypress. Ele abrange a automação de ações na aplicação web e testes de API, aproveitando uma série de plugins para aprimorar as funcionalidades do Cypress, como cy.spok, cypress-real-events, e cypress-drag-and-drop.

**Funcionalidades e Exemplos de Testes**

**Manipulação de Inputs:** Automação de preenchimento e validação de campos de texto, números, senhas e datas. Inclui a verificação de visibilidade e conteúdo de elementos.

**Adição e Remoção de Elementos:** Testes que verificam a capacidade de adicionar e remover elementos dinamicamente na interface, utilizando interações repetitivas para garantir a consistência.
**Mensagens de Notificação:** Automação de cenários que envolvem a exibição e validação de mensagens de notificação, garantindo que as respostas sejam apropriadas conforme a ação realizada.
**Interação com Tabelas Dinâmicas:** Testes que interagem com tabelas dinâmicas, incluindo a verificação de dados em tempo real e uso de validações complexas com cy.spok.
**Informações do Navegador:** Automação que coleta e valida informações do navegador do usuário, garantindo que todos os dados do browser sejam capturados corretamente.
**Verificação de Botões de Rádio:** Testes que interagem com botões de rádio, assegurando que as seleções sejam feitas corretamente e que estados de habilitação/desabilitação sejam respeitados.
**Arrastar e Soltar:** Implementação de funcionalidades de drag-and-drop utilizando o plugin cypress-drag-and-drop, incluindo a reordenação de elementos na interface.
**Interação com Circulos para Arrastar e Soltar:** Automação que move círculos coloridos para um alvo específico, validando o comportamento de arrastar e soltar com múltiplos elementos.

**Utilização dos Plugins**

**cy.spok:** Plugin usado para validação de objetos e estruturas JSON, proporcionando uma maneira mais legível e estruturada de afirmar as propriedades dos elementos.
**cypress-real-events:** Utilizado para simular eventos reais do usuário, garantindo que a automação reflita com precisão as interações manuais.
**cypress-drag-and-drop:** Facilita a implementação de funcionalidades de arrastar e soltar, permitindo testes mais naturais e interativos.
