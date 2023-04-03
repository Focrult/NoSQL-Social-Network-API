// Import mongoose
const { Schema, model } = require('mongoose');

const moment = require('moment');


// const schema
// FOLLOWING THE MODELS GIVEN TO ME
const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
       match: [/^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+\.[a-z]{2,3}/], //would be cool to test some regex here
    },
    thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought',
    }],
    friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    }],
},
{
    toJSON: {
      getters: true,
      virtuals: true,
    },
     id: false,
}
  )



const User = model('User', userSchema);

//

module.exports = User;