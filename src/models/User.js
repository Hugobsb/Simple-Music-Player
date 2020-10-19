const mongoose = require('mongoose');

const SongSchema = require('./Song');

const UserSchema = new mongoose.Schema({
    "name": {
        "type": "String",
        "required": "Insira o nome do usuário"
    },
    "lastName": {
        "type": "String",
        "required": "Insira o sobrenome do usuário"
    },
    "email": {
        "type": "String",
        "required": "Insira o e-mail do usuário"
    },
    "password": {
        "type": "String",
        "required": "Insira a senha do usuário"
    }
});

module.exports = mongoose.model('User', UserSchema);