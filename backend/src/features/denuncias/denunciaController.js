import { denunciaModel } from "./denunciaModel.js";

export const criarDenuncia = async (req, res, next) => {
    const { descricao, endereco } = req.body;
    const usuario_id = req.usuario.id;

    try {
        if (!descricao || !endereco) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Todos os campos devem está preenchidos'
            });
        }

        const denuncia = await denunciaModel.create({
            usuario_id,
            descricao,
            endereco
        });

        return res.status(201).json({
            success: true,
            message: "Denúncia registrada com sucesso!",
            denuncia
        });

    } catch (error) {
        next(error);
    }
};

export const listarDenuncias = async (req, res, next) => {
    try {
        const denuncias = await denunciaModel.findAll();
        return res.status(200).json({
            success: true,
            denuncias
        });

    } catch (error) {
        next(error);
    }
};
