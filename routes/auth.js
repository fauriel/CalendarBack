const { Router } = require('express')
const { check } = require(express-validator)
const { validarCampos} = require('../middlewares/validar-campos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const {validarJET} = require('../middlewares/validar-token')


const router = Router()

app.post('/new', [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').isLength({min:6}),
    validarCampos

], crearUsuario);

 app.post('/', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').isLength({min:6}),
    validarCampos
 ], loginUsuario);

 app.get('/renew',validarJET, revalidarToken);

 module.exports = router



 //user:ua717122
 //pass:JL7cr2Vv1BvMwH4R