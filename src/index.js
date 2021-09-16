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
        let {  nome, categoria, precod, precopor, avaliacao, produto, estoque, imagem, ativo,   } = req.body;

        if (nome == '' || categoria == '' || precod == '' || precopor == '' || avaliacao == '' || produto == '' || estoque == '' || imagem == '')
            return resp.send({ erro: ' Preencha todos os campos!' })

        if (nome.length < 4 || curso.length < 4 || turma.length < 4)
            return resp.send({ erro: ' Insira mais que 4 caracteres!' });


        
        let ProdutoRepetido = await db.tb_produto.findOne({ where: { nm_produto: produto } })
        if (ProdutoRepetido != null)
            return resp.send({ erro: 'O produto já existe nesta turma!' });


        if (chamada <= 0)
            return resp.send({ erro: ' Números negativos não são permitidos' });
        

        let r = await db.tb_produto.create({
            nm_produto: nome,
            ds_categoria: categoria,
            vl_preco_de: precod,
            vl_preco_por: precopor,
            vl_avaliacao: avaliacao,
            ds_produto: produto,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo : ativo,
            dt_inclusao: new Date()

        })

        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Deu erro' });
        console.log(e.toString());
    }
})

app.put('/produto/:id', async (req, resp) => {
    try {
        let { nome, categoria, precod, precopor, avaliacao, produto, estoque, imagem  } = req.body;
        let { id } = req.params;

        if (nome == '' || categoria == '' || precod == '' || precopor == '' || avaliacao == '' || produto == '' || estoque == '' || imagem == '')
            return resp.send({ erro: ' Preencha todos os campos!' })

        if (nome.length < 5 || curso.length < 5 || turma.length < 5)
            return resp.send({ erro: ' Insira mais que 4 caracteres!' });

        let ProdutoRepetido = await db.tb_produto.findOne({ where: { nm_turma: turma } })
        if ( ProdutoRepetido != null)
            return resp.send({ erro: 'O número de Chamada já existe nesta turma!' });
  
        if (chamada <= 0)
            return resp.send({ erro: ' Números negativos não são permitidos' });


        let r = await db.tb_produto.update(
            {
            nm_produto: nome,
            ds_categoria: categoria,
            vl_preco_de: precod,
            vl_preco_por: precopor,
            vl_avaliacao: avaliacao,
            ds_produto: produto,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: ativo,
            },
            {
                where: { id_produto: id }
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

        let r = await db.tb_produto.destroy({ where: { id_produto: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.listen(process.env.PORT,
            x => console.log(`Server up at port ${process.env.PORT}`))