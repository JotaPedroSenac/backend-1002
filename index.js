// importando o express como módulo
const express = require('express')

const dotenv = require('dotenv');
const app = express()

// middleware para permitir o uso do json
app.use(express.json());

dotenv.config();
const port = process.env.PORTA

// bd
const produtos = [];

app.get('/', (req, res) => {
    try {
        if (produtos.length === 0) {
            return res.status(200).json({msg: "Não há produtos a serem exibidos"});
        }
        res.status(200).json(produtos);
    } catch (error) {
        // console.error('Erro ao listar produtos')
        res.status(500).json({msg: "Erro ao buscar produtos"});
    }
    
})

// rota de cadastro de produtos

app.post('/', (req, res) => {
    try {
        const {id, nome, preco, quantidade } = req.body;
        const novoProduto = {id, nome, preco, quantidade}
        produtos.push(novoProduto);
        res.status(201).json(novoProduto)
    } catch (error) {
        res.status(500).json({msg: "Erro ao buscar produtos"});
    }
  })

//  rota para editar o produto
// http://localhost3000/1
  app.put('/:id', (req, res) => {
    try {
        const { id } = req.params.id;
        const produto = produtos.find((produto) => produto.id === id);
        if (!produto) {
            return res.status(404).json({msg: "produto não encontrado"})
        }

        const {novoNome, novoPreco, novaQuantidade } = req.body;

        if(produto){
            produto.nome = novoNome;
            produto.preco = novoPreco;
            produto.quantidade = novaQuantidade;
            return produto;
        }
        res.status(200).json(produto);

    } catch (error) {
        res.status(500).json({msg: "Erro ao atualizar produtos"});
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})