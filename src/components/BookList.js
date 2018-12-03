import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'
import {
    Skeleton, 
    Card, 
    Button,
    Avatar,
    Row,
    Col,
    Alert
} from 'antd';



const { Meta } = Card;
class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }
    displayBooks = () => {
        const data = this.props.data;
        if(data.loading) {
            return(
                <div>Loading Books...</div>
            )
        } else if(data.books.length === 0){
            return(
                <Alert style={{width:'50%', margin: 'auto'}}
                    message="Info"
                    description="No added books"
                    type="info"
                    showIcon
                />
            )
        }
        else {
            return data.books.map(book => {                
                return (
                        <Col span={8} key={book.id} style={{marginTop: '15px'}}>
                            <Card
                                style={{ width: 500, marginTop: 16, margin: 'auto' }}
                                actions={[<Button icon="book" type="primary" onClick={(e) => this.setState({ selected: book.id })} >Show Detail</Button>]}
                                >
                                <Skeleton loading={false} avatar active>
                                        <Meta
                                        avatar={<Avatar src="https://cdn4.iconfinder.com/data/icons/basic-17/80/22_BO_open_book-512.png" />}
                                        title={book.name}
                                        description={book.author.name + ' ' + book.author.age} 
                                        />
                                </Skeleton>
                            </Card>
                        </Col>
                )
            })
        }
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <Row gutter={16}>
                    {
                            this.displayBooks()
                    }
                </Row>
                <BookDetails bookId={this.state.selected} />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);