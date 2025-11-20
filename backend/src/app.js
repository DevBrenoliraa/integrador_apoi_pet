import express from 'express';
import cors from 'cors';
import { conn } from './config/sequelize.js';
import { erroHandler } from './middleware/error/erroHandler.js';

import './middleware/db/associations.js';
import usuarioRouter from './features/usuarios/usuariosRouter.js';
import animalRouter from './features/animais/animalRouter.js';
import denunciaRouter from './features/denuncias/denunciaRouter.js';

const app = express();
conn.sync();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.use('/api', usuarioRouter);
app.use('/api', animalRouter);
app.use('/api', denunciaRouter);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Rota não encontrada ou não existe.'
    });
});

app.use(erroHandler);

export default app;