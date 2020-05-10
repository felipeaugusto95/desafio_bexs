import React, { Component } from 'react';
import { Button, 
         ListGroup, 
         ListGroupItem,
         Form, 
         FormGroup, 
         Input, 
         Label 
} from 'reactstrap';
import { Link } from 'react-router-dom';
// import moment from 'moment';

import api from '../api';

class FormUser extends Component{

  constructor(props) {
    super(props);
    this.state = {name: '', email: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {

    let validation = '';

    if(!this.state.name.trim()){
      validation += '- Nome: Você precisa preencher com um nome;\n';
    }

    if(!this.state.email.trim()){
      validation += '- Email: Você precisa preencher com um email;\n';
    }

    if(!validation){
      api.post('/user/register', {
        name: this.state.name,
        email: this.state.email
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
    
    return (
      <div className="p-3 my-4 w-100 rounded customized">
          <Form >
            <FormGroup>
              <Label className="text-white" for="nome">Nome</Label>
              <Input type="text" className="w-50" name="name" id="name" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label className="text-white" for="email">Email</Label>
              <Input type="email" className="w-50" name="email" id="email" onChange={this.handleChange}/>
            </FormGroup>
            <Button onClick={this.handleSubmit} type="submit" color="info">Adicionar</Button>
          </Form>
      </div>
    )
  }
}

class User extends Component{

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    async componentDidMount () {
    //   const handle  = this.props.match.params.id;
      const response = await api.get('/user/list'); 
      this.setState({  users: response.data });
    }

    render(){

        const { users } = this.state;

        return (
            <div>
                <Link to="/"><Button type="button" color="secondary">Voltar</Button></Link>
                
                <h3 className="p-3 my-4">Usuários</h3>
                <ListGroup className="p-4 my-4">
                    {users && users.map(u => (
                        <ListGroupItem key={ u._id }>{ u.name } -> [{ u.email }]</ListGroupItem>
                    ))}
                </ListGroup>
                <FormUser />
            </div>
        )
    }
}

export default User;