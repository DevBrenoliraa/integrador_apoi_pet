import { DataTypes } from 'sequelize';
import { conn } from '../../config/sequelize.js';

export const animalModel = conn.define(
    'animais',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        especie: {
            type: DataTypes.ENUM('cachorro', 'gato'),
            allowNull: false
        },
        raca: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        usuario_id_adocao: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'usuarios', 
                key: 'id'
            }
        },
        data_adocao: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    },
    {
        timestamps: true,
        tableName: 'animais'
    }
);
