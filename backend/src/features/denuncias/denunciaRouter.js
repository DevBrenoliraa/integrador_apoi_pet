import { Router } from 'express';
import { autenticarToken } from '../../middleware/auth/verificarToken.js'
import { listarDenuncias, criarDenuncia } from './denunciaController.js';

const router = Router();

router.get("/denuncias", autenticarToken, listarDenuncias);

router.post("/denuncias/cadastro", autenticarToken, criarDenuncia);

export default router;