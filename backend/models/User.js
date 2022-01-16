const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type : String, require: true, unique: true},
    password: {type : String, require: true}
});


//Unique mail
userSchema.plugin(uniqueValidator);

//Exporté le schéma
module.exports = mongoose.model('User', userSchema); 