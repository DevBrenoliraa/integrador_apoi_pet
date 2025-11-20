import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usuariosModel } from "./usuariosModel.js";

const chave = 'CHAVE_SUPER_SECRETA';

export const cadastrarUsuario = async (req, res, next) => {
    const { nome, cpf, email, senha, verificaSenha } = req.body;

    try {
        if (!nome || !cpf || !email || !senha || !verificaSenha) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Todos os campos devem está preenchidos.'
            });
        };

        if (verificaSenha !== senha) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'O campo verifica senha deve ser igual ao campo senha.'
            });
        };

        const verificaEmail = await usuariosModel.findOne({ where: { email } });
        if (verificaEmail) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Esse e-mail já está cadastrado. Tente outro.'
            });
        };

        const verificaCpf = await usuariosModel.findOne({ where: { cpf } });
        if (verificaCpf) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Esse CPF já está cadastrado. Tente outro.'
            });
        };

        const senhaCript = await bcrypt.hash(senha, 10);

        const novoUsuario = await usuariosModel.create({
            nome,
            cpf,
            email,
            senha: senhaCript
        });

        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Usuário cadastrado com sucesso.',
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                cpf: novoUsuario.cpf,
                email: novoUsuario.email
            },
        });

    } catch (error) {
        next(error);
    };
};

export const loginUsuario = async (req, res, next) => {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Todos os campos devem está preenchidos.'
            });
        };

        const usuario = await usuariosModel.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'Usuáario não encontrado ou não existe. Tente novamente.'
            });
        };

        const senhaOk = await bcrypt.compare(senha, usuario.senha);
        if (!senhaOk) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Senha inválida.'
            });
        };

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            chave,
            { expiresIn: '6h' }
        );

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Login realizado com sucesso!',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                cpf: usuario.cpf,
                email: usuario.email
            },
            token
        });

    } catch (error) {
        next(error);
    };
};

export const listarUsuario = async (req, res, next) => {
  try {
    const usuarios = await usuariosModel.findAll({
      attributes: ["id", "nome", "cpf", "email"],
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      usuarios
    });

  } catch (error) {
    next(error); 
  }
};