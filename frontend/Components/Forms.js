import React, { Component } from 'react';

import { Button, 
         Form, 
         FormGroup, 
         Label, 
         Input 
} from 'reactstrap';

import api from '../api';

class FormPergunta extends Component{

    constructor(props) {
        super(props);
        this.state = {text: '', user: '', users: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const response = await api.get('/user/list');
        this.setState({  users: response.data });
    }

    handleChange(event) {
        let {name, value} = event.target;
        this.setState({
        [name]: value,
        });
    }

    handleSubmit(event) {
        let validation = '';

        if(!this.state.user.trim()){
        validation += '- Usuário: Você deve selecionar um usuário;\n';
        }

        if(!this.state.text.trim()){
        validation += '- Resposta: O campo resposta deve ser preenchido;\n';
        }

        if(!validation){
        api.post('/forum/addQuestion', {
            text: this.state.text,
            user: this.state.user
        })
        .then(function (response) {
            if(response.status !== 200){
            alert('Problema ao inserir. Tente novamente!');
            event.preventDefault();
            }
        })
        .catch(function (error) {
            alert(error);
            event.preventDefault();
        });
        } else{
        alert('Problema nos campos abaixo: \n'+validation);
        event.preventDefault();
        }
    }

    render(){
        
        const { users } = this.state;

        return (
        <div className="p-3 my-4 w-100 rounded customized">
            <Form >
                <FormGroup>
                <Label className="text-white" for="pergunta">Pergunta</Label>
                <Input type="textarea" className="w-75" name="text" id="text" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                <Label className="text-white" for="usuario">Usuário</Label>
                <Input type="select" className="w-25" name="user" id="user" onChange={this.handleChange}>
                    <option value="0">Selecione um Usuário...</option>
                    {users && users.map(u => (
                    <option key={u._id} value={u._id}>{u.name} </option>
                    ))}
                </Input>
                </FormGroup>
                <Button onClick={this.handleSubmit} type="submit" color="info">Perguntar</Button>
            </Form>
        </div>
        )
    }
}

class FormResposta extends Component{

    constructor(props) {
      super(props);
      this.state = {text: '', user: '', users: []};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    async componentDidMount(){
      const response = await api.get('/user/list');
      this.setState({  users: response.data });
    }
  
    handleChange(event) {
      let {name, value} = event.target;
      this.setState({
        [name]: value,
      });
    }
  
    handleSubmit(event) {
      let validation = '';
  
      if(!this.state.user.trim()){
        validation += '- Usuário: Você precisa selecionar um usuário;\n';
      }
  
      if(!this.state.text.trim()){
        validation += '- Resposta: O campo resposta deve ser preenchido;\n';
      }
  
      if(!this.props.id.trim()){
        validation += '- Problema interno. Tente novamente;';
      }
  
      if(!validation){
        api.post('/forum/addAnswer', {
          text: this.state.text,
          user: this.state.user,
          question: this.props.id
        })
        .then(function (response) {
          if(response.status !== 200){
            alert(response);
            event.preventDefault();
          }
        })
        .catch(function (error) {
          alert(error);
          event.preventDefault();
        });
      } else{
        alert('Problema nos campos abaixo: \n'+validation);
        event.preventDefault();
      }
    }
  
    render(){
      
      const { users } = this.state;
  
      return (
        <div className="p-3 my-4 w-100 rounded customized">
            <Form >
              <FormGroup>
              <Label className="text-white" for="pergunta">Responder com</Label>
              <Input type="textarea" className="w-75" name="text" id="text" onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label className="text-white" for="usuario">Usuário</Label>
                <Input type="select" className="w-25" name="user" id="user" onChange={this.handleChange} >
                  <option value="0">Selecione um Usuário...</option>
                  {users && users.map(u => (
                    <option key={u._id} value={u._id}>{u.name} </option>
                  ))}
                </Input>
              </FormGroup>
              <Button onClick={this.handleSubmit} type="submit" color="info">Responder</Button>
            </Form>
        </div>
      )
    }
}

export {FormPergunta, FormResposta};