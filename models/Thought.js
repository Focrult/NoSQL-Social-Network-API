// Import mongoose
const { Schema, model, Types } = require('mongoose');

  //Reaction Schema
  const reactionSchema = new Schema({ //JUST THE SCHEMA
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionText: {
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
        default: Date.now,
        immutable: true,
    },
},
{
    toJSON: {
        getters: true,
    }
}
);

//Thought Schema
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
        immutable: true,
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

thoughtSchema.virtual('reactionCount').get( function()  {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;