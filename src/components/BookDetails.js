import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'
import { Card, Row } from 'antd'

class BookDetails extends Component {
    displayBookDetails = () => {
        const { book } = this.props.data
        if(book) {
            return (
                <div>
                    
                    <Card title="Book Details" bordered={false} style={{ width: 500, margin: 'auto', border: '1px solid #DDD', marginTop: '5px' }}>
                        <h2><b>Book Name: </b>{book.name}</h2>
                        <p><b>Genre: </b>{book.genre}</p>
                        <p><b>Book Author Name: </b>{book.author.name}</p>
                        <h2><b>All books by this author:</b></h2>
                            {
                                book.author.book.map(item => {
                                    return <p key={item.id}><b>Book Name: </b>{item.name}</p>
                                })
                            }
                    </Card>
                </div>
            )
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
                <Row gutter={16}>
                    {
                        this.displayBookDetails()
                    }
            </Row>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)