import React, { Component } from 'react';
import { Button, 
         ListGroup, 
         ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import api from '../api';
import { FormResposta } from './Forms';

class QuestionDetailed extends Component{

  constructor(props) {
      super(props);
      this.state = {question: '', idQuestion: '', answers: []};
  }

  async componentDidMount () {
    const handle  = this.props.match.params.id;
    const response = await api.get(`/forum/listQuestionById/${handle}`); 
    const responseAnswers = await api.get(`/forum/answersByQuestionId/${handle}`);
    this.setState({  question: response.data, idQuestion: handle, answers:responseAnswers.data });
  }

  render(){
    const { question } = this.state;
    const { idQuestion } = this.state;
    const  { answers } = this.state;

    return (
        <div>
            <Link to="/"><Button type="button" color="secondary">Voltar</Button></Link>
            <ListGroup className="p-4 my-4">
                <ListGroupItem><b>Pergunta:</b> { question.text }</ListGroupItem>
                <ListGroupItem><b>Autor:</b> { question.user && question.user.name }</ListGroupItem>
                <ListGroupItem><b>Data:</b> { moment(question.creationDate).format('DD-MM-YYYY HH:mm') }</ListGroupItem>
            </ListGroup>
            <h3 className="p-3 my-4">Respostas</h3>
            <ListGroup className="p-4 my-4">
                {answers && answers.map(ans => (
                    <ListGroupItem key={ ans._id }>
                    [{ moment(ans.creationDate).format('DD-MM-YYYY HH:mm') }] <b>{ans.user.name}</b>: { ans.text }
                    </ListGroupItem>
                ))}
            </ListGroup>
            <FormResposta id={ idQuestion }/>
        </div>
    )
  }
}

export default QuestionDetailed;