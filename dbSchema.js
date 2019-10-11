const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://worzrens:1111@firstproj-bhfob.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});


const UserSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    description: String,
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);


