# App for Studio the pilátes PI-FATEC


# visualizar o banco de dados: 
    docker run -d --name mongo-container -p 27017:27017 mongo ou docker start mongo-container
    docker exec -it mongo-container mongosh
    show dbs
    use Pilates
    show collections

# simular role:
    Aluno:
    localStorage.setItem("usuarioLogado", JSON.stringify({id: "Aluno123", role: "aluno"}));

    Recepcionista:
    localStorage.setItem("usuarioLogado", JSON.stringify({role: "recepcionista"}));

    Instrutor:
    localStorage.setItem("usuarioLogado", JSON.stringify({role: "instrutor"}));