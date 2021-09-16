import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) => {
    try {
        let r = await db.tb_produto.findAll({ order: [[ 'id_produto', 'desc' ]] });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/produto', async (req, resp) => {
    try {
        let {  nome, categoria, preco, avaliacao, produto, estoque, imagem  } = req.body;

        if (nome == '' || chamada == '' || curso == '' || turma == '')
            return resp.send({ erro: ' Preencha todos os campos!' })

        if (nome.length < 4 || curso.length < 4 || turma.length < 4)
            return resp.send({ erro: ' Insira mais que 4 caracteres!' });


        let chamadaRepetida = await db.tb_produto.findOne({ where: { nr_chamada: chamada } })
        let turmaRepetida = await db.tb_produto.findOne({ where: { nm_produto: produto } })
        if (chamadaRepetida != null && turmaRepetida != null)
            return resp.send({ erro: 'O número de Chamada já existe nesta turma!' });


        if (chamada <= 0)
            return resp.send({ erro: ' Números negativos não são permitidos' });
        

        let r = await db.tb_matricula.create({
            nm_produto: nome,
            ds_categoria: categoria,
            nm_curso: curso,
            nm_turma: turma
        })

        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Deu erro' });
        console.log(e.toString());
    }
})

app.put('/produto/:id', async (req, resp) => {
    try {
        let {  nome, categoria, preco, avaliacao, produto, estoque, imagem  } = req.body;
        let { id } = req.params;

        if (nome == '' || categoria == '' || preco == '' || avaliacao == '' || produto == '' || estoque == '' || imagem == '')
            return resp.send({ erro: ' Preencha todos os campos!' })

        if (nome.length < 4 || curso.length < 4 || turma.length < 4)
            return resp.send({ erro: ' Insira mais que 4 caracteres!' });

        let chamadaRepetida = await db.tb_matricula.findOne({ where: { nr_chamada: chamada } })
        let turmaRepetida = await db.tb_matricula.findOne({ where: { nm_turma: turma } })
        if (chamadaRepetida != null && turmaRepetida != null)
            return resp.send({ erro: 'O número de Chamada já existe nesta turma!' });
  
        if (chamada <= 0)
            return resp.send({ erro: ' Números negativos não são permitidos' });


        let r = await db.tb_matricula.update(
            {
                nm_aluno: nome,
                nr_chamada: chamada,
                nm_curso: curso,
                nm_turma: turma
            },
            {
                where: { id_matricula: id }
            }
        )
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.delete('/produto/:id', async (req, resp) => {
    try {
        let { id } = req.params;

        let r = await db.tb_produto.destroy({ where: { id_matricula: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.listen(process.env.PORT,
            x => console.log(`Server up at port ${process.env.PORT}`))