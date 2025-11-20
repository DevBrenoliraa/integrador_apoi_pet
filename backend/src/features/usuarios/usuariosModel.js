import { DataTypes } from 'sequelize';
import { conn } from '../../config/sequelize.js';

export const usuariosModel = conn.define(
    'usuarios',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^\d{11}$/
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: 'usuarios'
    }
);
