const mongoose = require('mongoose')

const dbConnection = async() => {

    try {
     await  mongoose.connect(process.env.DB_CONECT, 
            
            {useNewUrlParser: true, 
                useUnifiedTopology: true,
            useCreateIndex: true
            });
        
    } catch (error) {
        throw new Error('Error')
    }
}

module.exports = {
    dbConnection
}