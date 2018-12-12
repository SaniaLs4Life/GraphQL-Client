import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, deleteAuthorMutation } from '../queries/queries'
import { Button, Modal, Spin, Alert, Avatar, message, Popconfirm } from 'antd';

class AuthorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }  
      confirm = (id) => {
        this.deleteAuthor(id);
        this.success();
      }
      
      cancel = (e) => {
        console.log(e);
      }
    success = () => {
        message.success('Author is deleted successfully.');
    };
      
    error = () => {
        message.error('An error occured!');
    };
    deleteAuthor = (id) => {
        if(id) {            
            this.props.deleteAuthorMutation({
                variables: {
                    id: id
                },
                refetchQueries: [
                    {
                        query: getAuthorsQuery
                    }
                ]
            });          
        } else {
            this.error();
        }

    }
    handleOpen = () => {
        this.setState({
            visible: true
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    renderAuthors = () => {
        var data = this.props.getAuthorsQuery;
        if(data.loading) {
            return(
                <div style={{marginTop: '15px', textAlign: 'center'}}>
                    <Spin />
                </div>
            )
        } else if(data.authors.length === 0){
            return(
                <Alert style={{margin: 'auto', textAlign: 'center'}}
                    description="No added authors"
                    type="error"
                />
            )
        } else {
            return data.authors.map(author => {
                return (
                    <p key={author.id}>
                        <Avatar>{author.name[0]}</Avatar>{' '}
                        <b>{author.name}</b> Age: <b>{author.age}</b>
                        <Popconfirm title="Are you sure delete this author?" onConfirm={ () => this.confirm(author.id) }>
                            <Button type="danger" icon="close" size="small" shape="circle" style={{float: 'right'}}  />
                        </Popconfirm>
                    </p>
                )
            })
        }
    }
    render() {
        return (
            <div style={{display: 'inline-block', marginRight: '15px'}}>
                <Button type="primary" onClick={this.handleOpen} icon="team">Author List</Button>
                <Modal
                title="Author List"
                visible={this.state.visible}
                onOk={this.handleCancel}
                onCancel={this.handleCancel}
                >
                    {
                        this.renderAuthors()
                    }
                </Modal>
            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(deleteAuthorMutation, { name: 'deleteAuthorMutation' })
)(AuthorList)