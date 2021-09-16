import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/matricula', async (req, resp) => {
    try {
        let r = await db.tb_matricula.findAll({ order: [[ 'id_matricula', 'desc' ]] });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/matricula', async (req, resp) => {
    try {
        let { nome, chamada, curso, turma } = req.body;

        if (nome == '' || chamada == '' || curso == '' || turma == '')
            return resp.send({ erro: ' Preencha todos os campos!' })

        if (nome.length < 4 || curso.length < 4 || turma.length < 4)
            return resp.send({ erro: ' Insira mais que 4 caracteres!' });


        let chamadaRepetida = await db.tb_matricula.findOne({ where: { nr_chamada: chamada } })
        let turmaRepetida = await db.tb_matricula.findOne({ where: { nm_turma: turma } })
        if (chamadaRepetida != null && turmaRepetida != null)
            return resp.send({ erro: 'O número de Chamada já existe nesta turma!' });


        if (chamada <= 0)
            return resp.send({ erro: ' Números negativos não são permitidos' });
        

        let r = await db.tb_matricula.create({
            nm_aluno: nome,
            nr_chamada: chamada,
            nm_curso: curso,
            nm_turma: turma
        })

        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Deu erro' });
        console.log(e.toString());
    }
})

app.put('/matricula/:id', async (req, resp) => {
    try {
        let { nome, chamada, curso, turma } = req.body;
        let { id } = req.params;

        if (nome == '' || chamada == '' || curso == '' || turma == '')
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

app.delete('/matricula/:id', async (req, resp) => {
    try {
        let { id } = req.params;

        let r = await db.tb_matricula.destroy({ where: { id_matricula: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.listen(process.env.PORT,
            x => console.log(`Server up at port ${process.env.PORT}`))