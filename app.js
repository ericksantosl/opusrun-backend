import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import taskRoutes from './routes/taskRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "https://ericksantosl.github.io"
  ],
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.get('/version', (req, res) => {
    res.json({ version: "1.0.0" });
});

app.get('/me', (req, res) => {
    return res.json(req.session);
});

app.use('/task', taskRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});