const router = require("./auth");

const {Router} = require('express')
const router = Router();
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJET} = require('../middlewares/validar-token')
const { getEventos, crearEventos, actualizarEventos, eliminarEventos} = require('../controllers/events');
const { isDate } = require("../helpers/isDate");

router.use(validarJET)

router.get('/', getEventos)

router.post('/', [ check('title', 'Es obligatorio').not().isEmpty(),
    check('start', 'Es obligatorio').custom(isDate),
    check('end', 'Es obligatorio').custom(isDate),
    , validarCampos


],
     crearEventos)

router.put('/:id', actualizarEventos)

router.delete('/:id',  eliminarEventos)

module.exports = router