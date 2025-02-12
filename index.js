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
        const id = parseInt(req.params.id);
        const produto = produtos.find((produto) => produto.id === id);
        if (!produto) {
            return res.status(404).json({msg: "produto não encontrado"})
        }

        const {novoNome, novoPreco, novaQuantidade } = req.body;

        if(produto){
            produto.nome = novoNome;
            produto.preco = novoPreco;
            produto.quantidade = novaQuantidade;

        }
        res.status(200).json(produto);

    } catch (error) {
        res.status(500).json({msg: "Erro ao atualizar produtos"});
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Rota para deletar

app.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const produtoIndex = produtos.findIndex((produto) => produto.id === id);

        // Verifica se o produto existe
        if (produtoIndex === -1) {
            return res.status(404).json({ msg: "Produto não encontrado" });
        }

        // Remove o produto da lista
        const produtoRemovido = produtos.splice(produtoIndex, 1);

        // Retorna o produto removido
        res.status(200).json({ msg: "Produto removido com sucesso", produto: produtoRemovido[0] });

    } catch (error) {
        res.status(500).json({ msg: "Erro ao remover produto" });
    }
});