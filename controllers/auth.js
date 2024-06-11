const express = require('express')
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJSONWeebT } = require('../helpers/jwt');

const crearUsuario = async (req, res = express.response) => {
    const { email, password } = req.body;


    try {
        let usuario = await Usuario.findOne({ email: email })

        if (usuario) {
            return res.status(400).json({
                ok: false
            })
        }
        usuario = new Usuario(req.body);

        //Ecnriptar Password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()
        const token = await generarJSONWeebT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uis: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
        })
    }

}

const loginUsuario = async(req, res = express.response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email: email })

        if (!usuario) {
            return res.status(400).json({
                ok: false
            })
        }

        //Confirmar passwords
        const validPassword = bcrypt.compareSync(password, usuario.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false
            })
        }
        const token = await generarJSONWeebT(usuario.id, usuario.name)


        res.json({
            ok: true,
            uid: usuario.uid,
            name: usuario.name,
            token
            
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
        })
    }

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}
const revalidarToken = async(req, res = express.response) => {

    const uid = req.uid
    const name = req.name

    const token = await generarJSONWeebT(uid, name)

    res.json({
        ok: true,
        token
    })
}

module
    .exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}