import React, { Component } from 'react';

import api from '../api';
import { Link } from 'react-router-dom';
import { Toast, 
         ToastBody, 
         ToastHeader 
} from 'reactstrap';

import { FormPergunta } from './Forms';

class Home extends Component{

  constructor(props){
    super(props);

    this.state = {
      questions: []
    }
  }

  async componentDidMount(){
    const response = await api.get('/forum/listAllQuestions');
    this.setState({  questions: response.data });
  }

  render(){

    const { questions } = this.state;

    return (
      
      <div>
        <div className="p-3 my-4 rounded ">
        { questions && questions.map(question => (
          <Link key={question._id} to={`/questionDetailed/${question._id}`} style={{ textDecoration: 'none' }}>
            <Toast>
              <ToastHeader>
                {question.answers.length} Resposta(s)
              </ToastHeader>
              <ToastBody>
                <span className="text-dark"> { question.text } </span>
              </ToastBody>
            </Toast>
          </Link>
        ))
        }
        </div>
        <FormPergunta />
      </div>
    );
  };
}

export default Home;


