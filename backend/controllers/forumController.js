const express = require('express');
const mongoose = require('mongoose');

const Question = require('../models/question');
const Answer = require('../models/answer');
const User = require('../models/user');

const router = express.Router();

router.get('/listAllQuestions', async (req, res) => {
    
    try{
        return res.send(await Question.find().populate(['user', 'answers']));

    } catch(err){
        return res.status(400).send({error: 'List all questions failed'});
    }
});

router.get('/listQuestionById/:idQuestion', async (req, res) => {
    
    try{
        return res.send(await Question.findById(req.params.idQuestion).populate(['user', 'answers']));

    } catch(err){
        return res.status(400).send({error: 'List specific question failed'});
    }
});

router.get('/answersByQuestionId/:idQuestion', async (req, res) => {
    try{
        return res.send(await Answer.find({question: req.params.idQuestion}).populate('user'));

    } catch(err){
        return res.status(400).send({error: 'List answers by specific question failed'});
    }
});

router.post('/addQuestion', async (req, res) => {

    const { text, user } = req.body;

    try{
        if(!text.trim())
            return res.status(400).send({error: 'Text invalid', user: user});

        if(!mongoose.Types.ObjectId.isValid(user))
            return res.status(400).send({error: 'User id invalid', user: user});
        
        if(!await User.findOne({ _id: user }))
            return res.status(400).send({error: 'User not found'});

        const question = await Question.create({ text, user });

        return res.send({ question });

    } catch(err){
        console.log(err);
        return res.status(400).send({error: 'Add question failed'});
    }
});

router.post('/addAnswer', async (req, res) => {

    const { text, user, question } = req.body;

    try{
        let error_msg = '';

        if(!text.trim())
            error_msg += 'Text invalid ['+text+']; ';

        if(!mongoose.Types.ObjectId.isValid(user))
            error_msg += 'User id invalid ['+user+']; ';

        if(!mongoose.Types.ObjectId.isValid(question))
            error_msg += 'Question id invalid ['+question+']; ';
            
        if(error_msg)
            return res.status(400).send({error: error_msg});

        if(!await User.findOne({ _id: user }))
            return res.status(400).send({error: 'User not found'});

        const quest = await Question.findOne({ _id: question });

        if(!quest)
            return res.status(400).send({error: 'Question not found'});    

        const answer = await Answer.create(req.body);

        await quest.answers.push(answer);

        await quest.save();
        
        return res.send({ answer });
        
    } catch(err){
        console.log(err);
        return res.status(400).send({error: 'Add answer failed'});
    }
});

module.exports = (app) => app.use('/forum', router);