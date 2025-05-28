# App for Studio the pilátes PI-FATEC


# visualizar o banco de dados: 
    docker run -d --name mongo-container -p 27017:27017 mongo ou docker start mongo-container
    docker exec -it mongo-container mongosh
    show dbs
    use Pilates
    show collections

# simular role:
    localStorage.setItem("usuarioLogado", JSON.stringify({role: "aluno"}));