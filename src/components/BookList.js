import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getBooksQuery, deleteBookMutation, getBookQuery } from '../queries/queries'
import BookDetails from './BookDetails'
import {
    Skeleton, 
    Card, 
    Button,
    Avatar,
    Row,
    Col,
    Alert,
    Modal
} from 'antd';



const { Meta } = Card;
class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null,
            bookDetail: false
        }
    }
    confirm = (id) => {
        Modal.confirm({
          title: 'Warning!',
          onOk: () => this.deleteBook(id),
          content: 'Do you want to delete the book?',
          okText: 'Yes',
          cancelText: 'No',
        });
      }
    deleteBook(id) {
        if(id) {
            this.props.deleteBookMutation({
                variables: {
                    id: id
                },
                refetchQueries: [
                    {
                        query: getBooksQuery
                    }
                ]
            });
            this.setState({
                selected: null
            })
        }
    }
    displayBooks = () => {
        const data = this.props.getBooksQuery;
        if(data.loading) {
            return(
                <div style={{marginTop: '15px'}}>
                    <Col span={8}>          
                        <Card
                            style={{ width: 500, marginTop: 16, margin: 'auto' }}>               
                            <Skeleton loading={true} avatar active></Skeleton>                        
                        </Card>  
                    </Col>
                    <Col span={8}>          
                        <Card
                            style={{ width: 500, marginTop: 16, margin: 'auto' }}>               
                            <Skeleton loading={true} avatar active></Skeleton>                        
                        </Card>  
                    </Col>
                    <Col span={8}>          
                        <Card
                            style={{ width: 500, marginTop: 16, margin: 'auto' }}>               
                            <Skeleton loading={true} avatar active></Skeleton>                        
                        </Card>  
                    </Col>
                </div>
            )
        } else if(data.books.length === 0){
            return(
                <Alert style={{width:'10%', margin: 'auto', marginTop: '15px'}}
                    message="Info"
                    description="No added books"
                    type="error"
                />
            )
        }
        else {
            return data.books.map(book => {            
                return (
                        <Col span={8} key={book.id} style={{marginTop: '15px'}}>
                                <Card
                                    style={{ width: 500, marginTop: 16, margin: 'auto' }}
                                    actions={[<Button icon="book" type="primary" onClick={(e) => this.handleSelectBook(book.id) } >Show Detail</Button>]}
                                    >
                                    
                                    <Button type="danger" icon="close" size="small" shape="circle" style={{position: 'absolute', right: '5px', top:'5px'}} onClick={ () => this.confirm(book.id) } />
                                    
                                            <Meta
                                            avatar={<Avatar src="https://cdn4.iconfinder.com/data/icons/basic-17/80/22_BO_open_book-512.png" />}
                                            title={'Book: ' + book.name}
                                            description={book.author.name + ' ' + book.author.age} 
                                            />
                                </Card>     
                        </Col>
                )
            })
        }
    }
    handleSelectBook = (id) => {
        this.setState({
            selected: id
        })
        this.showBookDetail();
    }
    showBookDetail = () => {
        const { book } = this.props.data
        if(book) {
                    Modal.info({
                    title: 'Book Details',
                    content: (
                        <div>
                        <h2><b>Book Name: </b>{book.name}</h2>
                        <p><b>Genre: </b>{book.genre}</p>
                        <p><b>Book Author Name: </b>{book.author.name}</p>
                        <h2><b>All books by this author:</b></h2>
                            {
                                book.author.book.map(item => {
                                    return <p key={item.id}><b>Book Name: </b>{item.name}</p>
                                })
                            }
                        </div>
                    ),
                    onOk() {},
                    });
        } else {
            return (
                <Card title="Book Details" bordered={false} style={{ width: 300, margin: 'auto' }}>
                    <p>No Selected Book...</p>
                </Card>
            )
        }
    }
    
    render() {
        return (
            <div>
                <Row gutter={16}>
                    {
                            this.displayBooks()
                    }
                </Row>
            </div>
        )
    }
}

export default compose(
    graphql(getBooksQuery, { name: 'getBooksQuery' }),
    graphql(deleteBookMutation, { name: 'deleteBookMutation' }),
    graphql(getBookQuery, {
        options: (state) => {
            return {
                variables: {
                    id: state.selected
                }
            }
        }
    })
)(BookList)