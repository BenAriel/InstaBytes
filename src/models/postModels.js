import conectarAoBanco from "../config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

async function getPosts () {
    const db = conexao.db("instaBytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export default getPosts;
