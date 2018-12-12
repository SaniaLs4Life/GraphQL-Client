import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { addAuthorMutation, getAuthorsQuery } from '../queries/queries'
import { Modal, Button, Input, Alert, message } from 'antd'

class AddAuthor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            age: '',
            visible: false,
            error: false
        }
        this.submitForm = this.submitForm.bind(this)
    }
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
            error: false,
            name: '',
            age: '',

        });
      }
    handleCancel = (e) => {
        this.setState({
            visible: false      
        });
    }
    
    handleOk = (e) => {
        this.submitForm();
    }
    success = () => {
        message.success('Author is added successfully.');
      };
      
    error = () => {
        message.error('Please fill the form!');
    };
    submitForm() {
        if(this.state.name && this.state.age) {
            const age = parseInt(this.state.age)
            this.props.addAuthorMutation({
                variables: {
                    name: this.state.name,
                    age: age
                },
                refetchQueries: [
                    {
                        query: getAuthorsQuery
                    }
                ]
            }, () => {
                alert('Error!')
            });
            this.success();
            this.setState({
                visible: false,
                error: false   
            });
        }else {
            this.setState({
                error: true
            })
            this.error();
        }
    }
    render() {
        return (
            <span style={{margin: 'auto', textAlign: 'center', marginTop: '15px', display: 'inline-block', marginLeft: '15px'}}>
                <Button type="primary" icon="user-add" onClick={this.showModal}>
                Add an author
                </Button>
                <Modal
                title="Add an author"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <span>
                    <form id="add-book" >
                        <div className="field">
                            <Input type="text" placeholder="Author name" name="name" onChange={ this.handleOnChange } />
                        </div><br />
                        <div className="field">
                            <Input type="number" min={0} placeholder="Age" name="age" onChange={ this.handleOnChange } />
                        </div>
                    </form>
                </span><br />
                {
                    this.state.error ?
                        <Alert message="Please fill the form!" type="error" />
                    :
                        null

                }
                </Modal>
            </span>
            
        )
    }
}

export default compose(
    graphql(addAuthorMutation, { name: 'addAuthorMutation' })
)(AddAuthor)