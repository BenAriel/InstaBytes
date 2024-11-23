import {getPosts,criarPost} from "../models/postModels.js";
import fs from "fs";
export async function listarPosts( req, res) {
    const posts = await getPosts();
    res.status(200).json(posts);
}
export async function adicionarPost(req,res) {
    const novoPost = req.body;
    try{
       const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({"erro":"falha no servidor"})
    }
}

export async function uploadImagem(req,res) {
    const novoPost = {
            descricao: "",
            url: req.file.originalname,
            alt: ""
    }
    try{
       const postCriado = await criarPost(novoPost);
       const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
       fs.renameSync(req.file.path,imagemAtualizada);
        res.status(200).json(postCriado);
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({"erro":"falha no servidor"})
    }
}
