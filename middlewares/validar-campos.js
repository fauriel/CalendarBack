const { response } = require('express')
const { validationResult} = require('express-validator')

const validarCampos = ( req, res  = response, next) => {
   
   
    const eerrors = validationResult(req);
    if( !eerrors.isEmpty()){
        return res.status(400).json({
            ok: false,
            eerrors: eerrors.mapped()

        })
    }
    next();
}

module.exports = {
    validarCampos
}