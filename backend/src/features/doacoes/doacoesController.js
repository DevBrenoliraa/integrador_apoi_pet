import { doacaoModel } from "./doacaoModel.js";

export const criarDoacao = async (req, res, next) => {
  const { valor, mensagem } = req.body;
  const usuario_id = req.usuario.id;

  try {
    if (!valor) {
      return res.status(400).json({ message: "Valor da doação é obrigatório." });
    }

    const doacao = await doacaoModel.create({ 
        usuario_id, 
        valor, 
        mensagem 
    });

    return res.status(201).json({
      success: true,
      message: "Doação registrada com sucesso!",
      doacao
    });

  } catch (error) {
    next(error);
  }
};

export const listarDoacoes = async (req, res, next) => {
  try {
    const doacoes = await doacaoModel.findAll();
    return res.status(200).json({ 
        success: true, 
        doacoes 
    });

  } catch (error) {
    next(error);
  }
};
