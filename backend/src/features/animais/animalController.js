import { animalModel } from "./animailModel.js";

export const listarAnimais = async (req, res, next) => {
    try {
        const animais = await animalModel.findAll({
            attributes: {
                exclude: ["usuario_id_adocao", "data_adocao", "updatedAt"]
            }
        });

        return res.status(200).json({
            success: true,
            animais
        });
    } catch (error) {
        next(error);
    }
};

export const cadastrarAnimal = async (req, res, next) => {
    const { nome, idade, especie, raca } = req.body;

    try {
        if (!nome || !idade || !especie || !raca) {
            return res.status(400).json({
                success: false,
                message: "Todos os campos obrigatórios devem ser preenchidos."
            });
        }

        const novoAnimal = await animalModel.create({
            nome,
            idade,
            especie,
            raca
        });

        return res.status(201).json({
            success: true,
            message: "Animal cadastrado para adoção com sucesso!",
            animal: novoAnimal
        });
    } catch (error) {
        next(error);
    }
};

export const adotarAnimal = async (req, res, next) => {
    const { id } = req.params;

    try {
        const animal = await animalModel.findByPk(id);

        if (!animal) {
            return res.status(404).json({
                success: false,
                message: "Animal não encontrado."
            });
        }

        if (animal.usuario_id_adocao) {
            return res.status(400).json({
                success: false,
                message: "Este animal já foi adotado."
            });
        }

        const usuario_id = req.usuario.id;

        animal.usuario_id_adocao = usuario_id;
        animal.data_adocao = new Date();

        await animal.save();

        return res.status(200).json({
            success: true,
            message: "Animal adotado com sucesso!",
            animal
        });
    } catch (error) {
        next(error);
    }
};

export const listarPorEspecie = async (req, res, next) => {
    const { especie } = req.params;

    try {
        const animais = await animalModel.findAll({
            where: { especie }
        });

        return res.status(200).json({
            success: true,
            animais
        });
    } catch (error) {
        next(error);
    }
};
