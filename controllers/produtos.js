const express = require("express")
const Produto = require("../models/produtos")

const route = express.Router()

//CRIAÇÃO DO PRODUTO
route.post("/produtos", async (req, res) => {

    await Produto.create(req.body, (err, ret) => {
        if (err)
            return res.send(err.message)

        return res.send(ret)
    })
})

//ALTERAÇÃO DO PRODUTO
route.put("/produtos", async (req, res) => {
    const { _id,  preco,nome,imagem,descricao, quantidade,  ativo } = req.body

    var dados = await Produto.findOne({ _id: _id })

    if (dados == null) {
        res.send("Produto não encontrado")
        return false
    }
    //TESTAR LOCAL PARA VER SE ELE ENCONTRA ALGO NO BANCO
    // res.send({_id: dados._id, nome: dados.nome, descricao: dados.descricao, preco: dados.preco, quantidade: dados.quantidade})

    //FAZ A ALTERAÇAO NO BANCO, O ATIVO NAO PRECISA, JA QUE ELE NAO PODERIA 'DELETAR' DAQUI
    var retorno = await Produto.updateOne({ _id: _id }, { $set: { nome: nome, preco: preco, imagem: imagem, descricao: descricao, quantidade: quantidade }})

    res.send("Produto alterado com sucesso!")
})

//DELETAR DO BANCO
route.delete("/produtos", async (req, res) => {
    const { _id } = req.body

    var dados = await Produto.findOne({ _id: _id })

    if (dados == null) {
        res.send("Produto não encontrado")
        return false
    }
  
    //DEIXA O ATIVO FALSE PARA 'DELETAR' DO BANCO
    var retorno = await Produto.updateOne({ _id: _id }, { $set: { ativo: false }})

    res.send("Produto apagado com sucesso!")
})

module.exports = app => app.use("/admin", route)