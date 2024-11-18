import express from 'express';

const app = express();
app.listen(3000, () => {
    console.log('Server escutando na porta 3000');
});

app.get("/api", (req, res) => {
    res.send('rota inicial');
});