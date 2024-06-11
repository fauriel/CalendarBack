const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJET = (req, res = response, next) => {
   
    const token = req.header('xx-token')
    if(!token){
        return res.status(401).json({
            ok: false
        })
    }

    try {
        const {uid, name} =jwt.verify(
            token,
            process.env.SECRET_JWT
        )

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false
        })
    }
    next();
}

module.exports = {
    validarJET
}