import { DataTypes } from "sequelize";
import { conn } from "../../config/sequelize.js";

export const denunciaModel = conn.define(
    "denuncias",
    {
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "usuarios",
                key: "id"
            }
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        endereco: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: "denuncias"
    }
);
