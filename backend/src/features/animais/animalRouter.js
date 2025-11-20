import { Router } from 'express';
import { autenticarToken } from '../../middleware/auth/verificarToken.js'
import { listarAnimais, cadastrarAnimal, listarPorEspecie, adotarAnimal } from './animalController.js';

const router = Router();

router.get("/animais", listarAnimais);

router.post("/animais/cadastro", cadastrarAnimal);
router.get("/animais/especie/:especie", listarPorEspecie);
router.put("/animais/:id/adotar", autenticarToken, adotarAnimal);

export default router;