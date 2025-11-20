import jwt from "jsonwebtoken";

const chave = "CHAVE_SUPER_SECRETA";

export const autenticarToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 
    
    if (!token) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Token não fornecido."
        });
    }

    try {
        const usuario = jwt.verify(token, chave);
        req.usuario = usuario;
        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            statusCode: 403,
            message: "Token inválido ou expirado."
        });
    }
};
