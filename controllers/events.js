const { response } = require('express');
const Evento = require('../models/Evento')

const getEvents = async (req, res) => {

    const eventos = await  Evento.find()
                                       .populate('user', 'name')


    res.json({
        ok:true,
        msg: 'getEventos',
        eventos
    })
}
const crearEventos = async(req, res) => {

    const evento = newEvento(req.body)
    try {
        evento.user = req.uid
        const eventoG = await evento.save()
       res.json({
        ok: true,
        evento: eventoG
       })
        
    } catch (error) {
        res.status(500).json({
            ok: false
        })
    }
    res.json({
        ok:true,
        msg: 'getEventos'
    })
}
const actualizarEventos = async (req, res) => {

    const eventoId = req.params.id;
    const uid = reeq.uid;

    try {
        const evento = await Evento.findById(eventoId)

        if(!evento){
            res.status(500).json({
                ok:false
            })
        } 
        if(evento.user.toString() !== uid){
            res.status(500).json({
                ok:false
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false
        })
    }
    res.json({
        ok:true,
        msg: 'getEventos',
        eventoId
    })
}

const eliminarEventos = async(req, res) => {
    const eventoId = req.params.id;
    const uid = reeq.uid;

    try {
        const evento = await Evento.findById(eventoId)

        if(!evento){
      return      res.status(500).json({
                ok:false
            })
        } 
        if(evento.user.toString() !== uid){
            res.status(500).json({
                ok:false
            })
        }

     await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false
        })
    }

    res.json({
        ok:true,
        msg: 'getEventos'
    })
}

module.exports= {
    getEvents,
    crearEventos,
    actualizarEventos,
    eliminarEventos
}