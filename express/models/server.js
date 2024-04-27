const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.connection_string = process.env.CONNECTION_STRING;

        this.usersPath = "/api/as";
        this.profilePath = "/api/users";
        this.commentsPath = "/api/comments";
        this.productionsPath = "/api/productions";

        this.middlewares();
        this.routes();
        this.db();
    }

    routes(){

        this.app.use(this.usersPath, require("../routes/pruebas"));
        this.app.use(this.profilePath, require("../routes/users"));
        this.app.use(this.commentsPath, require("../routes/comments"));
        this.app.use(this.productionsPath, require("../routes/productions"));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto: ${this.port}');
        })
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    db(){
        mongoose.connect(this.connection_string).then(
        () => {
            console.log('Conexion exitosa a la db');
        }).catch(
            (error) => {
                console.log('Error al conectar la base de datos');
            }
        )
    }
}

module.exports = Server;