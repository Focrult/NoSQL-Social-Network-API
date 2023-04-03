// Import mongoose
const { Schema, Types, model } = require('mongoose');
//Don't use it in future but we will use moment for now
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
        match: [], //would be cool to test some regex here
    },
    thoughts: [{

    ref: 'Thought',
    }],
    friends: [{

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