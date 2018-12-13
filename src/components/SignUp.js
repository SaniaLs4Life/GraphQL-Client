import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { addUser } from '../queries/queries';
import Cookies from 'universal-cookie';
import {
    Form, Icon, Input, Button,
    Row, Col,
    message
} from 'antd';

const FormItem = Form.Item;
const cookies = new Cookies();
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            username: '',
            password: '',
            error: false
        }
    }
    componentDidMount() {
        if(localStorage.getItem('token') || cookies.get('token') || sessionStorage.getItem('token')) {
            this.props.history.push('/dashboard');
        }
    }
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
        console.log(this.state.fullname)
    }
    success = () => {
        message.success('User is added successfully.');
      };
      
    error = () => {
        message.error('Please fill the form!');
    };
    handleOk = () => {
        this.submitForm();
        this.setState({
            fullname: '',
            username: '',
            password: ''
        })
      }
    submitForm() {
        if(this.state.fullname && this.state.username && this.state.password) {
            this.props.addUser({
                variables: {
                    fullname: this.state.fullname,
                    username: this.state.username,
                    password: this.state.password
                }
            });   
            this.success();
            this.setState({
                error: false   
            });
        } else {
            this.setState({
                error: true
            })
            this.error();
        }
    }
    render() {
        return (
            <Row style={{ marginTop: '50px' }}>
                <Col span={4} offset={10}>
                    <Form className="login-form">
                        <FormItem>
                            <Input onChange={this.handleOnChange} name="fullname" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Fullname" />
                        </FormItem>
                        <FormItem>
                            <Input onChange={this.handleOnChange} name="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        </FormItem>
                        <FormItem>
                            <Input onChange={this.handleOnChange} name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={ this.handleOk } icon="plus" htmlType="submit" className="login-form-button">
                                Sign up
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default compose(
    graphql(addUser, { name: 'addUser' })
)(SignUp)