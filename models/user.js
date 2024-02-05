const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    email:{
        type: String,
        required: [true,'please enter email'],
        unique: true,
        lowercase: true,
        validate:[isEmail,'please enter a valid email']
    },
    password:{
        type: String,
        required: [true,'please enter password'],
        minlength: [6,'password must have min 6 characters']
    }
});

// userSchema.post('save',(doc,next)=>{
//     console.log(doc);
//     next();
// })
// we did not use arrow function beacuse in arrow function we can not access (this) keyword which is referring to the User object
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// static method to login user 

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect username or password'); 
    }
    throw Error('incorrect username or email');
}

module.exports = mongoose.model('User',userSchema); 