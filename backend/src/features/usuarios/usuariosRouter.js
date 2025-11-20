import { Router } from 'express';
import { listarUsuario, cadastrarUsuario, loginUsuario } from './usuarioController.js';

const router = Router();

router.get('/usuarios', listarUsuario); 

router.post('/usuario/cadastro', cadastrarUsuario);
router.post('/usuario/login', loginUsuario);

export default router;