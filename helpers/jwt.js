const jwt = require('jsonwebtoken')

const generarJSONWeebT = (uid, name) =>{

    return new Promise((resolve, reject) => {

        const payload = { uid, name};


        jwt.sign(payload, process.env.SECRET_JWT,{
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                reject('no funciono')
            }
            resolve(token);
        })
    })
}


module.exports = {
    generarJSONWeebT
}