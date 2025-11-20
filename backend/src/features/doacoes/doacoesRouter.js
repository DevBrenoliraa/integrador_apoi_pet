import { Router } from 'express';
import { autenticarToken } from '../../middleware/auth/verificarToken.js'
import { listarDoacoes, criarDoacao } from './doacoesController.js';

const router = Router();

router.get('/doacoes', autenticarToken, listarDoacoes); 

router.post('/doacoes/cadastro', autenticarToken, criarDoacao);

export default router;