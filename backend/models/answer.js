const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    creationDate: { 
        type: Date, 
        default: Date.now 
    }
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;