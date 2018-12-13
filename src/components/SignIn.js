import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { loginMutation } from '../queries/queries'
import Cookies from 'universal-cookie';
import {
    Form, Icon, Input, Button,
    Row, Col,
    message
} from 'antd';
import { extendObservable } from 'mobx';

const FormItem = Form.Item;

const cookies = new Cookies();
class SignIn extends Component {
    
    constructor(props) {
        super(props);
        
        extendObservable(this, {
            username: '',
            password: ''
        });
    }
    componentDidMount() {
        if(localStorage.getItem('token') && sessionStorage.getItem('token')) {
            this.props.history.push('/dashboard');
        }
    }
    success = () => {
        message.success('Logged in successfully.');
      };
      
    error = (text) => {
        if(text == 'empty') {            
            message.error('Please fill the form!');
        } else {            
            message.error('Wrong credentials!');
        }
    };
    onSubmit = () => {
        const { username, password } = this;
        if(username && password) {
            this.props.loginMutation({
                variables: {
                    username: username,
                    password: password
                }
            }).then((response) => {
                if(response.data.login !== null) {
                    this.success();
                    localStorage.setItem('token', response.data.login.id);                    
                    cookies.set('token', response.data.login.id);
                    sessionStorage.setItem('token', response.data.login.id);
                    window.location = '/dashboard';
                } else {
                    this.error('wrong');
                }
            });
        } else {
            this.error('empty');
        }
    }
    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    }
    render() {
        return (
                    <Row style={{marginTop: '50px'}}>
                        <Col span={4} offset={10}>
                            <Form className="login-form">
                                <FormItem>
                                    <Input onChange={this.onChange} name="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                </FormItem>
                                <FormItem>
                                    <Input onChange={this.onChange} name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                </FormItem>
                                <FormItem>
                                    <Button onClick={this.onSubmit} type="primary" icon="login" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
        )
    }
}

export default compose(
    graphql(loginMutation, { name: 'loginMutation' })
)(SignIn)