const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const mongoose_DB = mongoose.connection;
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 36; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
const usersSchema = mongoose.Schema({
    id: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    company:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        //match://
    },
    phoneNumber:{
        type:String,
        required: true,
        //match://
    },
    position:{
        type:String,
        required: true
    }
});

const User = mongoose.model('User',usersSchema);

User.prototype.duplicateIdProperty = function(){
    this.id = this._id;
};


module.exports = User;