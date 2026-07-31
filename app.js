import express from 'express';
import taskRoutes from './routes/taskRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/version', (req, res) => {
    res.json({ version: "1.0.0" });
});

app.use('/task', taskRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});