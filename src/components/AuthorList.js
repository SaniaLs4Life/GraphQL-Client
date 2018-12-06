import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, deleteAuthorMutation } from '../queries/queries'
import { Button, Modal, Spin, Alert, Avatar } from 'antd';

class AuthorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }    
    confirm = (id) => {
        Modal.confirm({
          title: 'Warning!',
          onOk: () => this.deleteAuthor(id),
          content: 'Do you want to delete the author?',
          okText: 'Yes',
          cancelText: 'No',
        });
      }
    deleteAuthor(id) {
        this.renderAuthors();
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
                <div style={{marginTop: '15px'}}>
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
                        <Button type="danger" icon="close" size="small" shape="circle" style={{float: 'right'}}  onClick={ () => this.confirm(author.id) } />
                    </p>
                )
            })
        }
    }
    render() {
        return (
            <span style={{display: 'inline-block', marginRight: '15px'}}>
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
            </span>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(deleteAuthorMutation, { name: 'deleteAuthorMutation' })
)(AuthorList)