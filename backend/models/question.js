const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    creationDate: { 
        type: Date, 
        default: Date.now 
    }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;