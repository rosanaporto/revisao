const express = require('express');
const server = express();
server.use(express.json());
var tarefas = [
{
        id: 1,
        descricao: 'Comprar pao',
        finalizado: false
    },

];

server.get('/revisao', function(request, response) { 
    return response.json(tarefas);
});

server.get('/revisao/:id', function(request, response) { 
    const id = request.params.id;
    const revisao = tarefas.filter(t => t.id == id);
    return response.json(revisao);
});

server.post('/revisao', function(request, response) {
    const tarefa = request.body;
    tarefas.push(tarefa);  
    return response.status(201).send();
});

server.delete('/revisao/:id', function(request, response) { 
    const id = request.params.id;
    tarefas = tarefas.filter(t => t.id != id);
    return response.status(200).send();
});

server.put('/revisao/:id',(request, response) => {
    const id = request.params.id;
    const tarefa = request.body;

     tarefas.forEach(t => {
         if(t.id == id) {  
            t.descricao = tarefa.descricao;
            t.finalizado = tarefa.finalizado;
     return;
       }
     })

 return response.send();
});

server.listen(process.env.PORT||3000);
