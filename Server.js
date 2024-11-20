import express from 'express';
import conectarAoBanco from './src/config/dbConfig.js';

const posts = [
    {
        id: 1,
        descricao: 'foto de teste',
        url: 'https://placecats.com/millie/300/200'
    },
    {
        id:2,
        descricao: 'paisagem montanhosa',
        url: 'https://source.unsplash.com/random/300x200/?mountain'
    },
    {
        id:3,
        descricao: 'comida deliciosa',
        url: 'https://source.unsplash.com/random/300x200/?food'
    },
    {
        id:4,
        descricao: 'cachorro fofo',
        url: 'https://source.unsplash.com/random/300x200/?dog'
    },
    {
        id:5,
        descricao: 'cidade à noite',
        url: 'https://source.unsplash.com/random/300x200/?city,night'
    },
];

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

async function getPosts () {
    const db = conexao.db("instaBytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log('Server escutando na porta 3000');
});

app.get("/posts", async (req, res) => {
    const posts = await getPosts();
    res.status(200).json(posts);
});

const BuscarPostPorId = (id) => {
    return posts.findIndex(post => post.id === Number(id));
};

app.get("/posts/:id", (req, res) => {
    const index = BuscarPostPorId(req.params.id);
    console.log(index);
    res.status(200).json(posts[index]);
});

