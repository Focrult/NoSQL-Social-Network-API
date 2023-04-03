// Import mongoose
const { Schema, Types, model } = require('mongoose');
//Don't use it in future but we will use moment for now
const moment = require('moment');


// const schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema
    ],
},
{
    toJSON: {
      getters: true,
      virtuals: true,
    },
     id: false,
}
  )

  //Reaction 
const reactionSchema = new Schema({ //JUST THE SCHEMA
    reactionID: {
    type: Schema.Types.ObjectID,
    default: true,
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now,

    },



})



const Thought = model('Thought', thoughtSchema);
//

module.exports = Thought;