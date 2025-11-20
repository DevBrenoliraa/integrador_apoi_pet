import { usuariosModel } from "../../features/usuarios/usuariosModel.js";
import { animalModel } from "../../features/animais/animailModel.js";
import { denunciaModel } from "../../features/denuncias/denunciaModel.js";
import { doacaoModel } from "../../features/doacoes/doacoesModel.js";

usuariosModel.hasMany(animalModel, {
  foreignKey: "usuario_id_adocao",
  as: "animaisAdotados"
});
animalModel.belongsTo(usuariosModel, {
  foreignKey: "usuario_id_adocao",
  as: "adotante"
});

usuariosModel.hasMany(denunciaModel, {
  foreignKey: "usuario_id",
  as: "denuncias"
});
denunciaModel.belongsTo(usuariosModel, {
  foreignKey: "usuario_id",
  as: "autorDenuncia"
});

usuariosModel.hasMany(doacaoModel, {
  foreignKey: "usuario_id",
  as: "doacoes"
});
doacaoModel.belongsTo(usuariosModel, {
  foreignKey: "usuario_id",
  as: "doador"
});
