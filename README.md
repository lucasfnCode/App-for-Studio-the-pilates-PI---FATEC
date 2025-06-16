# App for Studio of Pilates PI-FATEC

## 🎯 Objetivo

O propósito deste projeto é criar um site dedicado ao gerenciamento de estúdios de pilates.  
A ideia é oferecer uma plataforma que seja não apenas intuitiva, mas também super eficiente, facilitando o controle de alunos, o agendamento de aulas, a presença e o histórico de atividades.  
Com essa aplicação, buscamos otimizar a rotina dos profissionais, aprimorar a experiência dos clientes e reunir todas as informações essenciais para o funcionamento do estúdio em um único ambiente digital.

---

## 💻 Tecnologias Utilizadas

### 🧠 Back-End

- **Java 17**  
  Linguagem robusta e orientada a objetos, usada para construir a lógica e estrutura principal da aplicação.

- **Spring Boot**  
  Framework que facilita o desenvolvimento de aplicações Java, oferecendo configuração automática, segurança e integração com banco de dados.

- **MongoDB**  
  Banco de dados NoSQL que armazena dados em formato flexível (JSON-like), ideal para lidar com estruturas dinâmicas e escaláveis.

### 🎨 Front-End

- **JavaScript**  
  Linguagem de programação que dá vida à interface, permitindo interações, chamadas à API e dinamismo nas páginas.

- **Bootstrap**  
  Framework de CSS que facilita a criação de interfaces responsivas e bonitas com componentes prontos e personalizáveis.

- **Parcel**  
  Empacotador de aplicações web que compila, agrupa e otimiza os arquivos do front-end de forma rápida e eficiente, sem necessidade de configuração complexa.

---

## ⚙️ Como executar o Projeto ?

- **Clonar o repository no GitHub**
  ```shell
  git clone https://github.com/lucasfnCode/App-for-Studio-the-pilates-PI---FATEC.git
  ```
  
- **Executar uma instancia do MongoDB**
  ```shell
  docker run --name mongodb-pilates -d -p 27017:27017 mongo
  ```

- **Executar o Backend**
  ```shell
  cd backend && ./mvnw spring-boot:run 
  ``` 

- **Executar o Frontend(Em outro terminal)**
  ```shell
  cd frontend && npm install && npm rundev
  ``` 
- **Acessar os recursos**
  #### 📺Frontend  
  [http://localhost:3000](a)

  #### 🛠️Backend
  [http://localhost:8080](a)

  #### 📖Documentação
  [Link para a documentação](http://localhost:8080/swagger-ui/index.html)


  
    

